import React, { useState, useEffect } from "react";

const Slideshow = ({ images, interval = 1000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [images.length, interval]);

  return (
    <div
      className="slideshow"
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      <img
        style={{ width: 200 }}
        src={images[index].imgUrl}
        alt={`Slide ${index}`}
      />
    </div>
  );
};

export default Slideshow;
