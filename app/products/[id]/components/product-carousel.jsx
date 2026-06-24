'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCarousel({ images }) {
  if (!images || images.length === 0) return null;
  const [sImage, setSImage] = useState(0);

  return (
    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-10">
      <div className="flex flex-row md:flex-col space-x-5 md:space-x-0 md:space-y-5 overflow-x-auto md:overflow-visible">
        {images.map((image, index) => (
          <div 
            key={`${image}-${index}`} 
            className={`relative w-20 h-20 bg-slate-200 rounded-xl cursor-pointer overflow-hidden flex-shrink-0 border-2 ${
              index === sImage ? 'border-black' : 'border-transparent'
            }`}
            onClick={() => setSImage(index)}
          >
            <Image 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="border-2 border-black rounded-xl w-fit">
        <Image
          src={images[sImage]}
          width={400}
          height={400}
          alt={`productImage${sImage}`}
        />
      </div>
    </div>
  );
}