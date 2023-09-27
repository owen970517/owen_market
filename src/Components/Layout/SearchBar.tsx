import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IForm } from '../../type/InputForm';
import styled from 'styled-components';
import { IStyleProps } from '../../type/StyleProps';
import searchIcon from '../../ImgSrc/search-icon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/RootState';
import { userActions } from '../../store/userSlice';

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
  const toggleSearch = () => {
    dispatch(userActions.searchToggle(!isSearchBar))
    setFocus('search');
  }
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
  width: ${(props:IStyleProps) => (props.isopen ? "30rem" : "2rem")};
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
  display : ${(props:IStyleProps) => props.isopen ? 'block' : 'none'};
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  ::placeholder {
    color : white
  }
`
export default SearchBar