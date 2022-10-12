import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IForm } from '../../type/InputForm';
import styled from 'styled-components';
import { BiSearch } from "react-icons/bi";
const SearchBar = () => {
    const nav = useNavigate();
    const {register , handleSubmit , setValue} = useForm<IForm>();
    const onSearch = handleSubmit((e) => {
        nav('/search/' + e.search)
        setValue('search' , '')
    })
  return (
    <SearchForm onSubmit={onSearch}>
        <SearchIcon/>
        <SearchInput {...register("search" , {required : true})} placeholder='찾고 싶은 상품을 입력하시오'/>
    </SearchForm>
  )
}
const SearchForm = styled.form`
    width: 350px;
    height: 40px;
    border-radius: 40px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background: #fff;
    transition: all 0.3s ease;
    display : flex;
`
const SearchInput = styled.input`
    font-size: 14px;
    width :200px;
    background: none;
    color: #5a6674;
    border: none;
    appearance: none;
    outline: none;
`
const SearchIcon =styled(BiSearch)`
    padding: 10px;
    font-size: 25px;
`
export default SearchBar