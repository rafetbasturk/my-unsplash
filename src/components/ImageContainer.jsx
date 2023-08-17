import { forwardRef, useState } from "react";

const ImageContainer = forwardRef(function ImageContainer({ image }, ref) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className="image-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      ref={ref}
    >
      <img src={image.urls.regular} alt={image.alt_description} />
      {isVisible && <button className="delete">Delete</button>}
      {isVisible && image.alt_description && (
        <div className="desc">{image.alt_description}</div>
      )}
    </div>
  );
});
export default ImageContainer;
