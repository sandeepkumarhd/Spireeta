import React from 'react';
import Breadcrumb from '@/src/common/breadcrumb/breadcrumb';
import AboutArea from './../homes/home-3/about-area';
import FooterThree from '@/src/layout/footers/footer-3';
import HeaderTwo from '@/src/layout/headers/header-2';
import DropResume from './dropResume';

const Career = () => {
    return (
        <>
            <HeaderTwo />
            <main>
                <Breadcrumb top_title="Join Us" page_title="Career" />
                <DropResume />
            </main>
            <FooterThree />
        </>
    );
};

export default Career;