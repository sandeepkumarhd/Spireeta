import Image from 'next/image';
import Link from "next/link";
import React,{useState} from 'react';
import AngleArrow from '@/src/svg/angle-arrow';
import VideoPopup from '@/src/modals/video-popup';
// about img import here
import about_img_1 from "@assets/img/about/home-3/shape-4.png";
import about_img_2 from "@assets/img/about/home-3/img-1.jpg";
import about_img_02 from "@assets/img/about/home-3/about-img.jpg";
import about_img_3 from "@assets/img/about/home-3/img-2.jpg";
import about_img_4 from "@assets/img/about/home-3/img-3.jpg";
import about_main from "@assets/img/about/home-3/img-1.jpg"
// about shape import here
import about_shape_1 from "@assets/img/about/home-3/shape-1.png";
import about_shape_2 from "@assets/img/about/home-3/shape-2.png";
import about_shape_3 from "@assets/img/about/home-3/shape-3.png"; 
// import progressbar   
import { CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import about_img from "@assets/img/about/about-1.png";
import about_img_10 from "@assets/img/business/shape-5.png";
import styles from "./styles.module.css"


const AboutArea = ({about}) => {
    const percentage = 50;
    const percentage2 = 75;
  const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
            <section className={`${about ? "tp-about-breadcrumb pt-60 pb-100" : "tp-about-3-area pt-185 pb-170"} p-relative`}>
                {about ? 
                <div className="tp-about-3-shape d-none d-lg-block">
                    <Image src={about_img_10} alt="theme-pure" className='img-responsive' />
                </div>
                :
                <div className="shape-bg">
                    <Image src={about_img_2} alt="theme-pure" className='img-responsive' />
                </div> 
               }                
                <div className="container">
                <div className="row">
                    {about ?  
                    <div className="col-lg-6">
                       
                            <Image src={about_img_02} alt="theme-pure" className='img-responsive'/>
                      
                    </div>  
                    :  
                    <div className="col-lg-6">
                        <div className="tp-about-3-img p-relative fadeLeft">
                            <Image src={about_img_2} alt="theme-pure" />
                            <Image className="shape-1" src={about_img_3} alt="theme-pure" />
                            <div className="shape-2 p-relative">
                            <Image src={about_img_4} alt="theme-pure" />
                            <div className="tp-video-play">
                                <a className="popup-video" 
                                onClick={() => setIsVideoOpen(true)}>
                                    <i className="fa-sharp fa-solid fa-play"></i>
                                </a>
                            </div>
                            </div>
                            <Image className="shape-3" src={about_shape_1} alt="theme-pure" />
                            <Image className="shape-4" src={about_shape_2} alt="theme-pure" />
                            <Image className="shape-5" src={about_shape_3} alt="theme-pure" />
                        </div>
                    </div>
                    }

                    <div className="col-lg-6">
                        <div className="tp-about-3-wrapper">
                            <div className="tp-about-3-title-wrapper"> 
                                <span className={`tp-section-title__pre ${styles.newsub}`}>
                                    About <span className="title-pre-color">Us</span>
                                    <AngleArrow /> 
                                </span>
                                <h3 className="tp-section-title">
                                Spirita <span className="title-color">Technologies</span> (I) <br />  Pvt Limited 
                                </h3> 
                            </div>
                            <p>
                            Spirita Technologies (I) Pvt Limited is established to help IT professional to convert their potential to Performance . Spirita believes that every human being has potential but it is unseen most of the time due lack of technical knowledge , lack of training required and lack of team spirit. Spirit believes on core values Team Work, Integrity, Respect Of An individual & Building trust with all stakeholders 
                            </p>
                            <p>Spirita has its mission to provide cost effective training designed to increase and individual and organizational productivity and enrichment</p>
                           
                        </div>
                    </div>
                </div>
                </div>
            </section>

         {/* video modal start */}
        <VideoPopup 
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"csnD5EVL5z8"}
        />
      {/* video modal end */}
        </>
    );
};

export default AboutArea;