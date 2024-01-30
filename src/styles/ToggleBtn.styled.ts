import styled from "styled-components"

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;  
`
export const Button = styled.button<{active:boolean}>`
    color: ${props => props.active ? '#007BFF' : '#333'};
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    font-size: 30px;
    cursor: pointer;
    background: none;
    position: relative;
    transition: color 0.2s ease;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: ${props => props.active ? '100%' : '0'};
        height: 2px;
        background-color: #007BFF;
        transition: width 0.2s ease;
    }

    &:hover {
        color: #007BFF;
    }
`