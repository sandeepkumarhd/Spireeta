// import React, { useEffect, useRef, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import SuperNavMenu from './superNavMenu';
// import useSticky from '@/src/hooks/use-sticky';
// import logo_img from "@assets/img/logo/logo-spirita.jpeg";
// import { notification } from 'antd';
// import { useRouter } from 'next/navigation';
// import Localstorage from '@/src/utils/storage/Localstorage';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAdminInfo } from '@/src/store/AllSlices/admin.slice';
// import routes from '@/src/utils/routes';
// import Notification from '@/src/common/Notification';
// import { changeLoadingState } from '@/src/store/customizer/CustomizerSlice';
// import AdminSidebar from './adminSidebar';

// const superAdminHeader = () => {
//    const { sticky } = useSticky()
//    const [searchOpen, setSearchOpen] = useState(false)
//    const [sidebarOpen, setSidebarOpen] = useState(false)
//    const [dropdownOpen, setDropdownOpen] = useState(false);
//    const router = useRouter();
//    const dispatch = useDispatch();
//    const dropdownRef = useRef(null);

//    const adminSelector = useSelector((state) => state.adminReducer.adminInfo);
//    console.log("superAdminHeaderadminSelector", adminSelector)

//    useEffect(() => {
//       dispatch(fetchAdminInfo());
//    }, [adminSelector?.email])

//    const handleLogut = async () => {
//       try {
//          dispatch(changeLoadingState(true));

//          Localstorage.clear();
//          // notification.success({
//          //    message: "Logout Successful",
//          //    placement: "top"
//          // })
//          Notification({ message: "Logout Successful", type: 'success' });

//          // navigate('/login', { replace: true });
//          router.replace('/login');

//       } catch (error) {
//          console.log(error)
//          // notification.error({
//          //    message: "Something went wrong",
//          //    placement: "top"
//          // })
//          Notification({ message: "Something went wrong", type: 'error' });

//       } finally {
//          dispatch(changeLoadingState(false));

//       }
//    }

//    const handleForgotPassword = async (e) => {
//       e.preventDefault();
//       try {
//          dispatch(changeLoadingState(true));
//          const response = await routes.APIS.resetPassword({ email: adminSelector.email });
//          console.log("response", response);
//          if (response.status === 200) {
//             Notification({ message: response.message, type: 'success' });
//             router.push('/login');
//          } else {
//             Notification({ message: response.message, type: 'error' });
//          }
//       } catch (error) {
//          console.error("An error occurred while requesting password reset:", error);
//          Notification({ message: 'An error occurred during password reset request.', type: 'error' });
//       } finally {
//          dispatch(changeLoadingState(false));

//       }
//    };

//    const toggleDropdown = () => {
//       setDropdownOpen(!dropdownOpen)
//    }
//    const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//          setDropdownOpen(false);
//       }
//    };

