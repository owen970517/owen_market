import FilterRegionBtn from "../Components/Layout/FilterRegionBtn";
import AllProducts from "../Components/products/AllProducts";
import Title from "../Components/common/Title";

const Home = () => {
  return (
    <>
      <Title/>
      <FilterRegionBtn />
      <AllProducts/>
    </>
  );
}

export default Home;