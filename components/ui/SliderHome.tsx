"use client";
import React, { useState, useRef, useEffect } from "react";

interface Slide {
  id: number;
  content: string;
}

const SliderHome: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const slides: Slide[] = [
    { id: 1, content: "Contenido del primer slide" },
    { id: 2, content: "Contenido del segundo slide" },
    { id: 3, content: "Contenido del tercer slide" },
  ];

  const updateSlider = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.querySelector<HTMLDivElement>("div")?.clientWidth || 0;
      sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => {
      window.removeEventListener("resize", updateSlider);
    };
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden w-full max-w-3xl mx-auto">
      <div
        ref={sliderRef}
        className="flex transition-transform duration-300 ease-in-out"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full flex-shrink-0 bg-gray-100 p-6"
          >
            <h2 className="text-xl font-bold">Slide {slide.id}</h2>
            <p>{slide.content}</p>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
      >
        →
      </button>
    </div>
  );
};

export default SliderHome;
