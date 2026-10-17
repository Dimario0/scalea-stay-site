import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Images, X } from 'lucide-react';
import { APARTMENT_PAGE_COPY, ApartmentPageLanguage, getApartmentPhotos } from '../content/apartmentPage';

const ApartmentGallery: React.FC<{ images: string[]; language: ApartmentPageLanguage }> = ({ images, language }) => {
  const copy = APARTMENT_PAGE_COPY[language];
  const photos = getApartmentPhotos(images, language);
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const currentPhoto = photos[current] || photos[0];
  const showcase = [...new Set([0, Math.min(2, photos.length - 1), Math.min(4, photos.length - 1)])];

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  function openPhoto(index: number, event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setCurrent(index);
    dialog.current?.showModal();
    setIsOpen(true);
  }

  function move(direction: number) {
    setCurrent(index => (index + direction + photos.length) % photos.length);
  }

  const photoLink = (index: number, className: string, eager = false) => {
    const photo = photos[index];
    return (
      <a key={`${index}-${photo.src}`} href={photo.src} target="_blank" rel="noopener noreferrer" aria-haspopup="dialog"
        aria-label={`${copy.openPhoto}: ${photo.caption}`} onClick={event => openPhoto(index, event)}
        className={`group relative block overflow-hidden rounded-2xl bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400 ${className}`}>
        <img src={photo.src} alt={photo.caption} loading={eager ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-3 pb-3 pt-8 text-xs font-bold text-white">{photo.caption}</span>
      </a>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {showcase.map((index, position) => photoLink(index, position === 0 ? 'col-span-2 h-64 sm:h-80' : 'h-40 sm:h-48', position === 0))}
      </div>
      <details id="apartment-photo-gallery" className="mt-4 rounded-2xl border border-white/20 bg-white/5 p-4 text-white">
        <summary className="cursor-pointer py-1 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400">
          <span className="inline-flex items-center gap-2"><Images className="h-5 w-5" aria-hidden="true" />{copy.allPhotos} ({photos.length})</span>
        </summary>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((_, index) => photoLink(index, 'h-32 sm:h-40'))}
        </div>
      </details>

      <dialog ref={dialog} aria-labelledby="apartment-gallery-title" aria-describedby="apartment-gallery-caption"
        onClose={() => setIsOpen(false)}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onKeyDown={event => {
          if (event.key === 'Tab') {
            const buttons = (event.currentTarget as HTMLDialogElement).querySelectorAll<HTMLButtonElement>('button');
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        className="fixed inset-0 m-auto max-h-[94dvh] w-[94vw] max-w-5xl overflow-auto rounded-3xl bg-slate-950 p-0 text-white shadow-2xl backdrop:bg-slate-950/85">
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="apartment-gallery-title" className="text-base sm:text-xl">{copy.galleryTitle}</h2>
            <button type="button" autoFocus aria-label={copy.close} onClick={() => dialog.current?.close()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><X className="h-5 w-5" /></button>
          </div>
          <img src={currentPhoto.src} alt={currentPhoto.caption} className="mx-auto max-h-[60dvh] w-full object-contain" decoding="async" />
          <p id="apartment-gallery-caption" className="mt-4 text-center text-sm text-slate-200">{currentPhoto.caption}</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <button type="button" aria-label={copy.previous} onClick={() => move(-1)} className="flex h-12 w-14 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><ArrowLeft className="h-5 w-5" /></button>
            <output aria-live="polite" className="text-sm font-bold">{current + 1} / {photos.length}</output>
            <button type="button" aria-label={copy.next} onClick={() => move(1)} className="flex h-12 w-14 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><ArrowRight className="h-5 w-5" /></button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApartmentGallery;
