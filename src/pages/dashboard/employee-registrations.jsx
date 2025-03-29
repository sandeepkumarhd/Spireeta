import React from 'react';
import Wrapper from '../../layout/wrapper';
import SEO from '../../common/seo';
import EmployeeRegistrations from '../../components/superAdminComponents/employeeRegistrations';

const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"employee-registrations"} />
            <EmployeeRegistrations />
        </Wrapper>
    );
};

export default index;