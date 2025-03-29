import React from 'react';
// import HeaderOne from '@/src/layout/headers/header';
import Breadcrumb from '@/src/common/breadcrumb/breadcrumb';
import AboutArea from './../homes/home-3/about-area';
import CounterArea from '../homes/home-2/counter-area';
import FeatureArea from '../homes/home/feature-area';
import SupportArea from './support-area';
import VideoArea from '../../common/video-area';
import TestimonialFeature from './feature-testimonial';
import TestimonialArea from '@/src/common/testimonial-area';
import BrandArea from '@/src/common/brand-area';
import TeamArea from '@/src/common/team-area';
import BlogArea from '@/src/common/blog-area';
import FooterContact from '@/src/layout/footers/footer-contact';
import FooterThree from '@/src/layout/footers/footer-3';
import HeaderTwo from '@/src/layout/headers/header-2';

const About = () => {
    return (
        <>
          <HeaderTwo />  
          <main>
            <Breadcrumb top_title="Who We Are"  page_title="About Us" />
            <AboutArea about={true} /> 
            <CounterArea about={true} />
            <FeatureArea about={true} />
        
          </main>
          <FooterThree />
        </>
    );
};

export default About;