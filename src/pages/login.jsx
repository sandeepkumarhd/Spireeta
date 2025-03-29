import React from 'react';
import Wrapper from '../layout/wrapper';
import SEO from '../common/seo';
import Login from '../components/superAdminComponents/loginCompo';

const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"login"} />
            <Login />
        </Wrapper>
    );
};

export default index;