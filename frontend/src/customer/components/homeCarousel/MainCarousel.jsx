import React from "react";
import mainCarouselData from "./mainCarouselData";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
const MainCarousel = () => {
  const items = mainCarouselData.map((item) => (
    <img
      src={item.image}
      alt="CarouselImage"
      className="cursor-pointer p-4"
      role="presentation"
    />
  ));
  return (
    <AliceCarousel
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={2000}
      infinite
    />
  );
};

export default MainCarousel;
