import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { src: '/images/gallery-1.jpg', title: 'Cimeira Tecnológica', category: 'Corporativo' },
  { src: '/images/gallery-2.jpg', title: 'Cerimónia de Estado', category: 'Cerimonial' },
  { src: '/images/gallery-3.jpg', title: 'Evento Institucional', category: 'Institucional' },
  { src: '/images/gallery-4.jpg', title: 'Receção Diplomática', category: 'Diplomático' },
  { src: '/images/gallery-5.jpg', title: 'Conferência Executiva', category: 'Corporativo' },
  { src: '/images/gallery-6.jpg', title: 'Gala de Prestígio', category: 'Social' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox((prev) => (prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1));
  const nextImage = () => setLightbox((prev) => (prev === null ? null : prev === galleryImages.length - 1 ? 0 : prev + 1));

  return (
    <section id="gallery" className="w-full bg-[#111318] py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-[#c9956b]" />
            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#c9956b]">
              Os Nossos Momentos
            </span>
            <div className="w-12 h-[1px] bg-[#c9956b]" />
          </div>
          <h2 className="font-serif text-[48px] lg:text-[56px] font-normal text-[#f5f0e8] leading-[1.1]">
            Galeria de <span className="font-semibold">Eventos</span>
          </h2>
        </div>

        {/* Gallery Grid - masonry style */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative group cursor-pointer overflow-hidden ${
                i === 0 ? 'lg:col-span-2 aspect-[2/1]' : 'aspect-square'
              }`}
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#0d0f14]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#c9956b] mb-2">
                  {img.category}
                </span>
                <h3 className="font-serif text-xl font-semibold text-[#f5f0e8]">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[#0d0f14]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-[#f5f0e8] hover:text-[#c9956b] transition-colors z-10"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 lg:left-8 w-12 h-12 flex items-center justify-center text-[#f5f0e8] hover:text-[#c9956b] transition-colors z-10"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 lg:right-8 w-12 h-12 flex items-center justify-center text-[#f5f0e8] hover:text-[#c9956b] transition-colors z-10"
          >
            <ChevronRight size={32} />
          </button>

          <div className="max-w-5xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4">
              <p className="font-serif text-lg text-[#f5f0e8]">{galleryImages[lightbox].title}</p>
              <p className="text-[10px] text-[#c9956b] tracking-[0.2em] uppercase font-sans">{galleryImages[lightbox].category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
