import { useForm } from 'react-hook-form';
import { IForm } from '../../type/InputForm';
import styled from 'styled-components';
import { IStyleProps } from '../../type/StyleProps';
import searchIcon from '../../assets/search-icon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';
import { RootState } from '../../store/store';
import { useCallback, useEffect, useState } from 'react';
import { IData } from '../../type/ItemProps';
import { regionActions } from '../../store/regionSlice';
import React from 'react';
import Latest from './Latest';
import RelatedProducts from './RelatedProducts';
import useKeyboard from '../../hooks/useKeyboard';

const SearchBar = () => {
  const dispatch = useDispatch();
  const {isSearchBar} = useSelector((state:RootState) => state.user)
  const { allProducts } = useSelector((state: RootState) => state.region);
  const {register , handleSubmit , setValue, setFocus, watch } = useForm<IForm>();
  const [isFocus, setIsFocus] = useState(false);
  const [searchedData, setSearchedData] = useState<IData[]>([]); 
  const searchValue = watch('search')
  const prevSearched = JSON.parse(localStorage.getItem('latest') || '[]')
  const { onKeyDown, nowIndex, initIndex, value } = useKeyboard(searchValue ? searchedData : prevSearched);
  let nowValue = nowIndex !== null ? value : searchValue
  const onSearch = handleSubmit(() => {
    const now = allProducts.filter((item: IData) => item.상품명?.includes(nowValue));
    dispatch(regionActions.setFilteredProducts(now));
    dispatch(regionActions.setFilteredAllProducts(now));
    dispatch(regionActions.resetIndex());
    dispatch(userActions.searchToggle(false))
    const updatedData = prevSearched.filter((data:string) => data !== nowValue);
    updatedData.unshift(nowValue);
    if (updatedData.length > 5) {
      updatedData.pop();
    }
    localStorage.setItem('latest', JSON.stringify(updatedData));
    setValue('search' , '')
    initIndex();
  })
  const toggleSearch = useCallback(() => {
    dispatch(userActions.searchToggle(!isSearchBar))
    setFocus('search');
    setValue('search' , '')
  },[dispatch, isSearchBar, setFocus, setValue])
  const handleInputKeyDown = (e:React.KeyboardEvent) => {
    onKeyDown(e)
  }
  useEffect(() => {
    const productNames = allProducts.map((item: IData) => item.상품명);
    setSearchedData(productNames.filter((name:string) => name.includes(searchValue)));
    if (isSearchBar) {
      setTimeout(() => {
        setFocus('search');
        setIsFocus(true);
      }, 300);  
    } else {
      setIsFocus(false);
    }
  }, [allProducts, initIndex, isSearchBar, searchValue, setFocus, setValue, value]);
  useEffect(() => {
    if (!isFocus) {
      initIndex();
    }
    initIndex();
  },[initIndex, isFocus, searchValue])
  
  return (
    <SearchContainer>
      <SearchForm isopen={isSearchBar} onSubmit={onSearch}>
        <img src={searchIcon} alt='search' style={{width : '30px' , height : '30px' }} onClick={toggleSearch}/>
        <SearchInput {...register("search")} 
          placeholder='찾고 싶은 상품을 입력하시오' 
          autoComplete='off' 
          isopen={isSearchBar} 
          onFocus={() => setIsFocus(true)} 
          onBlur={() => setIsFocus(false)}
          onKeyDown={e => handleInputKeyDown(e)}
        />
      </SearchForm>
      {isFocus && (
        <SearchBox>
          <SectionTitle>{searchValue ? '관련 검색어' : '최근 검색어'}</SectionTitle>
          {searchValue ? <RelatedProducts searchValue={searchValue} idx={nowIndex!}/> : <Latest idx={nowIndex!}/>}
        </SearchBox>
      )}
    </SearchContainer>
  )
}
const SearchContainer = styled.div`
  position: relative;
  display: inline-block; 
`

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #44a8f4;
  width: ${(props:IStyleProps) => (props.isopen ? "25rem" : "2rem")};
  cursor: ${(props:IStyleProps)=> (props.isopen ? "auto" : "pointer")};
  padding: 10px;
  height: 20px;
  border-radius: 40px;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`
const SearchInput = styled.input`
  font-size: 20px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  border: none;
  color: white;
  opacity: ${(props:IStyleProps) => props.isopen ? '1' : '0'};
  visibility: ${(props:IStyleProps) => props.isopen ? 'visible' : 'hidden'};
  transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
              visibility 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  ::placeholder {
    color : white
  }
`
const SearchBox = styled.div`
  position: absolute;
  top: 50px;
  left: 10px;
  border-radius: 20px;
  width : 25rem;
  height : 500px;
  background-color: #fff;
`
const SectionTitle = styled.div`
  width: 90%;
  padding: 15px 4px 8px 4px;
  margin: 6px auto;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 700;
  color: #53585d;
  border-bottom: 1px solid #e7e7e7;
`;
export default SearchBar