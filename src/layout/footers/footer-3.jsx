import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import footer_logo from "@assets/img/logo/footer-logo.png";
import SocialLinks, { CopyRight } from '@/src/common/social-links';
import EmailAeroplan from '@/src/svg/email-aeroplan';
import routes from '@/src/utils/routes';
import Notification from '@/src/common/Notification';
import { useDispatch } from 'react-redux';
import { changeLoadingState } from '@/src/store/customizer/CustomizerSlice';

const footer_contact = {
    bg_img: "assets/img/footer/footer-bg.jpg",
    footer_info: <>The world’s first and largest digital marketplace <br />for crypto collectibles and non-fungible tokens (NFTs). Buy</>,
    map_link: "https://www.google.com/maps/search/86+Road+Broklyn+Street,+600+New+York,+USA/@40.6897806,-74.0278086,12z/data=!3m1!4b1",
    address: <>16 Friends Colony, VMV Road, Amravati, Maharashtra 444604</>,
    mail: "info@spireeta.com",
    phone: "+91-721-2990299",
    service_links: [
        { title: "Pathosoft ", link: "#" },
        { title: "Clerk Made Easy (CME)", link: "#" },
        { title: "Oil Deal ", link: "#" },
        { title: "Auto Soft ", link: "#" },

    ]
}
const { bg_img, footer_info, map_link, address, mail, phone, service_links } = footer_contact

const FooterThree = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("handleSubmit", formData);

        try {
            dispatch(changeLoadingState(true))

            const res = await routes.APIS.createGeneralController(formData);
            if (res.status === 200) {
                Notification({ message: res.message, type: 'success' });
                setFormData({ name: '', email: '', phone: '' });
                document.querySelector('.btn-close').click();  // Close modal
            } else {
                Notification({ message: res.message, type: 'error' });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(changeLoadingState(false))
        }
    };

    return (
        <>
            <footer className="tp-footer-3-area p-relative">
                <div className="tp-footer-bg" style={{ backgroundImage: `url(${bg_img})` }}></div>
                <div className="container">
                    <div className="tp-footer-3-main-area">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="tp-footer-widget tp-footer-3-col-1">
                                    <div className="tp-footer-logo">
                                        <h4 className='text-white'>Spirita Technology</h4>
                                    </div>
                                    <div className="tp-footer-widget-content">
                                        <div className="tp-footer-info">
                                            {/* <p className="p">{footer_info}</p> */}
                                            <div className="tp-footer-main-location">
                                                <Link target="_blank" href={map_link}>
                                                    <i className="fa-sharp fa-light fa-location-dot"></i>
                                                    {address}
                                                </Link>
                                            </div>
                                            <div className="tp-footer-main-mail">
                                                <a href={`mailto:${mail}`}><i className="fa-light fa-message-dots"></i>
                                                    {mail} <br /> {phone}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="tp-footer-widget tp-footer-3-col-2">
                                    <h3 className="tp-footer-widget-title">Our Product</h3>
                                    <div className="tp-footer-widget-content">
                                        <ul>
                                            {service_links.map((item, i) => <li key={i}><Link href={item.link}>{item.title}</Link></li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="tp-footer-widget tp-footer-3-col-3">
                                    <h3 className="tp-footer-widget-title">Newsletter</h3>
                                    <div className="tp-footer-from">
                                        <div className="tp-footer-text-email p-relative">
                                            <input type="text" placeholder="Enter Email Address" />
                                            <span>
                                                <EmailAeroplan />
                                            </span>
                                        </div>
                                        <div className="tp-footer-form-check">
                                            <input className="form-check-input" id="flexCheckChecked" type="checkbox" />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                I agree to all your terms and policies
                                            </label>
                                        </div>
                                        <div className="tp-footer-widget-social">
                                            <SocialLinks />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tp-footer-copyright-area p-relative">
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                <div className="tp-footer-copyright-inner">
                                    <p> <CopyRight /></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 pl-25" id="exampleModalLabel">Get in touch with us for more info</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit} className="form-login text-center">
                                    <div className="textfield">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="textfield">
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            placeholder="Email ID"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="textfield">
                                        <input
                                            className="form-control"
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone No"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button className="btnlogin" type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterThree;