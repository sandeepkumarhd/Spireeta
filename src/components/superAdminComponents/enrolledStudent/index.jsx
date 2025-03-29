import React from 'react';
// import HeaderOne from '@/src/layout/headers/header';
import Breadcrumb from '@/src/common/breadcrumb/breadcrumb';
import FooterThree from '@/src/layout/footers/footer-3';
import HeaderTwo from '@/src/layout/headers/header-2';
import SuperAdminHeader from "@/src/layout/headers/superAdminHeader";
import EnrollStudentTable from './enrollStudentTable';


const EnrolledStudent = () => {
    return (
        <>
            <SuperAdminHeader />

            <main>

                {/* <EnquiryTable about={true} /> */}
                <EnrollStudentTable />

            </main>
            {/* <FooterThree /> */}
        </>
    );
};

export default EnrolledStudent;