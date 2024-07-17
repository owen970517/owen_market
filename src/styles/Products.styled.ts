import { Link } from "react-router-dom";
import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 20px;
  place-items: center;
  padding: 20px;
  background-color: #f8f8f8;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 10px;
    grid-gap: 10px;
    
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: white;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }

  h3 {
    margin: 10px 0;
    text-align: center;
  }

  span,img {
    width: 300px;
    height: 300px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px;
    width: 90%;

    h2,h3,p {
      font-size: 14px;
    }

    span,img {
      width : 100px;
      height: 100px;
    }
  }
`;

export const InfoWrapper = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
`


export const ItemInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: black;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    color: #e67e22;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;