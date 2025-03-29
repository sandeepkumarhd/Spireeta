// import Notification from '@/src/common/Notification';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// // import { adminLogin, saveAdminInfo } from '@/src/actions/adminActions';
// import { useRouter } from 'next/router';
// import { adminLogin, saveAdminInfo } from '@/src/store/AllSlices/admin.slice';
// import routes from '@/src/utils/routes';
// import { changeLoadingState } from '@/src/store/customizer/CustomizerSlice';

// const ForgotPasswordForm = () => {
//     const [email, setEmail] = useState('');
//     const dispatch = useDispatch();
//     const router = useRouter();

//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
//         if (!email) {
//             Notification({ message: 'Please fill in your email address', type: 'error' });
//             console.log("Please fill in your email address");
//             return;
//         }

//         try {
//             dispatch(changeLoadingState(true))
//             const response = await routes.APIS.resetPassword({ email });
//             console.log("response", response);
//             if (response.status === 200) {
//                 Notification({ message: response.message, type: 'success' });
//                 router.push('/login');
//             } else {
//                 Notification({ message: response.message, type: 'error' });
//             }
//         } catch (error) {
//             console.error("An error occurred while requesting password reset:", error);
//             Notification({ message: 'An error occurred during password reset request.', type: 'error' });
//         }
//         finally {
//             dispatch(changeLoadingState(false))

//         }
//     };

//     return (
//         <div className="container-fluid logincontainer">
//             <div className="row login-bg">
//                 <div className="col-md-6">
//                     <div className="login-left">
//                         <Image src="/assets/img/logo/logo-spirita.jpeg" width={250} height={203} alt="Logo" />
//                     </div>
//                 </div>
//                 <div className="col-md-6">
//                     <div className="login-container">
//                         <h1 className="pt-10">Forgot Password</h1>
//                         <form onSubmit={handleForgotPassword} className="form-login">
//                             <div className="textfield">
//                                 <label className="loginlabel" htmlFor="email">Email Address</label>
//                                 <input
//                                     className="logininput"
//                                     type="email"
//                                     name="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     placeholder="Email Address"
//                                     required
//                                 />
//                             </div>

//                             <Link className="forgotpassword" href="/login">Back to login</Link>
//                             <button className="btnlogin" type="submit">Get reset link</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

import Notification from "@/src/common/Notification";
import { changeLoadingState } from "@/src/store/customizer/CustomizerSlice";
import routes from "@/src/utils/routes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log("Email being sent:", email); // Add this line

    if (!email) {
      Notification({
        message: "Please fill in your email address",
        type: "error",
      });
      return;
    }
    if (!validateEmail(email)) {
      Notification({
        message: "Please enter a valid email address",
        type: "error",
      });
      return;
    }
    try {
      dispatch(changeLoadingState(true));
      const response = await routes.APIS.resetPassword({
        email: "Ksandeep15267@gmail.com",
      }); // Use the local `email` state
      console.log("response", response);
      if (response.status === 200) {
        Notification({ message: response.message, type: "success" });
        router.replace("/login");
      } else {
        Notification({ message: response.message, type: "error" });
      }
    } catch (error) {
      console.error(
        "An error occurred while requesting password reset:",
        error
      );
      Notification({
        message: "An error occurred during password reset request.",
        type: "error",
      });
    } finally {
      dispatch(changeLoadingState(false));
    }
  };

  return (
    <div className="container-fluid logincontainer">
      <div className="row login-bg">
        <div className="col-md-6">
          <div className="login-left">
            <Image
              src="/assets/img/logo/logo-spirita.jpeg"
              width={250}
              height={203}
              alt="Logo"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="login-container">
            <h1 className="pt-10">Forgot Password</h1>
            <form onSubmit={handleForgotPassword} className="form-login">
              <div className="textfield">
                <label className="loginlabel" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="logininput"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  aria-label="Email Address"
                  required
                />
              </div>

              <Link className="forgotpassword" href="/login">
                Back to login
              </Link>
              <button className="btnlogin" type="submit">
                Get reset link
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
