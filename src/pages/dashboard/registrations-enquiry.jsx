import React from 'react';
import Wrapper from '../../layout/wrapper';
import SEO from '../../common/seo';
import RegistrationsEnquiry from '../../components/superAdminComponents/registrationsEnquiry'

const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"Registrations Enquiry"} />
            <RegistrationsEnquiry />
        </Wrapper>
    );
};

export default index;