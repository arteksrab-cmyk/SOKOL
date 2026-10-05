import { useEffect, useRef, useState, type PointerEvent, type WheelEvent, type KeyboardEvent } from "react";
import * as THREE from "three";
import { DoorOpen, Minus, Plus, RotateCcw, Move3D } from "lucide-react";

type Camera = { yaw: number; pitch: number; zoom: number };

const initialCamera: Camera = { yaw: -0.23, pitch: 0.07, zoom: 1 };
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function createWindowModel() {
  const root = new THREE.Group();
  const profileMat = new THREE.MeshStandardMaterial({ color: 0xf5f6f3, roughness: 0.28, metalness: 0.04 });
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0xd4d9d9, roughness: 0.4 });
  const sealMat = new THREE.MeshStandardMaterial({ color: 0x596568, roughness: 0.45 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb7d1d4, roughness: 0.12, metalness: 0.06, transmission: 0.48, transparent: true,
    opacity: 0.62, thickness: 0.035, ior: 1.45, side: THREE.DoubleSide, depthWrite: false,
  });
  const highlightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.22, metalness: 0.06 });
  const depth = 0.3;
  const wallDepth = 0.32;
  // Front elevation in x/y: compact left shoulder, long rising rake, tall right side.
  const outline = [
    new THREE.Vector2(-2.45, -1.72),
    new THREE.Vector2(-2.45, -0.82),
    new THREE.Vector2(2.45, 1.72),
    new THREE.Vector2(2.45, -1.72),
  ];
  const wallShape = new THREE.Shape([
    new THREE.Vector2(-3.2, -2.1),
    new THREE.Vector2(3.2, -2.1),
    new THREE.Vector2(3.2, 2.1),
    new THREE.Vector2(-3.2, 2.1),
  ]);
  const wallOpening = new THREE.Path();
  wallOpening.moveTo(outline[0].x, outline[0].y);
  outline.slice(1).forEach(({ x, y }) => wallOpening.lineTo(x, y));
  wallOpening.closePath();
  wallShape.holes.push(wallOpening);
  const wallFrontZ = -0.02;
  const wall = new THREE.Mesh(
    new THREE.ExtrudeGeometry(wallShape, { depth: wallDepth, bevelEnabled: false }),
    new THREE.MeshStandardMaterial({ color: 0xd8d1c4, roughness: 0.94 }),
  );
  wall.position.z = wallFrontZ - wallDepth;
  wall.castShadow = true; wall.receiveShadow = true; root.add(wall);

  const sill = new THREE.Mesh(new THREE.BoxGeometry(6.05, 0.18, 0.72), profileMat);
  sill.position.set(0, -1.89, 0.38);
  sill.castShadow = true; sill.receiveShadow = true; root.add(sill);

  const outerShape = new THREE.Shape(outline);
  const opening = new THREE.Path();
  const inset = [
    [-2.19, -1.47], [-2.19, -0.94], [2.19, 1.45], [2.19, -1.47],
  ];
  opening.moveTo(inset[0][0], inset[0][1]);
  inset.slice(1).forEach(([x, y]) => opening.lineTo(x, y));
  opening.closePath();
  outerShape.holes.push(opening);
  const shell = new THREE.ExtrudeGeometry(outerShape, { depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.035, bevelThickness: 0.035 });
  const outer = new THREE.Mesh(shell, profileMat);
  outer.position.z = -depth / 2;
  outer.castShadow = true; outer.receiveShadow = true; root.add(outer);

  const boxBetween = (
    a: THREE.Vector3,
    b: THREE.Vector3,
    thickness: number,
    thickZ: number,
    material: THREE.Material,
    z = 0.02,
    parent: THREE.Group = root,
    offsetX = 0,
  ) => {
    const delta = b.clone().sub(a);
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(delta.length() + thickness, thickness, thickZ), material);
    mesh.position.copy(a.clone().add(b).multiplyScalar(0.5));
    mesh.position.x -= offsetX;
    mesh.position.z = z;
    mesh.rotation.z = Math.atan2(delta.y, delta.x);
    mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh);
    return mesh;
  };
  const outline3 = outline.map(p => new THREE.Vector3(p.x, p.y, 0));
  outline3.forEach((p, i) => boxBetween(p, outline3[(i + 1) % outline3.length], 0.11, 0.39, profileMat, 0));
  const inner = inset.map(([x, y]) => new THREE.Vector3(x, y, 0.06));
  inner.forEach((p, i) => boxBetween(p, inner[(i + 1) % inner.length], 0.042, 0.12, highlightMat, 0.035));
  // Dark continuous glazing seals are set just inside each PVC lip.
  inner.forEach((p, i) => boxBetween(p.clone().add(new THREE.Vector3(0, 0, -0.018)), inner[(i + 1) % inner.length].clone().add(new THREE.Vector3(0, 0, -0.018)), 0.023, 0.09, sealMat, -0.005));

  const glassPoly = (pts: Array<[number, number]>, z = -0.005, parent: THREE.Group = root, offsetX = 0) => {
    const shape = new THREE.Shape();
    shape.moveTo(pts[0][0] - offsetX, pts[0][1]); pts.slice(1).forEach(([x, y]) => shape.lineTo(x - offsetX, y)); shape.closePath();
    const geo = new THREE.ShapeGeometry(shape);
    const pane = new THREE.Mesh(geo, glassMat);
    pane.position.z = z; pane.renderOrder = 2; parent.add(pane);
    return pane;
  };
  // Bay mullion: left pane follows the rake, while the right bay is vertical and divided.
  const splitX = 0.12;
  const rakeY = (x: number) => -0.82 + ((x + 2.45) / 4.9) * 2.54;
  const leftTopAtSplit = rakeY(splitX);
  const dividerY = 0.25;
  const sashHingeX = splitX + 0.06;
  const sash = new THREE.Group();
  sash.position.x = sashHingeX;
  root.add(sash);
  glassPoly([[-2.13, -1.40], [splitX - 0.06, -1.40], [splitX - 0.06, rakeY(splitX - 0.06) - 0.06], [-2.13, rakeY(-2.13) - 0.06]]);
  glassPoly([[splitX + 0.06, dividerY + 0.055], [2.12, dividerY + 0.055], [2.12, 1.42], [splitX + 0.06, rakeY(splitX + 0.06) - 0.12]]);
  glassPoly([[splitX + 0.06, -1.41], [2.12, -1.41], [2.12, dividerY - 0.055], [splitX + 0.06, dividerY - 0.055]], -0.005, sash, sashHingeX);

  // Structural vertical between the broad sloped pane and the narrow right bay.
  boxBetween(new THREE.Vector3(splitX, -1.45, 0.035), new THREE.Vector3(splitX, leftTopAtSplit - 0.035, 0.035), 0.105, 0.26, profileMat, 0.015);
  boxBetween(new THREE.Vector3(splitX + 0.085, dividerY, 0.04), new THREE.Vector3(2.14, dividerY, 0.04), 0.092, 0.22, profileMat, 0.018);
  // Inner glazing beads tracing the three individual units.
  const beadLoop = (pts: Array<[number, number]>, parent: THREE.Group = root, offsetX = 0) => {
    const v = pts.map(([x, y]) => new THREE.Vector3(x - offsetX, y, 0.075));
    v.forEach((p, i) => boxBetween(p, v[(i + 1) % v.length], 0.025, 0.075, edgeMat, 0.075, parent));
  };
  beadLoop([[-2.08, -1.32], [splitX - 0.12, -1.32], [splitX - 0.12, rakeY(splitX - 0.12) - 0.13], [-2.08, rakeY(-2.08) - 0.13]]);
  beadLoop([[splitX + 0.12, dividerY + 0.10], [2.07, dividerY + 0.10], [2.07, rakeY(2.07) - 0.15], [splitX + 0.12, rakeY(splitX + 0.12) - 0.15]]);
  const sashFrame = [
    new THREE.Vector3(splitX + 0.06, -1.41, 0.06),
    new THREE.Vector3(2.12, -1.41, 0.06),
    new THREE.Vector3(2.12, dividerY - 0.055, 0.06),
    new THREE.Vector3(splitX + 0.06, dividerY - 0.055, 0.06),
  ];
  sashFrame.forEach((point, index) => boxBetween(
    point,
    sashFrame[(index + 1) % sashFrame.length],
    0.055,
    0.13,
    profileMat,
    0.065,
    sash,
    sashHingeX,
  ));
  beadLoop([[splitX + 0.12, -1.35], [2.07, -1.35], [2.07, dividerY - 0.12], [splitX + 0.12, dividerY - 0.12]], sash, sashHingeX);

  // The operating handle is mounted on the sash's outer stile.
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x8b9695, metalness: 0.55, roughness: 0.28 });
  const handleX = 2.02;
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.27, 0.06), handleMat);
  handle.position.set(handleX - sashHingeX, -0.42, 0.17); sash.add(handle);
  const handleBase = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.11, 0.035), highlightMat);
  handleBase.position.set(handleX - sashHingeX, -0.42, 0.135); sash.add(handleBase);

  // A subtle rear return conveys real PVC profile depth from oblique views.
  outline3.forEach((p, i) => {
    const a = p.clone(); a.z = -depth / 2 - 0.025;
    const b = outline3[(i + 1) % outline3.length].clone(); b.z = -depth / 2 - 0.025;
    boxBetween(a, b, 0.055, 0.04, edgeMat, -depth / 2 - 0.025);
  });
  root.position.y = -0.015;
  return { root, sash };
}

