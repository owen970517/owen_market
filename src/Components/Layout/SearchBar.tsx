import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IForm } from '../../type/InputForm';
import styled from 'styled-components';
import { IStyleProps } from '../../type/StyleProps';
import searchIcon from '../../ImgSrc/search-icon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';
import { RootState } from '../../store/store';
import { useCallback, useEffect } from 'react';

const SearchBar = () => {
  const dispatch = useDispatch();
  const {isSearchBar} = useSelector((state:RootState) => state.user)
  const nav = useNavigate();
  const {register , handleSubmit , setValue, setFocus } = useForm<IForm>();
  const onSearch = handleSubmit((e) => {
    nav('/search/' + e.search)
    dispatch(userActions.searchToggle(false))
    setValue('search' , '')
  })
  const toggleSearch = useCallback(() => {
    dispatch(userActions.searchToggle(!isSearchBar))
    setFocus('search');
    setValue('search' , '')
  },[dispatch, isSearchBar, setFocus, setValue])
  useEffect(() => {
    if (isSearchBar) {
      setTimeout(() => {
        setFocus('search');
      }, 300);  
    }
  }, [isSearchBar, setFocus]);
  return (
    <SearchForm isopen={isSearchBar} onSubmit={onSearch}>
      <img src={searchIcon} alt='search' style={{width : '30px' , height : '30px' }} onClick={toggleSearch}/>
      <SearchInput {...register("search" , {required : true})} placeholder='찾고 싶은 상품을 입력하시오' isopen={isSearchBar}/>
    </SearchForm>
  )
}
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
export default SearchBar