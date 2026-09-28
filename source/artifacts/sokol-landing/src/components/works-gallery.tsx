import { useEffect, useMemo, useRef, useState, type FocusEvent, type TouchEvent } from 'react';
import { ArrowLeft, ArrowRight, Expand, Pause, Play, X } from 'lucide-react';
import workPhoto01 from '@assets/q887KnWlW01vgzChEzTX4e_eWjkFaH3w50WwgHHDx898g78fj4bshsQVGQl_f2_1789833489841.jpg';
import workPhoto02 from '@assets/xdRaF88Lf3jpg0cgWhmF7tAp0fRIxlbz1DFojgVHYLOTAv8htpRCC8VlnEXNqM_1789833489864.jpg';
import workPhoto03 from '@assets/53yqnKQq30i2h1BpyCcqC88zIM9HNW6jH3UjtphlHkOMIU4KQB4Q6q06XIfXNP_1789833489884.jpg';
import workPhoto04 from '@assets/Zf1im9q09Pj34LkUbs6vpqPfk0OyFXYvK4W-SClWADkkyfudv7_VLib11emVJO_1789833489908.jpg';
import workPhoto05 from '@assets/Dq5PhjWjB51BPLOzSHnOWK5p-3iRwSJrQC0VMl-m0FvykZL_x0mEpPEH97deaV_1789833489933.jpg';
import workPhoto06 from '@assets/rhZGOhXvAFMa5jP5AzOGO-u83U9d9p80ZGIxx3axoM8OYqAa84u3cvnS3YfXcG_1789833489957.jpg';
import workPhoto07 from '@assets/jlO26ekiNiEbTFidH32mVIx5JQRVF_sgO-i-7tRoamXvWaAaevfb-xrd31hsWu_1789833489982.jpg';
import workPhoto08 from '@assets/yBt4zdfDMt9FpdOH63mKunsNOypQjAsDSa0bs_YVi-QAw_8S-oIjv_WwJdqxPw_1789833490014.jpg';
import workPhoto09 from '@assets/VgU1TIApVI-GyPl_1zcgj7YAGBxYOqQ36cM5Ug1o3Qgkl_4nQgGj2PYtV2lVI6_1789833490043.jpg';
import workPhoto10 from '@assets/9JPoP1kW1ePVUDn_CgzwBjZQKETqVcVpOgqSyrNUwINdiLwkWFQSzN6uoyUZY__1789833490065.jpg';
import workPhoto11 from '@assets/wN1_dWgpez6npllKSnximKDTGTFnphyLRYj-CO1QA5SqhdbuYD1-lcVO2KIVm0_1789833490087.jpg';

type WorkCategory = 'Дома' | 'Квартиры' | 'Балконы и террасы' | 'Двери и перегородки' | 'Другие решения';
type WorkFilter = 'Все объекты' | WorkCategory;

type WorkPhoto = {
  src: string;
  alt: string;
  category: WorkCategory;
};

const sitePath = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

const workPhotos: WorkPhoto[] = [
  { src: workPhoto01, alt: 'Остекление частного дома', category: 'Дома' },
  { src: workPhoto02, alt: 'Профили и комплектующие для окон', category: 'Другие решения' },
  { src: workPhoto03, alt: 'Окно в кирпичном доме', category: 'Дома' },
  { src: workPhoto04, alt: 'Панорамное окно в кирпичном доме', category: 'Дома' },
  { src: workPhoto05, alt: 'Оконный блок в квартире', category: 'Квартиры' },
  { src: workPhoto06, alt: 'Реализованный объект ПФ СОКОЛ', category: 'Другие решения' },
  { src: workPhoto07, alt: 'Оконное решение на объекте', category: 'Другие решения' },
  { src: workPhoto08, alt: 'Остекление жилого объекта', category: 'Другие решения' },
  { src: workPhoto09, alt: 'Готовое оконное решение', category: 'Другие решения' },
  { src: workPhoto10, alt: 'Остекление и монтаж на объекте', category: 'Другие решения' },
  { src: workPhoto11, alt: 'Оконная конструкция после монтажа', category: 'Другие решения' },
  { src: sitePath('/works/work-12-building-window-installation.jpg'), alt: 'Монтаж остекления на фасаде здания', category: 'Другие решения' },
  { src: sitePath('/works/work-13-glazed-interior-door.jpg'), alt: 'Межкомнатная дверь с матовым стеклом', category: 'Двери и перегородки' },
  { src: sitePath('/works/work-14-apartment-window.jpg'), alt: 'Окно в квартире с радиатором отопления', category: 'Квартиры' },
  { src: sitePath('/works/work-15-wooden-house-windows.jpg'), alt: 'Окна в деревянном доме', category: 'Дома' },
  { src: sitePath('/works/work-16-terrace-glazing.jpg'), alt: 'Остекление террасы деревянного дома', category: 'Балконы и террасы' },
  { src: sitePath('/works/work-17-panoramic-veranda-glazing.jpg'), alt: 'Панорамное остекление веранды', category: 'Балконы и террасы' },
  { src: sitePath('/works/work-18-new-house-windows.jpg'), alt: 'Установленные окна в деревянном доме', category: 'Дома' },
  { src: sitePath('/works/work-19-interior-window-installation.jpg'), alt: 'Окно с подоконником в помещении', category: 'Квартиры' },
];

