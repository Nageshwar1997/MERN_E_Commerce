import React, { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCarouselCard from "../homeSectionCarouselCard/HomeSectionCarouselCard";
import { Button } from "@headlessui/react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const HomeSectionCarousel = ({ data, sectionName }) => {
  const carouselRef = useRef(null); // Create a ref for AliceCarousel

  const responsive = {
    0: { items: 1, itemsFit: "contain" },
    640: { items: 3, itemsFit: "contain" },
    1024: { items: 5, itemsFit: "contain" },
    1280: { items: 5, itemsFit: "contain" },
  };

  const items = data
    .slice(0, 15)
    .map((item, index) => (
      <HomeSectionCarouselCard key={index} product={item} />
    ));

  const slidePrev = () => {
    carouselRef.current?.slidePrev();
  };

  const slideNext = () => {
    carouselRef.current?.slideNext();
  };

  return (
    <div className="relative px-4 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-800 py-5">{sectionName}</h1>
      <div className="w-full flex justify-center gap-2 overflow-x-auto scrollbar-none">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          className="w-full flex gap-2"
        />
      </div>
      <Button
        variant="contained"
        onClick={slidePrev}
        className="hidden lg:block z-50 absolute top-1/2 -translate-y-1/2 left-3 px-2 py-5 rounded bg-gray-200 hover:bg-gray-300"
      >
        <KeyboardArrowLeftIcon />
      </Button>
      <Button
        variant="contained"
        onClick={slideNext}
        className="hidden lg:block z-50 absolute top-1/2 -translate-y-1/2 right-3 px-2 py-5 rounded bg-gray-200 hover:bg-gray-300"
      >
        <KeyboardArrowRightIcon />
      </Button>
    </div>
  );
};

export default HomeSectionCarousel;
