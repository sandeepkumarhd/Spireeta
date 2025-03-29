import React, { useState } from "react";
// import Notification from "../common/Notification";
import { changeLoadingState } from "../store/customizer/CustomizerSlice";
import { useDispatch } from "react-redux";
import Notification from "../common/Notification";
import routes from "../utils/routes";

const ContactForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
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
        setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
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
      <form onSubmit={handleSubmit} id="contact-form">
        <div className="row tp-gx-10">
          <div className="col-md-6">
            <div className="tp-contact-input">
              <input
                name="name"
                type="text"
                placeholder="Your Name*"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="tp-contact-input">
              <input
                name="email"
                type="email"
                placeholder="Email Address*"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="tp-contact-input">
              <input
                name="serviceType"
                type="text"
                placeholder="Service Type"
                required
                value={formData.serviceType}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="tp-contact-input">
              <input
                placeholder="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="tp-contact-input">
              <textarea
                name="message"
                placeholder="Enter Your Message here"
                type="text"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="tp-contact-btn mt-10">
            <button type="submit" className="tp-btn">
              Send Message
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
