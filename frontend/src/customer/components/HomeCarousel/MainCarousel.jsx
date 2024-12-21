import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import mainCarouselImages from "./mainCarouselImageData";

const MainCarousel = () => {
  const items = mainCarouselImages.map((item, index) => (
    <img
      src={item.image}
      alt={`Image ${index + 1}`}
      className="cursor-pointer"
      role="presentation"
    />
  ));
  return (
    <AliceCarousel
      items={items}
      autoPlay
      autoPlayInterval="3000"
      disableButtonsControls
      infinite
    />
  );
};

export default MainCarousel;
