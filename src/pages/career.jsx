import React from 'react';
import Wrapper from '../layout/wrapper';
import SEO from '../common/seo';
import About from '../components/about';
import Career from '../components/career';

const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"Career"} />
            <Career />
        </Wrapper>
    );
};

export default index;