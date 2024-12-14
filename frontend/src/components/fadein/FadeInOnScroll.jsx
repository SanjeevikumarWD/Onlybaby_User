import React, { useState, useEffect, useRef } from 'react';

const FadeInOnScroll = ({ children, className = "", threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: threshold, // Customize when to trigger the fade-in
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[2000ms]`}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
