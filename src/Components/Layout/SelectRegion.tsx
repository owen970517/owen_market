import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { IForm } from '../../type/InputForm';
import { allRegions } from '../../constants/region';
import { useDispatch, useSelector } from 'react-redux';
import { regionActions } from '../../store/regionSlice';
import { RootState } from '../../store/store';
import * as S from '../../styles/Region.styled';

const SelectRegion = () => {
  const dispatch = useDispatch();
  const {region} = useSelector((state:RootState) => state.region);
  const {register} = useForm<IForm>();
  useEffect(() => {
    dispatch(regionActions.initializeRegions())
  },[dispatch])
  const handleRegionChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(regionActions.setRegion(e.target.value))
    dispatch(regionActions.setDistrict(''))
  };
  const handleDistrictChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(regionActions.setDistrict(e.target.value))
  }
  return (
    <S.RegionContainer>
      <S.RegionSelectBox {...register('region' ,{required : true})}  onChange={handleRegionChange}>
        <S.RegionOption value=''>지역 선택</S.RegionOption>
          {Object.keys(allRegions).map((region, index) => (
            <S.RegionOption key={index} value={region}>{region}</S.RegionOption>
          ))}
        </S.RegionSelectBox>
      {region && (
        <S.RegionSelectBox {...register('district' ,{required : true})}  onChange={handleDistrictChange}>
          <S.RegionOption value=''>세부지역 선택</S.RegionOption>
          {allRegions[region].map((district:string, index:number) => (
            <S.RegionOption key={index} value={district}>{district}</S.RegionOption>
          ))}
        </S.RegionSelectBox>
      )}
    </S.RegionContainer>
  )
}

export default SelectRegion