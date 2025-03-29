import Notification from '@/src/common/Notification';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { adminLogin, saveAdminInfo } from '@/src/actions/adminActions';
import { useRouter } from 'next/router';
import { adminLogin, saveAdminInfo } from '@/src/store/AllSlices/admin.slice';
import Localstorage from '@/src/utils/storage/Localstorage';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const login = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            Notification({ message: 'Please fill all the fields', type: 'error' });
            console.log("Please fill all the fields");
            return;
        }

        try {
            const response = await dispatch(adminLogin({ email, password }));
            console.log("response", response);
            if (response.status === 200) {
                // Notification({ message: response.message, type: 'success' });
                // await Localstorage.JWT_TOKEN.set(response.token);
                // dispatch(saveAdminInfo(response.data));
                router.push('/dashboard/registrations-enquiry');
            } else {
                Notification({ message: response.message, type: 'error' });
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            Notification({ message: 'An error occurred during login.', type: 'error' });
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
                        <h1 className="pt-10">Login</h1>
                        <hr className='linehr'/>
                        <form onSubmit={login} className="form-login">
                            <div className="textfield">
                                <i className='fa fa-user login-icon'></i> <label className="loginlabel" htmlFor="email">Username/ Email ID</label>
                                <input
                                    className="logininput"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Username/ Email ID"
                                    required
                                />
                            </div>
                            <div className="textfield">
                            <i className='fa fa-lock login-icon'></i> <label className="loginlabel" htmlFor="password">Password</label>
                                <input
                                    className="logininput"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                                <button type="button" className='showpass' onClick={() => setShowPassword(!showPassword)}>
                                <i className='fa fa-eye login-icon'></i>  {showPassword ? "Hide" : "Show"} Password
                                </button>
                            </div>                          
                            <button className="btnlogin" type="submit">Login</button>
                            <Link className="forgot-password" href="forgot-password"> <i className='fa fa-unlock login-icon'></i> Forgot Password?</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
