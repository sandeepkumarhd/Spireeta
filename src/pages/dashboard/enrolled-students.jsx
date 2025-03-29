import React from 'react';
import Wrapper from '../../layout/wrapper';
import SEO from '../../common/seo';
import EnrolledStudent from '../../components/superAdminComponents/enrolledStudent';

const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"enrolled-students"} />
            <EnrolledStudent />
        </Wrapper>
    );
};

export default index;