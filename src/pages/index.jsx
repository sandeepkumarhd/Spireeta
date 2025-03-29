import SEO from "../common/seo";
import HomeOne from "../components/homes/home";
import Wrapper from "../layout/wrapper";
import HomeTwo from '../components/homes/home-2';

const Home = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Spirita Technology"} />
      {/* <HomeOne /> */}
      <HomeTwo />

    </Wrapper>
  );
};

export default Home;