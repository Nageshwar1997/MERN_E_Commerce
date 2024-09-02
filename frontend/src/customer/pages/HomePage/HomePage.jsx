import React from "react";
import MainCarousel from "../../components/homeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/homeSectionCarousel/HomeSectionCarousel";
import { mens_kurtas } from "../../../data/mens/kurtas";
import { mens_shirts } from "../../../data/mens/shirts";
import { womens_sarees } from "../../../data/womens/sarees";
import { womens_dress } from "../../../data/womens/dress";
import { mens_shoes } from "../../../data/mens/shoes";
const HomePage = () => {
  return (
    <div className="w-full">
      <MainCarousel />
      <div className="w-full space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarousel data={mens_kurtas} sectionName={"Men's Kurtas"} />
        <HomeSectionCarousel data={mens_shoes} sectionName={"Men's Shoes"} />
        <HomeSectionCarousel data={mens_shirts} sectionName={"Men's Shirts"} />
        <HomeSectionCarousel
          data={womens_sarees}
          sectionName={"Women's Sarees"}
        />

        <HomeSectionCarousel
          data={womens_dress}
          sectionName={"Women's Dresses"}
        />
      </div>
    </div>
  );
};

export default HomePage;
