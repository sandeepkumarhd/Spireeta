// 'use client'
// import Notification from '@/src/common/Notification';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
// import routes from '@/src/utils/routes';
// import { changeLoadingState } from '@/src/store/customizer/CustomizerSlice';
// import { useDispatch } from 'react-redux';

// const ResetPasswordForm = () => {
//     const router = useRouter();
//     const [showPassword, setShowPassword] = useState(false);
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [userId, setUserId] = useState(null);
//     const [token, setToken] = useState(null);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (router.isReady) {
//             const { userId, token } = router.query;
//             setUserId(userId);
//             setToken(token);
//         }
//     }, [router.isReady]);

//     console.log("params", { userId, token });

//     const validatePassword = () => {
//         if (password.length < 8) {
//             Notification({ message: "Password must be at least 8 characters long", type: 'error' });
//             return false;
//         }
//         if (password !== confirmPassword) {
//             Notification({ message: "Passwords do not match", type: 'error' });
//             return false;
//         }
//         return true;
//     };

//     const handleResetPassword = async (e) => {
//         e.preventDefault();

//         if (!validatePassword()) return;
//         try {
//             dispatch(changeLoadingState(true))

//             const res = await routes.APIS.resetPasswordUsingLink({
//                 password,
//                 userId,
//                 token,
//             });

//             if (res.status === 200) {
//                 Notification({ message: res.message, type: 'success' });
//                 router.push("/login");
//             } else {
//                 Notification({ message: res.error, type: 'error' });
//             }

//         } catch (error) {
//             console.log("Error:", error);
//             Notification({ message: "Link is expired or invalid", type: 'error' });
//         }finally{
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
//                         <h1 className="pt-10">Reset Password</h1>
//                         <form onSubmit={handleResetPassword} className="form-login">
//                             <div className="textfield">
//                                 <label className="loginlabel" htmlFor="password">New Password</label>
//                                 <input
//                                     className="logininput"
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     placeholder="New Password"
//                                     required
//                                 />
//                                 {/* <button type="button" onClick={() => setShowPassword(!showPassword)}>
//                                     {showPassword ? "Hide" : "Show"} Password
//                                 </button> */}
//                             </div>
//                             <div className="textfield">
//                                 <label className="loginlabel" htmlFor="confirmPassword">Confirm Password</label>
//                                 <input
//                                     className="logininput"
//                                     type={showPassword ? "text" : "password"}
//                                     name="confirmPassword"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                     placeholder="Confirm Password"
//                                     required
//                                 />
//                                 <button type="button" onClick={() => setShowPassword(!showPassword)}>
//                                     {showPassword ? "Hide" : "Show"} Password
//                                 </button>
//                             </div>
//                             <Link className="forgotpassword" href="/login">Back to login</Link>
//                             <button className="btnlogin" type="submit">Reset Password</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ResetPasswordForm;
'use client';
import Notification from '@/src/common/Notification';
import { changeLoadingState } from '@/src/store/customizer/CustomizerSlice';
import routes from '@/src/utils/routes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const ResetPasswordForm = ({ userId, token }) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    console.log("🟢 Received User ID & Token:", { userId, token });

    // Validation for password
    const validatePassword = () => {
        if (!password || !confirmPassword) {
            Notification({ message: "Please fill in both fields", type: 'error' });
            return false;
        }
        if (password.length < 8) {
            Notification({ message: "Password must be at least 8 characters long", type: 'error' });
            return false;
        }
        if (password !== confirmPassword) {
            Notification({ message: "Passwords do not match", type: 'error' });
            return false;
        }
        return true;
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!userId || !token) {
            Notification({ message: "Invalid or expired reset link", type: 'error' });
            return;
        }

        if (!validatePassword()) return;

        try {
            dispatch(changeLoadingState(true));

            const res = await routes.APIS.resetPasswordUsingLink({
                password,
                userId,
                token,
            });

            if (res.status === 200) {
                Notification({ message: "Password reset successful!", type: 'success' });
                router.push("/login");
            } else {
                Notification({ message: res.error || "Something went wrong!", type: 'error' });
            }
        } catch (error) {
            console.error("Error:", error);
            Notification({ message: "Link is expired or invalid", type: 'error' });
        } finally {
            dispatch(changeLoadingState(false));
        }
    };

    return (
        <div className="container-fluid logincontainer">
            <div className="row login-bg">
                <div className="col-md-6">
                    <div className="login-left">
                        <Image src="/assets/img/logo/logo-spirita.jpeg" width={250} height={203} alt="Logo" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="login-container">
                        <h1 className="pt-10">Reset Password</h1>
                        <form onSubmit={handleResetPassword} className="form-login">
                            <div className="textfield">
                                <label className="loginlabel" htmlFor="password">New Password</label>
                                <input
                                    className="logininput"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="New Password"
                                    required
                                />
                            </div>
                            <div className="textfield">
                                <label className="loginlabel" htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    className="logininput"
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "Hide" : "Show"} Password
                                </button>
                            </div>
                            <Link className="forgotpassword" href="/login">Back to login</Link>
                            <button className="btnlogin" type="submit">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