export function WindowPrototype() {
  const hostRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const [camera, setCamera] = useState<Camera>(initialCamera);
  const cameraRef = useRef(camera);
  cameraRef.current = camera;
  const [dragging, setDragging] = useState(false);
  const [sashOpen, setSashOpen] = useState(false);
  const sashOpenRef = useRef(sashOpen);
  sashOpenRef.current = sashOpen;
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2", { antialias: true, alpha: true });
      if (!context) { setFailed(true); return; }
      renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true, alpha: true });
    } catch {
      setFailed(true); return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = "sokol-model-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#e8ece9");
    scene.fog = new THREE.Fog("#e8ece9", 8, 18);
    const camera3d = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera3d.position.set(0.1, 0.12, 8.7);
    const { root: model, sash } = createWindowModel();
    scene.add(model);
    scene.add(new THREE.HemisphereLight(0xf7fbfa, 0x87918e, 2.0));
    const key = new THREE.DirectionalLight(0xfffdf6, 3.1);
    key.position.set(-3.8, 5.7, 7); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); scene.add(key);
    const fill = new THREE.DirectionalLight(0xc5d6d9, 1.4); fill.position.set(5, 1.5, 4); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.7); rim.position.set(0, 4, -4); scene.add(rim);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: 0.14 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -2.02; floor.receiveShadow = true; scene.add(floor);
    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); camera3d.aspect = w / h; camera3d.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    let frame = 0;
    const render = () => {
      const current = cameraRef.current;
      model.rotation.y = current.yaw;
      model.rotation.x = current.pitch;
      const targetSashAngle = sashOpenRef.current ? -1.03 : 0;
      const sashDelta = targetSashAngle - sash.rotation.y;
      sash.rotation.y = Math.abs(sashDelta) < 0.001 ? targetSashAngle : sash.rotation.y + sashDelta * 0.14;
      camera3d.position.z = Math.max(8.4, 8 / camera3d.aspect) / current.zoom;
      camera3d.lookAt(0, 0, 0);
      renderer.render(scene, camera3d);
      frame = requestAnimationFrame(render);
    };
    setReady(true);
    render();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach(m => m.dispose());
        }
      });
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  const zoom = (factor: number) => setCamera(c => ({ ...c, zoom: clamp(c.zoom * factor, 0.72, 1.55) }));
  const reset = () => setCamera(initialCamera);
  const toggleSash = () => setSashOpen(open => !open);
  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId); setDragging(true);
  };
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current; if (!d || d.id !== event.pointerId) return;
    setCamera(c => ({ ...c, yaw: c.yaw + (event.clientX - d.x) * 0.008, pitch: clamp(c.pitch + (event.clientY - d.y) * 0.006, -0.6, 0.6) }));
    dragRef.current = { ...d, x: event.clientX, y: event.clientY };
  };
  const onWheel = (event: WheelEvent<HTMLDivElement>) => { event.preventDefault(); zoom(event.deltaY < 0 ? 1.07 : 0.935); };
  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, [number, number]> = {
      ArrowLeft: [-0.12, 0], ArrowRight: [0.12, 0], ArrowUp: [0, 0.1], ArrowDown: [0, -0.1],
    };
    if (steps[event.key]) {
      event.preventDefault(); const [yaw, pitch] = steps[event.key];
      setCamera(c => ({ ...c, yaw: c.yaw + yaw, pitch: clamp(c.pitch + pitch, -0.6, 0.6) }));
    } else if (event.key === "+" || event.key === "=") { event.preventDefault(); zoom(1.08); }
    else if (event.key === "-") { event.preventDefault(); zoom(0.93); }
    else if (event.key === "0") { event.preventDefault(); reset(); }
    else if (event.key === " ") { event.preventDefault(); toggleSash(); }
  };
  const finishDrag = () => { dragRef.current = null; setDragging(false); };

  return (
    <main className="sokol-prototype">
      <style>{`
        .sokol-prototype{--ink:#253235;--muted:#778384;--line:#cbd2cf;--accent:#526b70;min-height:100dvh;width:100%;box-sizing:border-box;background:#f2f4f1;color:var(--ink);font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;padding:clamp(16px,3vw,38px);display:flex;flex-direction:column}
        .sokol-prototype *{box-sizing:border-box}
        .sokol-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;padding:0 2px 17px;border-bottom:1px solid var(--line)}
        .sokol-kicker{font:600 10px/1.2 ui-monospace,SFMono-Regular,monospace;letter-spacing:.15em;text-transform:uppercase;color:#718080}
         .sokol-title{max-width:23ch;margin:8px 0 0;font-size:clamp(19px,2.25vw,27px);font-weight:560;letter-spacing:-.045em;line-height:1.05}
        .sokol-meta{display:flex;align-items:center;gap:8px;font:500 10px ui-monospace,SFMono-Regular,monospace;letter-spacing:.09em;color:#718080;text-transform:uppercase;white-space:nowrap}
        .sokol-led{height:7px;width:7px;border-radius:50%;background:#78958a;box-shadow:0 0 0 3px #e0e9e4}
        .sokol-stage{position:relative;flex:1;min-height:430px;margin-top:18px;overflow:hidden;border:1px solid #d2d8d5;border-radius:3px;background:radial-gradient(ellipse at 50% 44%,#f3f5f2 0%,#e8ece9 60%,#e2e7e4 100%);box-shadow:0 12px 35px #3447460a}
        .sokol-stage:before{content:"";position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(#75827f0c 1px,transparent 1px),linear-gradient(90deg,#75827f0c 1px,transparent 1px);background-size:36px 36px;mask-image:linear-gradient(to bottom,transparent 8%,#000 88%)}
        .sokol-stage:after{content:"";position:absolute;left:6%;right:6%;bottom:13%;height:1px;background:#aeb8b4;opacity:.48}
        .sokol-model-host{position:absolute;inset:0;touch-action:none;cursor:grab;outline:none}
        .sokol-model-host.is-dragging{cursor:grabbing}
        .sokol-model-canvas{display:block;width:100%;height:100%}
        .sokol-model-host:focus-visible{box-shadow:inset 0 0 0 2px #71888a}
        .sokol-stage-label{position:absolute;z-index:2;top:19px;left:20px;pointer-events:none}
        .sokol-stage-label strong{display:block;font:600 9px ui-monospace,SFMono-Regular,monospace;letter-spacing:.14em;color:#72807f}
        .sokol-stage-label span{display:block;margin-top:5px;font-size:12px;color:#48595a}
        .sokol-dim{position:absolute;z-index:2;pointer-events:none;font:9px ui-monospace,SFMono-Regular,monospace;letter-spacing:.08em;color:#788785}
        .sokol-dim-top{top:21px;left:50%;transform:translateX(-50%)}
        .sokol-dim-side{right:21px;top:50%;writing-mode:vertical-rl;transform:translateY(-50%)}
        .sokol-controls{position:absolute;z-index:3;right:17px;bottom:17px;display:flex;align-items:center;padding:4px;gap:3px;border:1px solid #c8d0cd;background:#f5f7f4e8;border-radius:4px;box-shadow:0 3px 12px #2635360d}
        .sokol-controls button{width:34px;height:32px;border:0;border-radius:2px;background:transparent;color:#536366;display:grid;place-items:center;cursor:pointer;transition:background .16s,color .16s}
        .sokol-controls button:hover{background:#e4eae7;color:#273638}
        .sokol-controls button:focus-visible{outline:2px solid #71888a;outline-offset:1px}
        .sokol-open-toggle{position:absolute;z-index:3;left:17px;bottom:17px;display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 11px;border:1px solid #c8d0cd;border-radius:4px;background:#f5f7f4e8;color:#536366;font:600 11px ui-monospace,SFMono-Regular,monospace;cursor:pointer;box-shadow:0 3px 12px #2635360d;transition:background .16s,color .16s}
        .sokol-open-toggle:hover,.sokol-open-toggle.is-open{background:#e4eae7;color:#273638}
        .sokol-open-toggle:focus-visible{outline:2px solid #71888a;outline-offset:2px}
        .sokol-control-divider{width:1px;height:19px;background:#d4dad7;margin:0 2px}
        .sokol-bottom{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:13px 2px 0;color:#758181;font-size:10px}
        .sokol-instructions{display:flex;align-items:center;gap:9px}
        .sokol-instructions svg{color:#718181}
        .sokol-hint{font:10px ui-monospace,SFMono-Regular,monospace;letter-spacing:.04em}
        .sokol-zoom-readout{font:10px ui-monospace,SFMono-Regular,monospace;color:#687778;letter-spacing:.04em}
        .sokol-error{position:absolute;inset:0;display:grid;place-items:center;color:#667473;font-size:13px}
         @media(max-width:600px){.sokol-prototype{padding:14px}.sokol-head{align-items:flex-start}.sokol-title{max-width:15ch;font-size:clamp(16px,5vw,20px);line-height:1.08}.sokol-meta{font-size:9px}.sokol-stage{min-height:420px;margin-top:12px}.sokol-stage-label{top:13px;left:13px}.sokol-dim-top{top:15px;left:auto;right:38px;transform:none}.sokol-dim-side{right:10px}.sokol-bottom{align-items:flex-start}.sokol-hint{max-width:245px;line-height:1.55}.sokol-controls{right:10px;bottom:10px}.sokol-open-toggle{left:10px;bottom:10px;min-height:38px;padding:0 8px;font-size:10px}}
      `}</style>
      <header className="sokol-head">
        <div>
          <div className="sokol-kicker">ПФ СОКОЛ / ПВХ-КОНСТРУКЦИИ</div>
          <h1 className="sokol-title">Нестандартные архитектурные решения</h1>
        </div>
        <div className="sokol-meta"><span className="sokol-led" /> 3D-предпросмотр</div>
      </header>
      <section className="sokol-stage" aria-label="Интерактивная 3D-модель окна">
        <div className="sokol-stage-label"><strong>КОНСТРУКЦИЯ ПО ФОТО</strong><span>Нижняя правая створка открывается внутрь</span></div>
        <span className="sokol-dim sokol-dim-top">РАЗМЕРЫ УСЛОВНЫЕ</span>
        <span className="sokol-dim sokol-dim-side">СКОШЕННАЯ РАМА</span>
        <div ref={hostRef} className={`sokol-model-host${dragging ? " is-dragging" : ""}`} tabIndex={0}
          role="application" aria-label="3D-модель окна. Потяните для вращения; стрелки меняют угол; плюс и минус меняют масштаб; пробел открывает или закрывает створку; ноль сбрасывает вид."
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={finishDrag} onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag} onWheel={onWheel} onKeyDown={onKey}>
          {(failed || !ready) && (
            <svg viewBox="0 0 720 490" role="img" aria-label={`Окно со скосом, ${sashOpen ? "створка открыта" : "створка закрыта"}`}
              style={{ position: "absolute", inset: "4% 5%", width: "90%", height: "92%", overflow: "visible", transform: `perspective(1100px) rotateY(${camera.yaw * 14}deg) rotateX(${camera.pitch * 12}deg) scale(${camera.zoom})` }}>
              <defs>
                <linearGradient id="sokol-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c5dadd" stopOpacity=".68" /><stop offset=".56" stopColor="#d9e4e1" stopOpacity=".34" /><stop offset="1" stopColor="#8da9ab" stopOpacity=".58" /></linearGradient>
                <linearGradient id="sokol-pvc" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff" /><stop offset="1" stopColor="#dce1de" /></linearGradient>
                <filter id="sokol-shadow" x="-30%" y="-30%" width="170%" height="180%"><feGaussianBlur stdDeviation="10" /></filter>
              </defs>
              <ellipse cx="365" cy="414" rx="244" ry="15" fill="#596966" opacity=".17" filter="url(#sokol-shadow)" />
              <path d="M92 421 L92 277 L610 18 L610 421 Z M120 391 L120 291 L594 54 L594 391 Z" fill="#aeb7b4" fillRule="evenodd" stroke="#929d99" strokeWidth="2" strokeLinejoin="round" />
              <path d="M120 391 L120 291 L594 54 L594 391 Z M146 365 L146 305 L568 94 L568 365 Z" fill="url(#sokol-pvc)" fillRule="evenodd" stroke="#d1d8d4" strokeWidth="4" strokeLinejoin="round" />
              <path d="M147 306 L363 178 L363 356 L147 356 Z" fill="url(#sokol-glass)" stroke="#647679" strokeWidth="5" />
              <path d="M374 198 L568 198 L568 84 L374 174 Z" fill="url(#sokol-glass)" stroke="#647679" strokeWidth="5" />
              {sashOpen ? (
                <>
                  <path d="M374 218 L568 218 L568 356 L374 356 Z" fill="none" stroke="#647679" strokeWidth="4" />
                  <path d="M374 218 L486 232 L486 339 L374 356 Z" fill="url(#sokol-glass)" stroke="#647679" strokeWidth="5" />
                  <path d="M374 218 L486 232 L486 339 L374 356 Z" fill="none" stroke="url(#sokol-pvc)" strokeWidth="9" strokeLinejoin="round" />
                  <path d="M478 275 L478 299" stroke="#84908e" strokeWidth="5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M374 218 L568 218 L568 356 L374 356 Z" fill="url(#sokol-glass)" stroke="#647679" strokeWidth="5" />
                  <path d="M548 275 L548 300" stroke="#84908e" strokeWidth="5" strokeLinecap="round" />
                </>
              )}
              <path d="M357 176 L366 172 L366 365 L357 365 Z" fill="url(#sokol-pvc)" stroke="#cbd2cf" strokeWidth="2" />
              <path d="M361 201 L574 201 L574 217 L361 217 Z" fill="#edf0ed" stroke="#cbd2cf" strokeWidth="2" />
              <path d="M129 386 L129 295 L589 64 L589 386 Z" fill="none" stroke="#fff" strokeWidth="9" strokeLinejoin="round" opacity=".9" />
              <path d="M157 361 L157 312 L352 208 L352 361 Z" fill="none" stroke="#e9eeeb" strokeWidth="3" />
              <path d="M108 399 L604 399" stroke="#9ba6a3" strokeWidth="5" opacity=".56" />
            </svg>
          )}
        </div>
        <button className={`sokol-open-toggle${sashOpen ? " is-open" : ""}`} type="button" aria-pressed={sashOpen} onClick={toggleSash} data-testid="button-sokol-sash-toggle">
          <DoorOpen size={15} aria-hidden="true" />
          {sashOpen ? "Закрыть створку" : "Открыть створку"}
        </button>
        <div className="sokol-controls" role="group" aria-label="Model view controls">
          <button type="button" onClick={() => zoom(0.9)} aria-label="Zoom out"><Minus size={15} /></button>
          <button type="button" onClick={reset} aria-label="Reset view"><RotateCcw size={14} /></button>
          <button type="button" onClick={() => zoom(1.1)} aria-label="Zoom in"><Plus size={15} /></button>
        </div>
      </section>
      <footer className="sokol-bottom">
        <div className="sokol-instructions"><Move3D size={14} /><span className="sokol-hint">Тяните для вращения · колесо — масштаб · стрелки — обзор</span></div>
        <span className="sokol-zoom-readout">МАСШТАБ {Math.round(camera.zoom * 100)}%</span>
      </footer>
    </main>
  );
}