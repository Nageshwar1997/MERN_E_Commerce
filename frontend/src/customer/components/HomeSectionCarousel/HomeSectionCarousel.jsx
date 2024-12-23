import React, { useRef } from "react";
import { Button } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const HomeSectionCarousel = ({ products, sectionName }) => {
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
    1440: { items: 6 },
    1920: { items: 7 },
  };

  const slidePrev = () => {
    carouselRef.current?.slidePrev();
  };

  const slideNext = () => {
    carouselRef.current?.slideNext();
  };

  const items = products
    ?.slice(0, 10)
    ?.map((item, i) => <HomeSectionCard key={i} product={item} />);
  return (
    <div className="relative px-4 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 py-5">{sectionName}</h2>
      <div className="">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          responsive={responsive}
          disableDotsControls
          disableButtonsControls
        />
      </div>
      {/* Previous Button */}

      <Button
        className="z-50"
        variant="contained"
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          rotate: "270deg",
          color: "white",
          bgcolor: "gray",
        }}
        aria-label="previous"
        onClick={slidePrev}
      >
        <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)" }} />
      </Button>

      {/* Next Button */}

      <Button
        className="z-50"
        variant="contained"
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          rotate: "90deg",
          color: "white",
          bgcolor: "gray",
        }}
        aria-label="next"
        onClick={slideNext}
      >
        <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)" }} />
      </Button>
    </div>
  );
};

export default HomeSectionCarousel;
