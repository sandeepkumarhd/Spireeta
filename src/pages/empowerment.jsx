import React from "react";
import Wrapper from "../layout/wrapper";
import SEO from "../common/seo";
import Empowerment from "../components/empowerment";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Empowerment"} />
      <Empowerment />
    </Wrapper>
  );
};

export default index;
