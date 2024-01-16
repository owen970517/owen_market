import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { regionActions } from "../../store/regionSlice";
import { RootState } from "../../store/store";
import { IData } from "../../type/ItemProps";
import { allRegions } from "../../constants/region";
import { useForm } from "react-hook-form";
import { IForm } from "../../type/InputForm";

const FilterRegionBtn = () => {
  const dispatch = useDispatch()
  const {register} = useForm<IForm>();
  const { activeRegion, activeDistrict ,allProducts } = useSelector((state: RootState) => state.region);
  useEffect(() => {
    dispatch(regionActions.initializeRegions())
  },[dispatch])
  useEffect(() => {
    let filtered = activeRegion === '' ? allProducts : allProducts.filter((region: IData) => region.지역 === activeRegion);
    if (activeDistrict) {
      filtered = filtered.filter((data:IData) => data.세부지역 === activeDistrict)
    }
    dispatch(regionActions.setFilteredProducts(filtered));
    dispatch(regionActions.setFilteredAllProducts(filtered));
    dispatch(regionActions.resetIndex());
  }, [allProducts, dispatch, activeRegion, activeDistrict]);
  const handleRegionChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(regionActions.changeRegion(e.target.value))
    dispatch(regionActions.changeDistrict(''))
  };
  const handleDistrictChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(regionActions.changeDistrict(e.target.value))
  }
  return (
    <StyledDiv>
      <StyledSelect {...register('region' ,{required : true})} value={activeRegion} onChange={handleRegionChange}>
        <StyledOption value=''>지역 선택</StyledOption>
        {Object.keys(allRegions).map((region, index) => (
          <StyledOption key={index} value={region}>{region}</StyledOption>
        ))}
      </StyledSelect>
      {activeRegion && (
      <StyledSelect {...register('district' ,{required : true})} value={activeDistrict} onChange={handleDistrictChange}>
        <StyledOption value=''>세부지역 선택</StyledOption>
        {allRegions[activeRegion].map((district:string, index:number) => (
        <StyledOption key={index} value={district}>{district}</StyledOption>
        ))}
      </StyledSelect>
      )}
    </StyledDiv>
  )
}
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;

const StyledSelect = styled.select`
  width: 200px;
  height: 40px;
  margin: 10px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #f8f8f8;
  font-size: 16px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
`;

const StyledOption = styled.option`
  padding: 5px;
  font-size: 16px;
`;

export default FilterRegionBtn