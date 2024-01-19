import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from '../../styles/Region.styled';
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
    <S.RegionContainer>
      <S.RegionSelectBox {...register('region' ,{required : true})} value={activeRegion} onChange={handleRegionChange}>
        <S.RegionOption value=''>지역 선택</S.RegionOption>
        {Object.keys(allRegions).map((region, index) => (
          <S.RegionOption key={index} value={region}>{region}</S.RegionOption>
        ))}
      </S.RegionSelectBox>
      {activeRegion && (
      <S.RegionSelectBox {...register('district' ,{required : true})} value={activeDistrict} onChange={handleDistrictChange}>
        <S.RegionOption value=''>세부지역 선택</S.RegionOption>
        {allRegions[activeRegion].map((district:string, index:number) => (
          <S.RegionOption key={index} value={district}>{district}</S.RegionOption>
        ))}
      </S.RegionSelectBox>
      )}
    </S.RegionContainer>
  )
}

export default FilterRegionBtn