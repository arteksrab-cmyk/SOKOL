import type { Face, Point3 } from './model-types';

export type WindowScene = 'facade' | 'arched' | 'sloped';

const framePalette = ['#E8EDF0', '#8B9AA2', '#C4D0D5', '#61727B', '#A9B8BE', '#F7F9F8'] as const;
const darkFramePalette = ['#4C5B61', '#1F2C31', '#35464D', '#152126', '#66767D', '#6E7E84'] as const;
const wallPalette = ['#D8D1C4', '#8E877C', '#C2BBAF', '#746D64', '#B4ADA2', '#EAE4D9'] as const;

function addBox(faces: Face[], center: Point3, size: Point3, colors: readonly string[]) {
  const [x, y, z] = center;
  const [sx, sy, sz] = size;
  const x0 = x - sx / 2;
  const x1 = x + sx / 2;
  const y0 = y - sy / 2;
  const y1 = y + sy / 2;
  const z0 = z - sz / 2;
  const z1 = z + sz / 2;
  const a: Point3 = [x0, y0, z0];
  const b: Point3 = [x1, y0, z0];
  const c: Point3 = [x1, y1, z0];
  const d: Point3 = [x0, y1, z0];
  const e: Point3 = [x0, y0, z1];
  const f: Point3 = [x1, y0, z1];
  const g: Point3 = [x1, y1, z1];
  const h: Point3 = [x0, y1, z1];
  [
    [d, c, g, h],
    [a, b, f, e],
    [e, f, g, h],
    [a, b, c, d],
    [a, d, h, e],
    [b, c, g, f],
  ].forEach((points, index) => faces.push({ points, fill: colors[index % colors.length] }));
}

function addPlane(faces: Face[], points: Point3[], fill: string, stroke = 'rgba(20, 30, 34, 0.46)') {
  faces.push({ points, fill, stroke });
}

function rotateAroundHinge(point: Point3, hingeX: number, hingeZ: number, angle: number): Point3 {
  const localX = point[0] - hingeX;
  const localZ = point[2] - hingeZ;
  return [
    hingeX + localX * Math.cos(angle) - localZ * Math.sin(angle),
    point[1],
    hingeZ + localX * Math.sin(angle) + localZ * Math.cos(angle),
  ];
}

function addRotatedBox(
  faces: Face[],
  center: Point3,
  size: Point3,
  colors: readonly string[],
  hingeX: number,
  hingeZ: number,
  angle: number,
) {
  const firstFace = faces.length;
  addBox(faces, center, size, colors);
  for (const face of faces.slice(firstFace)) {
    face.points = face.points.map((point) => rotateAroundHinge(point, hingeX, hingeZ, angle));
  }
}

function addRotatedBar(
  faces: Face[],
  start: Point3,
  end: Point3,
  width: number,
  depth: number,
  colors: readonly string[],
  hingeX: number,
  hingeZ: number,
  angle: number,
) {
  const center: Point3 = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2];
  const length = Math.hypot(end[0] - start[0], end[1] - start[1], end[2] - start[2]);
  if (Math.abs(end[1] - start[1]) > Math.abs(end[0] - start[0])) {
    addRotatedBox(faces, center, [width, length, depth], colors, hingeX, hingeZ, angle);
  } else {
    addRotatedBox(faces, center, [length, width, depth], colors, hingeX, hingeZ, angle);
  }
}

function addSash(
  faces: Face[],
  left: number,
  right: number,
  hingeX: number,
  hingeZ: number,
  angle: number,
  handleX: number | null,
  handleDirection: -1 | 1 = 1,
  bounds: { bottom?: number; top?: number; handleY?: number } = {},
) {
  const bottom = bounds.bottom ?? -1.48;
  const top = bounds.top ?? 1.48;
  const handleY = bounds.handleY ?? 0.17;
  const z = hingeZ;
  const panelCorners = [[left, bottom, z], [right, bottom, z], [right, top, z], [left, top, z]] as Point3[];
  addPlane(faces, panelCorners.map((point) => rotateAroundHinge(point, hingeX, hingeZ, angle)), '#9BBFC4', 'rgba(24, 44, 49, 0.5)');
  addRotatedBar(faces, [left, bottom, z + 0.05], [left, top, z + 0.05], 0.14, 0.14, framePalette, hingeX, hingeZ, angle);
  addRotatedBar(faces, [right, bottom, z + 0.05], [right, top, z + 0.05], 0.14, 0.14, framePalette, hingeX, hingeZ, angle);
  addRotatedBar(faces, [left, bottom, z + 0.05], [right, bottom, z + 0.05], 0.14, 0.14, framePalette, hingeX, hingeZ, angle);
  addRotatedBar(faces, [left, top, z + 0.05], [right, top, z + 0.05], 0.14, 0.14, framePalette, hingeX, hingeZ, angle);
  if (handleX !== null) {
    addRotatedBar(faces, [handleX, handleY - 0.22, z + 0.13], [handleX, handleY + 0.05, z + 0.13], 0.06, 0.08, darkFramePalette, hingeX, hingeZ, angle);
    const leverEndX = handleX + handleDirection * 0.15;
    addRotatedBar(faces, [handleX, handleY, z + 0.13], [leverEndX, handleY, z + 0.13], 0.07, 0.08, darkFramePalette, hingeX, hingeZ, angle);
  }
}

