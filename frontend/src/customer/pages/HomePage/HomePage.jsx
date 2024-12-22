import React from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../data/Men/men_kurta";

const HomePage = () => {
  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 px-5 lg:px-10 py-20 flex flex-col justify-center">
        <HomeSectionCarousel sectionName={"Men's Kurta"} products={mens_kurta} />
        <HomeSectionCarousel sectionName={"Men's Shoes"} products={mens_kurta} />
        <HomeSectionCarousel sectionName={"Men's Shirts"} products={mens_kurta} />
        <HomeSectionCarousel sectionName={"Women's Saree"} products={mens_kurta} />
        <HomeSectionCarousel sectionName={"Women's Dress"} products={mens_kurta} />
      </div>
    </div>
  );
};

export default HomePage;
