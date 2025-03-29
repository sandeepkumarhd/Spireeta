import HeaderTwo from "@/src/layout/headers/header-2";
import React from "react";
import HeroArea from "./hero-area";
import OfferArea from "./offer-area";
import BusinessArea from "./business-area";
import CounterArea from "./counter-area";
import IndustryArea from "../../../common/industry-area";
import FeatureArea from "./feature-area";
import BrandArea from "./brand-area";
import BlogArea from "./blog-area";
import TestimonialArea from "./testimonial-area";
import CtaArea from "./cta-area";
import FooterTwo from "@/src/layout/footers/footer-2";
import FooterThree from "@/src/layout/footers/footer-3";


const HomeTwo = () => {
  return (
    <>
      <HeaderTwo />

      <main>
        <HeroArea />
        <BusinessArea />
        <CounterArea />
      </main>
      <FooterThree />
    </>
  );
};

export default HomeTwo;