function buildFacadeScene(isOpen: boolean): Face[] {
  const faces: Face[] = [];
  addBox(faces, [-2.9, 0, -0.18], [0.4, 5.1, 0.32], wallPalette);
  addBox(faces, [2.9, 0, -0.18], [0.4, 5.1, 0.32], wallPalette);
  addBox(faces, [0, 2.175, -0.18], [6.2, 0.75, 0.32], wallPalette);
  addBox(faces, [0, -2.175, -0.18], [6.2, 0.75, 0.32], wallPalette);
  addBox(faces, [0, 1.63, 0.35], [5.2, 0.19, 0.38], framePalette);
  addBox(faces, [0, -1.63, 0.35], [5.2, 0.19, 0.38], framePalette);
  addBox(faces, [-2.51, 0, 0.35], [0.19, 3.45, 0.38], framePalette);
  addBox(faces, [2.51, 0, 0.35], [0.19, 3.45, 0.38], framePalette);
  addBox(faces, [0, 0, 0.38], [0.18, 3.12, 0.24], framePalette);
  addBox(faces, [0, -1.9, 0.5], [5.6, 0.22, 0.75], framePalette);
  addBox(faces, [0, -2.25, 0.02], [6.25, 0.12, 0.68], darkFramePalette);
  const hingeZ = 0.48;
  const openingAngle = isOpen ? -1.05 : 0;
  addSash(faces, -2.43, -0.09, -0.09, hingeZ, 0, null);
  addSash(faces, 0.09, 2.43, 2.43, hingeZ, openingAngle, 0.09, 1);
  return faces;
}

function buildSlopedScene(isOpen: boolean): Face[] {
  const faces: Face[] = [];
  const outer: Point3[] = [
    [-2.7, -1.72, 0.48],
    [-2.7, -0.72, 0.48],
    [2.7, 1.62, 0.48],
    [2.7, -1.72, 0.48],
  ];
  const inner: Point3[] = [
    [-2.43, -1.49, 0.48],
    [-2.43, -0.83, 0.48],
    [2.43, 1.34, 0.48],
    [2.43, -1.49, 0.48],
  ];
  const backZ = 0.14;
  const frontZ = 0.57;
  const splitX = 0.08;
  const hingeX = 0.24;
  const hingeZ = 0.58;
  const transomY = 0.18;
  const openingAngle = isOpen ? 0.96 : 0;
  const wallDepth = 0.32;
  // Seat the original frame against the wall, without a floating sloped gap.
  const wallFrontZ = backZ;
  const wallBackZ = wallFrontZ - wallDepth;
  const rakeY = (x: number) => -0.83 + ((x + 2.43) / 4.86) * 2.17;
  const frameFront = '#E8EDF0';
  const frameSide = '#A9B8BE';

  const wallOuter: Point3[] = [
    [-3.1, -2.05, 0],
    [-3.1, 2.05, 0],
    [3.1, 2.05, 0],
    [3.1, -2.05, 0],
  ];
  for (let index = 0; index < outer.length; index += 1) {
    const next = (index + 1) % outer.length;
    const wallA = wallOuter[index];
    const wallB = wallOuter[next];
    const openingA = outer[index];
    const openingB = outer[next];
    addPlane(faces, [
      [wallA[0], wallA[1], wallFrontZ],
      [wallB[0], wallB[1], wallFrontZ],
      [openingB[0], openingB[1], wallFrontZ],
      [openingA[0], openingA[1], wallFrontZ],
    ], wallPalette[2], 'rgba(95, 89, 79, 0.3)');
    addPlane(faces, [
      [wallA[0], wallA[1], wallBackZ],
      [openingA[0], openingA[1], wallBackZ],
      [openingB[0], openingB[1], wallBackZ],
      [wallB[0], wallB[1], wallBackZ],
    ], wallPalette[3], 'rgba(95, 89, 79, 0.3)');
    // Close the outside of the wall as well as the aperture: every edge
    // connects the same two depth planes, just like the solid walls in 01.
    addPlane(faces, [
      [wallA[0], wallA[1], wallBackZ],
      [wallB[0], wallB[1], wallBackZ],
      [wallB[0], wallB[1], wallFrontZ],
      [wallA[0], wallA[1], wallFrontZ],
    ], wallPalette[4], 'rgba(95, 89, 79, 0.3)');
    addPlane(faces, [
      [openingA[0], openingA[1], wallBackZ],
      [openingB[0], openingB[1], wallBackZ],
      [openingB[0], openingB[1], wallFrontZ],
      [openingA[0], openingA[1], wallFrontZ],
    ], wallPalette[(index + 1) % wallPalette.length], 'rgba(95, 89, 79, 0.42)');
  }
  addBox(faces, [0, -1.89, 0.38], [6.05, 0.18, 0.72], framePalette);
  for (let index = 0; index < outer.length; index += 1) {
    const next = (index + 1) % outer.length;
    const outerA = outer[index];
    const outerB = outer[next];
    const innerA = inner[index];
    const innerB = inner[next];
    addPlane(faces, [
      [outerA[0], outerA[1], frontZ],
      [outerB[0], outerB[1], frontZ],
      [innerB[0], innerB[1], frontZ],
      [innerA[0], innerA[1], frontZ],
    ], frameFront, 'rgba(72, 91, 97, 0.42)');
    addPlane(faces, [
      [outerA[0], outerA[1], backZ],
      [outerB[0], outerB[1], backZ],
      [outerB[0], outerB[1], frontZ],
      [outerA[0], outerA[1], frontZ],
    ], frameSide, 'rgba(72, 91, 97, 0.38)');
    addPlane(faces, [
      [innerA[0], innerA[1], backZ],
      [innerA[0], innerA[1], frontZ],
      [innerB[0], innerB[1], frontZ],
      [innerB[0], innerB[1], backZ],
    ], frameSide, 'rgba(72, 91, 97, 0.38)');
    addPlane(faces, [
      [outerA[0], outerA[1], backZ],
      [innerA[0], innerA[1], backZ],
      [innerB[0], innerB[1], backZ],
      [outerB[0], outerB[1], backZ],
    ], frameSide, 'rgba(72, 91, 97, 0.38)');
  }

  addPlane(faces, [
    [-2.43, -1.49, 0.52],
    [splitX, -1.49, 0.52],
    [splitX, rakeY(splitX), 0.52],
    [-2.43, rakeY(-2.43), 0.52],
  ], '#9BBFC4', 'rgba(24, 44, 49, 0.5)');
  addPlane(faces, [
    [splitX, transomY, 0.52],
    [2.43, transomY, 0.52],
    [2.43, rakeY(2.43), 0.52],
    [splitX, rakeY(splitX), 0.52],
  ], '#9BBFC4', 'rgba(24, 44, 49, 0.5)');
  addBox(faces, [splitX, (-1.45 + rakeY(splitX)) / 2, 0.53], [0.16, rakeY(splitX) + 1.45, 0.2], framePalette);
  addBox(faces, [(splitX + 2.36) / 2, transomY, 0.54], [2.36 - splitX, 0.12, 0.19], framePalette);

  addSash(
    faces,
    hingeX,
    2.36,
    hingeX,
    hingeZ,
    openingAngle,
    2.28,
    -1,
    { bottom: -1.42, top: transomY - 0.075, handleY: -0.64 },
  );

  return faces;
}

