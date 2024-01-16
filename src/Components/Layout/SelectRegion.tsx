import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { IForm } from '../../type/InputForm';
import { allRegions } from '../../constants/region';
import { useDispatch, useSelector } from 'react-redux';
import { regionActions } from '../../store/regionSlice';
import { RootState } from '../../store/store';
import styled from 'styled-components';

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
    <StyledDiv>
      <StyledSelect {...register('region' ,{required : true})}  onChange={handleRegionChange}>
        <StyledOption value=''>지역 선택</StyledOption>
          {Object.keys(allRegions).map((region, index) => (
              <StyledOption key={index} value={region}>{region}</StyledOption>
          ))}
        </StyledSelect>
      {region && (
        <StyledSelect {...register('district' ,{required : true})}  onChange={handleDistrictChange}>
          <StyledOption value=''>세부지역 선택</StyledOption>
          {allRegions[region].map((district:string, index:number) => (
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
export default SelectRegion