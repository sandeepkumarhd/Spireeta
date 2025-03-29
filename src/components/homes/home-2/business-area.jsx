import React from 'react';
import Image from 'next/image';
import business_img_3 from "@assets/img/business/about.jpg";
import business_user from "@assets/img/business/user.png";
import AngleArrow from '@/src/svg/angle-arrow';
import LineArrowTwo from '@/src/svg/line-arrow-2';
import Link from 'next/link';
import LineArrowSix from '@/src/svg/line-arrow-6';

const BusinessArea = () => {
   return (
      <>
         <section className="tp-business-area p-relative pt-60 pb-100">
            <div className="container">
               <div className="row align-">
                  <div className="col-lg-6">
                     <Image src={business_img_3} alt="theme-pure" className='img-responsive' />

                  </div>
                  <div className="col-lg-6">
                     <div className="tp-business-title-wrapper">
                        <span className="tp-section-title__pre">
                           Who <span className="title-pre-color"> We Are ?</span>
                           <AngleArrow />
                        </span>
                        <h3 className="tp-section-title">Spirita Technologies (I) Pvt Limited
                           <span className="title-left-shape">
                              <LineArrowTwo />
                           </span>
                        </h3>
                        <p>Spirita Technologies (I) Pvt Limited is established to help IT professional to convert their potential to Performance . Spirita believes that every human being has potential but it is unseen most of the time due lack of technical knowledge , lack of training required and lack of team spirit. Spirit believes on core values Team Work, Integrity, Respect Of An individual & Building trust with all stakeholders </p>
                     </div>
                     <div className="row">
                        <div className="tp-business-btn-area d-flex align-items-center">
                           <Link className="tp-btn" href="/about">Explore More</Link>
                           <Image className="d-none d-xl-block" src={business_user} alt="theme-pure" />
                           <i>
                              5K+ Customer
                              <span>
                                 <LineArrowSix />
                              </span>
                           </i>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default BusinessArea;