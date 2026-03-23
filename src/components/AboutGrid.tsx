
import React from 'react';

interface Props {
  images: string[];
}

const AboutGrid: React.FC<Props> = ({ images = [] }) => {
  if (!images || images.length === 0) return null;
  
  return (
    <div className="grid grid-cols-2 gap-4 relative">
      {images.map((img, idx) => (
        <div key={idx} className={`rounded-[30px] overflow-hidden shadow-2xl relative ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
          <img 
            src={img || "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80"} 
            alt={`Scalea, Italy - Riviera dei Cedri - Photo ${idx + 1}`} 
            className="w-full aspect-square object-cover hover:scale-110 transition-transform duration-700" 
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}
      
      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-600/20 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default AboutGrid;
