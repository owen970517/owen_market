import Region from "../Layout/Region";
import AllProducts from "./AllProducts";
import { Helmet ,HelmetProvider } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>중고사이트</title>
        </Helmet>
        <Region />
        <AllProducts/>
      </HelmetProvider>
    </>
  );
}

export default Home;