import React from 'react';  
import Link from 'next/link';
import Image from 'next/image';

import AngleArrow from '@/src/svg/angle-arrow'; 
import LineArrowFive from '@/src/svg/line-arrow-5';

import feature_img_1 from "@assets/img/feature/img-1.png";
import feature_img_2 from "@assets/img/feature/img-2.png";
import feature_img_3 from "@assets/img/feature/img-3.png";

import shape_1 from "@assets/img/feature/shape-1.png"; 
import shape_2 from "@assets/img/feature/shape-2.png"; 
import shape_3 from "@assets/img/feature/img-shape.png"; 


const feature_content = {
    feature_data: [
        {
            id: 1,
            img: feature_img_1,
            title: "Our mission",
            description: <>Provide quality,cost effective training designed to increase an individual and organisational productivity and enrichment.</>,
        },
        {
            id: 2,
            img: feature_img_2,
            title: "Our Vision",
            description: <>To become one of the world's leading companies, bringing innovations by converting potential of an individual to performance</>,
        },
        {
            id: 3,
            img: feature_img_3,
            title: "Core Values",
            description: <>Integrity, Respect of an individual. Teamwork emphasizes collaboration and the importance of working together towards common goals.</>,
        },
    ],
    
}
const {feature_data} =  feature_content


const FeatureArea = ({about}) => {
    return (
        <> 
           <section className={`tp-feature-area ${about ? "feature-breadcrumb pb-50" : ""}`}>
            {about ? null : 
            <div className="tp-feature-shape">
               <Image src={shape_1} alt="theme-pure" />
            </div> 
            }
            <div className="container container-large">
               <div className="row align-items-center">
                  <div className="col-lg-12 text-center">
                     <div className="tp-feature-title-wrapper">
                       
                        <h3 className="tp-section-title">Our Vision , Mission <span className="title-color">&</span> Core Values
                           <span className="title-right-shape"> 
                              <LineArrowFive />
                           </span>
                        </h3>
                     </div>
                  </div>
                
               </div>
               <div className="row">
                {feature_data.map((item, i)  => 
                    <div key={i} className="col-lg-4 col-md-6">
                        <div className="tp-feature-item-box p-relative wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                        <div className="tp-feature-item p-relative mb-30">
                            <div className="tp-feature-item-shape">
                                <Image src={shape_2} alt="theme-pure" />
                            </div>
                            <div className="tp-feature-item-wrapper">
                                <div className="tp-feature-item-thumb">
                                    <div className="shape">
                                    <Image src={shape_3} alt="theme-pure" />
                                    </div>
                                    <Image src={item.img} className="thumb" alt="theme-pure" />
                                </div>
                                <div className="tp-feature-item-content">
                                    <h3 className="feature-title">
                                        <Link href="/about">{item.title}</Link>
                                    <span> 
                                        <AngleArrow />                                
                                    </span>
                                    </h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="tp-feature-item-btn">
                            <Link href="/about"><i className="fa-regular fa-arrow-right"></i></Link>
                        </div> */}
                    </div>
                </div> 
                )} 
               </div>
            </div>
         </section> 
        </>
    );
};

export default FeatureArea;