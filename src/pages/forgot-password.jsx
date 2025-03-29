import React from 'react';
import Wrapper from '../layout/wrapper';
import SEO from '../common/seo';
import Login from '../components/superAdminComponents/loginCompo';
import ForgotPassword from '../components/superAdminComponents/forgotPassword';

const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"forgot password"} />
            <ForgotPassword />
        </Wrapper>
    );
};

export default index;