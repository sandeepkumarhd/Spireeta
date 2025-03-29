import React from "react";
import Breadcrumb from "@/src/common/breadcrumb/breadcrumb";
import FooterThree from "@/src/layout/footers/footer-3";
import HeaderTwo from "@/src/layout/headers/header-2";
import pathology from "@assets/img/about/home-3/patho.jpg";
import oil from "@assets/img/about/home-3/oil.jpg";
import auto from "@assets/img/about/home-3/auto.jpg";
import clerk from "@assets/img/about/home-3/clerk.jpg";
import Image from 'next/image';


const Sevice = () => {
    return (
        <>
            <HeaderTwo />
            <main>
                <Breadcrumb top_title="Our Products" page_title="Products" />
                <section className="tp-about-breadcrumb pt-50 pb-30 p-relative">
                    <div className="container">
                        <div className="row box-product">
                            <div className="col-lg-6">
                                <Image src={pathology} alt="theme-pure" className='img-responsive' />
                            </div>
                            <div className="col-lg-6">
                                <div className="tp-about-3-wrapper">
                                    <div className="tp-about-3-title-wrapper">
                                        <h3 className="tp-section-title">
                                            Pathosoft
                                        </h3>
                                        <hr />
                                    </div>
                                    <p>
                                        Pathosoft  is a complete online laboratory management system for pathology labs and diagnostic centres. It replaces traditional single desktop run offline pathology lab software by an online system which provides real-time access to information for doctors and patients.
                                    </p>
                                    <p>To provide a digital, reliable, efficient and secure solution, which enables laboratory owners to run their business with peace of mind while delivering quality healthcare.</p>
                                    <p>Modules in Labsmart cover all aspects of lab management like billing, accounting, lab and radiology report preparation and delivery etc.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="tp-about-breadcrumb pt-20 pb-30 p-relative">
                    <div className="container">
                        <div className="row box-product">
                            <div className="col-lg-6">
                                <Image src={clerk} alt="theme-pure" className='img-responsive' />
                            </div>
                            <div className="col-lg-6">
                                <div className="tp-about-3-wrapper">
                                    <div className="tp-about-3-title-wrapper">
                                        <h3 className="tp-section-title">
                                            Clerk Made Easy (CME)
                                        </h3>
                                        <hr />
                                    </div>
                                    <p>
                                        CME is web-based clerical  software integrates front office, middle office and back office solutions. It streamlines students information , Teachers payment bills reports  ,payroll and compliance so our teachers  can spend more time building relationships with candidates and help them in better learning .
                                    </p>
                                    <p>Our clerical staffing software also automates gathering and retaining information and documentation, and includes an intuitive search feature that allows you to quickly find the information you need.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="tp-about-breadcrumb pt-20 pb-30 p-relative">
                    <div className="container">
                        <div className="row box-product">
                            <div className="col-lg-6">
                                <Image src={oil} alt="theme-pure" className='img-responsive' />
                            </div>
                            <div className="col-lg-6">
                                <div className="tp-about-3-wrapper">
                                    <div className="tp-about-3-title-wrapper">
                                        <h3 className="tp-section-title">
                                            Oil Deal
                                        </h3>
                                        <hr />
                                    </div>
                                    <p>
                                        Oil Deal Software Digitally transform your oil and gas operation by giving your staff the ability to remotely monitor your site or facility anywhere in the world without jeopardizing the safety and security of your data. By partnering with Emerson, you have access to a global network of experts with deep industry expertise along with a diverse portfolio of flexible software tools that spans across the entire oil and gas value chain, from the reservoir to the terminal.
                                    </p>
                                    <p>We can help you drive better business results by applying real-time modelling, digital twins, machine learning, and/or AI to increase productivity and profitability while also improving reliability, safety, and regulatory compliance. </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="tp-about-breadcrumb pt-20 pb-50 p-relative">
                    <div className="container">
                        <div className="row box-product">
                            <div className="col-lg-6">
                                <Image src={auto} alt="theme-pure" className='img-responsive' />
                            </div>
                            <div className="col-lg-6">
                                <div className="tp-about-3-wrapper">
                                    <div className="tp-about-3-title-wrapper">
                                        <h3 className="tp-section-title">
                                            Auto Soft
                                        </h3>
                                        <hr />
                                    </div>
                                    <p>
                                        Autosoft simplifies the billing process by allowing you to generate professional invoices with just a few clicks. You can customize invoices, track payments, and manage outstanding dues effortlessly, saving time and reducing manual errors.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <FooterThree />
        </>
    );
};

export default Sevice;
