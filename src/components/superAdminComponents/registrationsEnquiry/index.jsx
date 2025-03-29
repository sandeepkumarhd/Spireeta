import React from 'react';
// import HeaderOne from '@/src/layout/headers/header';
import Breadcrumb from '@/src/common/breadcrumb/breadcrumb';
import FooterThree from '@/src/layout/footers/footer-3';
import HeaderTwo from '@/src/layout/headers/header-2';
import SuperAdminHeader from "@/src/layout/headers/superAdminHeader";
import EnquiryTable from './enquiryTable';


const RegistrationsEnquiries = () => {
    return (
        <>
            <SuperAdminHeader />

            <main>
                {/* <Breadcrumb top_title="Who We Are" page_title="About Us" /> */}
                <EnquiryTable />


            </main>
            {/* <FooterThree /> */}
        </>
    );
};

export default RegistrationsEnquiries;