//    useEffect(() => {
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => {
//          document.removeEventListener('mousedown', handleClickOutside);
//       };
//    }, []);

//    return (
//       <>
//          <header className="tp-header-2-area tp-header-height p-relative">
//             <div id="header-sticky" className={`tp-header-2-bottom header__sticky p-relative ${sticky && "tp-header-sticky"}`}>
//                <div className="tp-header-2-bottom-inner tp-header-2-bottom-inner-one p-relative" style={{ backgroundImage: `url(/assets/img/hero/hero-2/header-bg.png)` }}>
//                   <div className="container gx-0">
//                      <div className="row gx-0 align-items-center">
//                         {/* <div className="col-xxl-2 col-xl-2 col-lg-10 col-md-6"> */}
//                         <div className="col-6 col-md-2">
//                            <div className="tp-header-2-main-left d-flex align-items-center justify-content-xl-center justify-content-xxl-end p-relative">
//                               <div className="tp-header-2-logo">
//                                  <Link href="/">
//                                     <Image src={logo_img} alt="theme-pure" className='logo-image img-fluid' />
//                                  </Link>
//                                  {/* <Image src={logo_shape} className="logo-shape" alt="theme-pure" /> */}
//                               </div>
//                            </div>
//                         </div>
//                         <div className="col-md-8 d-none d-md-block">
//                            <div className="tp-main-menu-2-area d-flex align-items-center">
//                               <div className="tp-main-menu tp-main-menu-one">
//                                  <nav id="tp-mobile-menu">
//                                     <SuperNavMenu />
//                                  </nav>
//                               </div>
//                            </div>
//                         </div>
//                         <div className="col-6 col-md-2">
//                            <div className="tp-header-2-right d-none d-md-block">
//                               <div className="tp-header-2-main-right d-flex align-items-center justify-content-xxl-end">
//                                  <div className="tp-header-2-phone d-flex align-items-center admin-btn" onClick={toggleDropdown}>
//                                     <div className="tp-header-2-phone-icon">
//                                        <i className="fa-solid fa-user"></i>
//                                     </div>
//                                     <div className="tp-header-2-phone-content">
//                                        <Link href="">Admin</Link>
//                                     </div>

//                                  </div>
//                                  {dropdownOpen && (
//                                     <div ref={dropdownRef} className='user-dropdown'>
//                                        <Link onClick={handleLogut} className='link' href=""><i className="fa-solid fa-sign-out-alt"></i> Sign out</Link>
//                                        <Link onClick={handleForgotPassword} className='link' href=""><i className="fa-solid fa-lock"></i> Forget Password</Link>
//                                     </div>
//                                  )}
//                               </div>
//                            </div>
//                            <div className="tp-header-2-mobile-menu d-flex justify-content-end d-block d-md-none">
//                               <div className="tp-header-2-hamburger-btn offcanvas-open-btn"
//                                  onClick={() => setSidebarOpen(true)}
//                                  style={{ backgroundImage: `url(/assets/img/icon/header-hamburger-shape.png)` }}>
//                                  <button className="hamburger-btn">
//                                     <span>
//                                        <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                           <path d="M0 1.13163C0 0.506972 0.499692 0 1.11538 0H20.4487C21.0644 0 21.5641 0.506972 21.5641 1.13163C21.5641 1.7563 21.0644 2.26327 20.4487 2.26327H1.11538C0.499692 2.26327 0 1.7563 0 1.13163ZM27.8846 10.5619H1.11538C0.499692 10.5619 0 11.0689 0 11.6935C0 12.3182 0.499692 12.8252 1.11538 12.8252H27.8846C28.5003 12.8252 29 12.3182 29 11.6935C29 11.0689 28.5003 10.5619 27.8846 10.5619ZM14.5 21.1238H1.11538C0.499692 21.1238 0 21.6308 0 22.2555C0 22.8801 0.499692 23.3871 1.11538 23.3871H14.5C15.1157 23.3871 15.6154 22.8801 15.6154 22.2555C15.6154 21.6308 15.1157 21.1238 14.5 21.1238Z" fill="currentColor"></path>
//                                        </svg>
//                                     </span>
//                                  </button>
//                               </div>
//                            </div>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </header>
//          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> {/* Sidebar Component */}


//       </>
//    );
// };

// export default superAdminHeader;

import Notification from '@/src/common/Notification';
import useSticky from '@/src/hooks/use-sticky';
import { fetchAdminInfo } from '@/src/store/AllSlices/admin.slice';
import { changeLoadingState } from '@/src/store/customizer/CustomizerSlice';
import routes from '@/src/utils/routes';
import Localstorage from '@/src/utils/storage/Localstorage';
import logo_img from "@assets/img/logo/logo-spirita.jpeg";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from './adminSidebar';
import SuperNavMenu from './superNavMenu';

const SuperAdminHeader = () => {
   const { sticky } = useSticky();
   const [searchOpen, setSearchOpen] = useState(false);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const router = useRouter();
   const dispatch = useDispatch();
   const dropdownRef = useRef(null);

   const adminSelector = useSelector((state) => state.adminReducer.adminInfo);
   console.log("superAdminHeaderadminSelector", adminSelector);

   useEffect(() => {
      dispatch(fetchAdminInfo());
   }, []); // Fetch admin info only once on component mount

   const handleLogut = async () => {
      try {
         dispatch(changeLoadingState(true));
         Localstorage.clear();
         Notification({ message: "Logout Successful", type: 'success' });
         router.push('/login');
      } catch (error) {
         console.log(error);
         Notification({ message: "Something went wrong", type: 'error' });
      } finally {
         dispatch(changeLoadingState(false));
      }
   };

   const handleForgotPassword = async (e) => {
      e.preventDefault();
      if (!adminSelector?.email) {
         Notification({ message: "Email not found", type: 'error' });
         return;
      }
      try {
         dispatch(changeLoadingState(true));
         const response = await routes.APIS.resetPassword({ email: adminSelector.email });
         console.log("response", response);
         if (response.status === 200) {
            Notification({ message: response.message, type: 'success' });
            router.push('/login');
         } else {
            Notification({ message: response.message, type: 'error' });
         }
      } catch (error) {
         console.error("An error occurred while requesting password reset:", error);
         Notification({ message: 'An error occurred during password reset request.', type: 'error' });
      } finally {
         dispatch(changeLoadingState(false));
      }
   };

   const toggleDropdown = () => {
      setDropdownOpen((prev) => !prev);
   };

   const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setDropdownOpen(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <>
         <header className="tp-header-2-area tp-header-height p-relative">
            <div id="header-sticky" className={`tp-header-2-bottom header__sticky p-relative ${sticky && "tp-header-sticky"}`}>
               <div className="tp-header-2-bottom-inner tp-header-2-bottom-inner-one p-relative" style={{ backgroundImage: `url(/assets/img/hero/hero-2/header-bg.png)` }}>
                  <div className="container gx-0">
                     <div className="row gx-0 align-items-center">
                        <div className="col-6 col-md-2">
                           <div className="tp-header-2-main-left d-flex align-items-center justify-content-xl-center justify-content-xxl-end p-relative">
                              <div className="tp-header-2-logo">
                                 <Link href="/">
                                    <Image src={logo_img} alt="theme-pure" className='logo-image img-fluid' width={100} height={50} />
                                 </Link>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-8 d-none d-md-block">
                           <div className="tp-main-menu-2-area d-flex align-items-center">
                              <div className="tp-main-menu tp-main-menu-one">
                                 <nav id="tp-mobile-menu">
                                    <SuperNavMenu />
                                 </nav>
                              </div>
                           </div>
                        </div>
                        <div className="col-6 col-md-2">
                           <div className="tp-header-2-right d-none d-md-block">
                              <div className="tp-header-2-main-right d-flex align-items-center justify-content-xxl-end">
                                 <div className="tp-header-2-phone d-flex align-items-center admin-btn" onClick={toggleDropdown}>
                                    <div className="tp-header-2-phone-icon">
                                       <i className="fa-solid fa-user"></i>
                                    </div>
                                    <div className="tp-header-2-phone-content">
                                       <Link href="">Admin</Link>
                                    </div>
                                 </div>
                                 {dropdownOpen && (
                                    <div ref={dropdownRef} className='user-dropdown'>
                                       <Link onClick={handleLogut} className='link' href=""><i className="fa-solid fa-sign-out-alt"></i> Sign out</Link>
                                       <Link onClick={handleForgotPassword} className='link' href=""><i className="fa-solid fa-lock"></i> Forget Password</Link>
                                    </div>
                                 )}
                              </div>
                           </div>
                           <div className="tp-header-2-mobile-menu d-flex justify-content-end d-block d-md-none">
                              <div className="tp-header-2-hamburger-btn offcanvas-open-btn"
                                 onClick={() => setSidebarOpen(true)}
                                 style={{ backgroundImage: `url(/assets/img/icon/header-hamburger-shape.png)` }}>
                                 <button className="hamburger-btn">
                                    <span>
                                       <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M0 1.13163C0 0.506972 0.499692 0 1.11538 0H20.4487C21.0644 0 21.5641 0.506972 21.5641 1.13163C21.5641 1.7563 21.0644 2.26327 20.4487 2.26327H1.11538C0.499692 2.26327 0 1.7563 0 1.13163ZM27.8846 10.5619H1.11538C0.499692 10.5619 0 11.0689 0 11.6935C0 12.3182 0.499692 12.8252 1.11538 12.8252H27.8846C28.5003 12.8252 29 12.3182 29 11.6935C29 11.0689 28.5003 10.5619 27.8846 10.5619ZM14.5 21.1238H1.11538C0.499692 21.1238 0 21.6308 0 22.2555C0 22.8801 0.499692 23.3871 1.11538 23.3871H14.5C15.1157 23.3871 15.6154 22.8801 15.6154 22.2555C15.6154 21.6308 15.1157 21.1238 14.5 21.1238Z" fill="currentColor"></path>
                                       </svg>
                                    </span>
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> {/* Sidebar Component */}
      </>
   );
};

export default SuperAdminHeader;