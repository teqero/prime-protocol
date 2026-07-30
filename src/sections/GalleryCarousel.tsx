import { useRef, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { src: '/images/gallery-1.jpg', title: 'Cimeira Tecnológica', category: 'Corporativo' },
  { src: '/images/gallery-2.jpg', title: 'Cerimónia de Estado', category: 'Cerimonial' },
  { src: '/images/gallery-3.jpg', title: 'Evento Institucional', category: 'Institucional' },
  { src: '/images/gallery-4.jpg', title: 'Receção Diplomática', category: 'Diplomático' },
  { src: '/images/gallery-5.jpg', title: 'Conferência Executiva', category: 'Corporativo' },
  { src: '/images/gallery-6.jpg', title: 'Gala de Prestígio', category: 'Social' },
];

export default function GalleryCarousel() {
  const { t, theme } = useAppContext();
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const next = () => setCurrent((prev) => (prev + 1) % galleryImages.length);
  const prev = () => setCurrent((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(next, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  return (
    <section
      id="gallery"
      className="w-full py-24 lg:py-32"
      style={{ backgroundColor: 'var(--pp-bg-2)' }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-[#c9956b]" />
            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
              Os Nossos Momentos
            </span>
            <div className="w-12 h-[1px] bg-[#c9956b]" />
          </div>
          <h2 className="font-serif text-[48px] lg:text-[56px] font-normal leading-[1.1]"
              style={{ color: 'var(--pp-text)' }}>
            Galeria de <span className="font-semibold">Eventos</span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative overflow-hidden mx-auto max-w-[1100px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {galleryImages.map((img, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <div
                  className="relative aspect-[16/9] max-h-[600px] cursor-pointer group"
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#c9956b] mb-2 block">
                      {img.category}
                    </span>
                    <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#f5f0e8]">
                      {img.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border flex items-center justify-center transition-all duration-300"
            style={{ backgroundColor: 'rgba(13,15,20,0.8)', borderColor: 'var(--pp-border)', color: 'var(--pp-text)' }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border flex items-center justify-center transition-all duration-300"
            style={{ backgroundColor: 'rgba(13,15,20,0.8)', borderColor: 'var(--pp-border)', color: 'var(--pp-text)' }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[2px] transition-all duration-300 ${
                  i === current ? 'w-8 bg-[#c9956b]' : 'w-4 bg-[#2a2520] hover:bg-[#6b6560]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] backdrop-blur-md flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(13,15,20,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-2xl"
            style={{ color: 'var(--pp-text)' }}
          >
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(lightbox === 0 ? galleryImages.length - 1 : lightbox - 1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border flex items-center justify-center transition-all"
            style={{ backgroundColor: 'rgba(13,15,20,0.8)', borderColor: 'var(--pp-border)', color: 'var(--pp-text)' }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border flex items-center justify-center transition-all"
            style={{ backgroundColor: 'rgba(13,15,20,0.8)', borderColor: 'var(--pp-border)', color: 'var(--pp-text)' }}
          >
            <ChevronRight size={20} />
          </button>

          <div className="max-w-5xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4">
              <p className="font-serif text-xl" style={{ color: 'var(--pp-text)' }}>{galleryImages[lightbox].title}</p>
              <p className="text-[10px] text-[#c9956b] tracking-[0.2em] uppercase">{galleryImages[lightbox].category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