const workFilters: { value: WorkFilter; label: string; id: string }[] = [
  { value: 'Все объекты', label: 'Все объекты', id: 'all' },
  { value: 'Дома', label: 'Дома', id: 'houses' },
  { value: 'Квартиры', label: 'Квартиры', id: 'apartments' },
  { value: 'Балконы и террасы', label: 'Балконы и террасы', id: 'terraces' },
  { value: 'Двери и перегородки', label: 'Двери и перегородки', id: 'doors' },
  { value: 'Другие решения', label: 'Другие решения', id: 'other' },
];

export function WorksGallery() {
  const [category, setCategory] = useState<WorkFilter>('Все объекты');
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));
  const touchStartX = useRef<number | null>(null);
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  const visiblePhotos = useMemo(
    () => category === 'Все объекты' ? workPhotos : workPhotos.filter((photo) => photo.category === category),
    [category],
  );
  const activePhoto = visiblePhotos[activeIndex] ?? visiblePhotos[0];
  const lightboxPhoto = lightboxIndex === null ? null : visiblePhotos[lightboxIndex] ?? activePhoto;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;

    if (lightboxIndex !== null && !dialog.open) {
      dialog.showModal();
      lightboxCloseRef.current?.focus();
    } else if (lightboxIndex === null && dialog.open) {
      dialog.close();
    }
  }, [lightboxIndex]);

  useEffect(() => {
    if (
      prefersReducedMotion
      || userPaused
      || isHovered
      || hasFocus
      || isTouching
      || lightboxIndex !== null
      || visiblePhotos.length < 2
    ) return;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % visiblePhotos.length);
    }, 5200);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, category, hasFocus, isHovered, isTouching, lightboxIndex, prefersReducedMotion, userPaused, visiblePhotos.length]);

  const goTo = (index: number) => {
    setActiveIndex(((index % visiblePhotos.length) + visiblePhotos.length) % visiblePhotos.length);
  };

  const changeLightboxPhoto = (direction: number) => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return (current + direction + visiblePhotos.length) % visiblePhotos.length;
    });
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
    setIsTouching(true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current !== null) {
      const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
      const distance = touchEndX - touchStartX.current;
      if (Math.abs(distance) > 45) {
        goTo(activeIndex + (distance < 0 ? 1 : -1));
      }
    }
    touchStartX.current = null;
    setIsTouching(false);
  };

  const handleBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setHasFocus(false);
  };

  if (!activePhoto) return null;

  return (
    <section className="works-section section light-grid" id="наши-работы" aria-labelledby="works-title">
      <div className="works-layout">
        <div className="reveal">
          <span className="eyebrow">Наши объекты</span>
          <h2 className="section-heading display mt-7" id="works-title">Наши <em>работы.</em></h2>
          <p className="section-copy mt-8">
            Показываем реальные решения «ПФ СОКОЛ» — от отдельных окон и дверей до полного остекления дома.
          </p>
          <div className="works-meta mt-10">
            <span>ПФ СОКОЛ / портфолио</span>
            <span>{workPhotos.length} объектов</span>
          </div>
          <div className="works-filters" role="group" aria-label="Фильтр фотографий объектов">
            {workFilters.map((filter) => (
              <button
                className="works-filter"
                type="button"
                key={filter.value}
                aria-pressed={category === filter.value}
                onClick={() => {
                  setCategory(filter.value);
                  setActiveIndex(0);
                }}
                data-testid={`filter-work-${filter.id}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="works-carousel reveal delay-1"
          role="region"
          aria-roledescription="carousel"
          aria-label="Фотографии выполненных работ"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              goTo(activeIndex - 1);
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              goTo(activeIndex + 1);
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setHasFocus(true)}
          onBlurCapture={handleBlurCapture}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStartX.current = null;
            setIsTouching(false);
          }}
        >
          <div className="works-frame">
            <button
              className="works-image-trigger"
              type="button"
              onClick={() => setLightboxIndex(activeIndex)}
              aria-label={`Открыть крупнее: ${activePhoto.alt}`}
              data-testid="button-open-work"
            >
              <img
                key={activePhoto.src}
                className="works-image"
                src={activePhoto.src}
                alt={activePhoto.alt}
                draggable="false"
              />
              <span className="works-expand-hint"><Expand size={15} aria-hidden="true" /> Открыть фото</span>
            </button>
            <span className="works-frame-caption">{activePhoto.category}</span>
          </div>
          <div className="works-photo-caption">
            <p>{activePhoto.alt}</p>
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(visiblePhotos.length).padStart(2, '0')}</span>
          </div>
          <div className="works-controls">
            <button className="works-arrow works-arrow-previous" type="button" aria-label="Предыдущая работа" onClick={() => goTo(activeIndex - 1)} data-testid="button-work-previous">
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <div className="works-dots" role="group" aria-label="Выбрать работу">
              {visiblePhotos.map((photo, index) => (
                <button
                  className={`works-dot ${index === activeIndex ? 'is-active' : ''}`}
                  type="button"
                  key={photo.src}
                  aria-label={`Работа ${index + 1}: ${photo.alt}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => goTo(index)}
                  data-testid={`button-work-${index + 1}`}
                />
              ))}
            </div>
            <button className="works-arrow" type="button" aria-label="Следующая работа" onClick={() => goTo(activeIndex + 1)} data-testid="button-work-next">
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              className="works-autoplay-toggle"
              type="button"
              aria-label={prefersReducedMotion
                ? 'Автосмена отключена настройкой уменьшения движения'
                : userPaused ? 'Возобновить автосмену фотографий' : 'Приостановить автосмену фотографий'}
              aria-pressed={userPaused || prefersReducedMotion}
              disabled={prefersReducedMotion}
              onClick={() => setUserPaused((paused) => !paused)}
              data-testid="button-toggle-work-autoplay"
            >
              {userPaused || prefersReducedMotion
                ? <Play size={16} aria-hidden="true" />
                : <Pause size={16} aria-hidden="true" />}
            </button>
          </div>
          {prefersReducedMotion && (
            <p className="works-motion-note">Автосмена остановлена из-за настройки уменьшения движения.</p>
          )}
        </div>
      </div>

      <dialog
        ref={lightboxRef}
        className="works-lightbox"
        aria-labelledby="works-lightbox-title"
        onCancel={(event) => {
          event.preventDefault();
          setLightboxIndex(null);
        }}
        onClose={() => setLightboxIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setLightboxIndex(null);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            changeLightboxPhoto(-1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            changeLightboxPhoto(1);
          }
        }}
        data-testid="dialog-work-lightbox"
      >
        {lightboxPhoto && (
          <div className="works-lightbox-content">
            <div className="works-lightbox-header">
              <div>
                <span className="eyebrow">{lightboxPhoto.category}</span>
                <h2 className="works-lightbox-title display" id="works-lightbox-title">{lightboxPhoto.alt}</h2>
              </div>
              <button
                ref={lightboxCloseRef}
                className="works-lightbox-close"
                type="button"
                aria-label="Закрыть просмотр фотографии"
                onClick={() => setLightboxIndex(null)}
                data-testid="button-close-work-lightbox"
              >
                <X size={21} aria-hidden="true" />
              </button>
            </div>
            <figure className="works-lightbox-figure">
              <img src={lightboxPhoto.src} alt={lightboxPhoto.alt} className="works-lightbox-image" />
              <figcaption>{String((lightboxIndex ?? 0) + 1).padStart(2, '0')} / {String(visiblePhotos.length).padStart(2, '0')}</figcaption>
            </figure>
            <div className="works-lightbox-controls">
              <button className="works-arrow" type="button" aria-label="Предыдущая фотография" onClick={() => changeLightboxPhoto(-1)} data-testid="button-lightbox-previous">
                <ArrowLeft size={18} aria-hidden="true" /> Предыдущая
              </button>
              <button className="works-arrow" type="button" aria-label="Следующая фотография" onClick={() => changeLightboxPhoto(1)} data-testid="button-lightbox-next">
                Следующая <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}