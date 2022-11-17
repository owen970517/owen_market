import Region from "../Layout/Region";
import AllProducts from "./AllProducts";
import { Helmet ,HelmetProvider } from "react-helmet-async";
import Title from "../Layout/Title";
import styled from "styled-components";

function Home() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>중고사이트</title>
        </Helmet>
        <Title/>
        <Region />
        <AllProducts/>
      </HelmetProvider>
    </>
  );
}

export default Home;