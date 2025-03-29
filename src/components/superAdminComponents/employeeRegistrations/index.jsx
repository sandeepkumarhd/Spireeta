import React from 'react';
// import HeaderOne from '@/src/layout/headers/header';
import Breadcrumb from '@/src/common/breadcrumb/breadcrumb';
import FooterThree from '@/src/layout/footers/footer-3';
import HeaderTwo from '@/src/layout/headers/header-2';
import SuperAdminHeader from "@/src/layout/headers/superAdminHeader";
import EmployeeTable from './employeeTable';


const EmployeeRegistrations = () => {
    return (
        <>
            <SuperAdminHeader />

            <main>

                <EmployeeTable />


            </main>
            {/* <FooterThree /> */}
        </>
    );
};

export default EmployeeRegistrations;