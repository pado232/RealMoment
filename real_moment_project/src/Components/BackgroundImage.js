import React, { useEffect, useState } from "react";

const BackgroundImage = ({ imageUrl }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const numImagesPerRow = 10; // Number of images per row
    const numRows = 10; // Number of rows
    const imagePositions = [];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numImagesPerRow; col++) {
        imagePositions.push({
          top: row * 25, // Adjust top position for each row
          left: (col * 50 + row * 20) % 100, // Adjust left position and shift for each row
        });
      }
    }

    setImages(imagePositions);
  }, []);

  return (
    <div className="background-container">
      {images.map((pos, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`background-${index}`}
          className="background-image"
          style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
        />
      ))}
    </div>
  );
};

export default BackgroundImage;