function archPoints(centerX: number, baseY: number, width: number, height: number, depth: number): Point3[] {
  const points: Point3[] = [[centerX - width / 2, baseY, depth], [centerX + width / 2, baseY, depth], [centerX + width / 2, baseY + height * 0.56, depth]];
  for (let index = 0; index <= 8; index += 1) {
    const theta = (Math.PI * index) / 8;
    points.push([centerX + Math.cos(theta) * (width / 2), baseY + height * 0.56 + Math.sin(theta) * height * 0.44, depth]);
  }
  points.push([centerX - width / 2, baseY + height * 0.56, depth]);
  return points;
}

function buildArchedScene(): Face[] {
  const faces: Face[] = [];
  addBox(faces, [0, 0.1, -0.3], [7.2, 4.5, 0.3], wallPalette);
  const centers = [-2.7, -1.35, 0, 1.35, 2.7];
  centers.forEach((centerX, index) => {
    const width = 1.05;
    const base = -1.65;
    const height = index === 2 ? 3.2 : 2.72;
    addBox(faces, [centerX, base + 0.48, 0.17], [width, 0.12, 0.34], framePalette);
    addPlane(faces, archPoints(centerX, base, width, height, 0.14), '#263B42');
    const inner = archPoints(centerX, base + 0.13, width - 0.22, height - 0.18, 0.3);
    addPlane(faces, inner, index === 2 ? '#8FBCC1' : '#6B959B', 'rgba(235, 241, 239, 0.55)');
    addBox(faces, [centerX, base + 0.1, 0.37], [0.1, height * 0.57, 0.18], framePalette);
    addBox(faces, [centerX, base + height * 0.58, 0.37], [0.1, 0.1, 0.18], framePalette);
  });
  addBox(faces, [0, -1.99, 0.4], [7.2, 0.2, 0.75], darkFramePalette);
  addBox(faces, [0, 1.98, 0.1], [7.2, 0.15, 0.36], framePalette);
  addBox(faces, [0, 2.16, 0.02], [7.3, 0.09, 0.38], framePalette);
  return faces;
}

export function buildWindowScene(scene: WindowScene, isOpen: boolean): Face[] {
  if (scene === 'arched') return buildArchedScene();
  if (scene === 'sloped') return buildSlopedScene(isOpen);
  return buildFacadeScene(isOpen);
}