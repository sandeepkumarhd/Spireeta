import React from 'react';
import Image from 'next/image';
import shape_4 from '@assets/img/about/vision-mission.png';
import video from '@assets/video/bg-video.mp4';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';

const setting = {
  slidesPerView: 1,
  spaceBetween: 30,
  modules: [Autoplay],
  loop: true,
  autoplay: {
    delay: 2000,
  },
  centeredSlides: true,
  breakpoints: {
    '991': {},
    '768': {
      slidesPerView: 1,
    },
    '767': {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    '576': {
      slidesPerView: 1,
    },
    '0': {
      slidesPerView: 1,
    },
  },
};

const testimonial_data = [
  {
    id: 1,
    name: 'Mission',
    description: (
      <>Provide quality, cost-effective training designed to increase individual and organizational productivity and enrichment.</>
    ),
  },
  {
    id: 2,
    name: 'Vision',
    description: (
      <>To become one of the world's leading companies, bringing innovations by converting the potential of an individual to performance.</>
    ),
  },
  {
    id: 3,
    name: 'Core Values',
    description: (
      <>
        Integrity, Respect of an individual. Teamwork emphasizes collaboration and the importance of working together towards common goals.
      </>
    ),
  },
];

const HeroArea = () => {
  return (
    <>
      {/* <section className="tp-hero-2-area p-relative">
        <div className="container-fluid">
          <div className="row gy-0">
            <div className="col-md-8 p-0">
              <video src={video} width="100%" height="" autoplay="autoplay" loop></video>
            </div>
            <div className="col-md-4 align-item-center p-0 bg-slider">
              <div className="row">
                <div className="col-md-12">
                  <section className="tp-testimonial-area p-relative">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12 text-center align-item-center pt-50">
                          <Image src={shape_4} width={200} className="vert-move" alt="Vision and Mission"/>
                        </div>
                        <div className="tp-testimonial-box-wrapper align-item-center">
                          <div className="testimonial-active swiper-container">
                            <Swiper {...setting}>
                              {testimonial_data.map((item, i) => (
                                <SwiperSlide key={i} className="tp-testimonial-item text-center mb-30">
                                  <div className="tp-testimonial-item-inner">
                                    <div className="tp-testimonial-title-wrapper text-center">
                                      <h3 className="tp-section-title">{item.name}</h3>
                                    </div>
                                    <p>{item.description}</p>
                                  </div>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="tp-hero-2-area p-relative">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-md-8 col-12 p-0">
              <video
                src={video}
                className="w-100 h-auto"
                autoPlay
                loop
              ></video>
            </div>
            <div className="col-md-4 col-12 d-flex align-items-center justify-content-center p-0 bg-slider">
              <div className="row g-0 w-100">
                <div className="col-lg-12 text-center align-items-center py-4">
                  <Image
                    src={shape_4}
                    width={200}
                    className="vert-move img-fluid"
                    alt="Vision and Mission"
                  />
                </div>
                <div className="tp-testimonial-box-wrapper align-items-center w-100">
                  <div className="testimonial-active swiper-container">
                    <Swiper {...setting}>
                      {testimonial_data.map((item, i) => (
                        <SwiperSlide
                          key={i}
                          className="tp-testimonial-item text-center mb-3"
                        >
                          <div className="tp-testimonial-item-inner p-3">
                            <div className="tp-testimonial-title-wrapper text-center">
                              <h3 className="tp-section-title">{item.name}</h3>
                            </div>
                            <p>{item.description}</p>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default HeroArea;
