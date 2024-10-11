'use client';
import React, { useState, useRef, useEffect } from 'react';
import SlideData from '@/components/ui/SlideData'; // Importa el server component

const SliderHome: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line no-undef
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Llama a SlideData para obtener los datos de los slides
  const slides = SlideData();

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const slideWidth = slider.scrollWidth / slides.length;
      slider.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, slides.length]);

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, []);

  return (
    <div
      className="w-full max-w-[1000px] mx-auto h-[70vh] xl:h-[50vh] "
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="relative overflow-hidden w-full h-full  ">
        <div
          id="slider-category"
          className="flex h-full w-full overflow-x-scroll overflow-y-hidden no-scrollbar snap-x snap-mandatory"
          ref={sliderRef}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={
                'w-full h-full flex flex-col-reverse sm:flex-row justify-end sm:justify-center items-start sm:border-b border-dark-bg dark:border-dark-greenLight snap-center'
              }
              style={{ minWidth: '100%' }}
            >
              <article className="text-wrap text-center sm:text-left w-full sm:max-w-[50%] mt-5 sm:ml-5">
                <h2 className="hidden sm:block text-xl sm:text-3xl font-bold mb-5">
                  {slide.title}
                </h2>
                <p className="sm:px-5">{slide.content}</p>
              </article>
              <div className=" sm:flex items-end sm:h-full w-full sm:w-[40%]  ">
                {slide.image}
              </div>
              {/* Show the title over the image only on mobile */}
              <h2 className="sm:hidden text-2xl font-bold mb-5 text-center mx-auto">
                {slide.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden sm:flex justify-center items-center gap-5 mt-2 h-5">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(index)}
            className={`bg-black size-3 lg:size-2 flex rounded-full ${currentIndex === index ? 'bg-light-red dark:bg-dark-greenLight scale-125' : 'bg-black'}`}
            aria-label={`Slide ${slide.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderHome;
