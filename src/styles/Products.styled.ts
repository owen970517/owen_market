import { Link } from "react-router-dom";
import styled from "styled-components";

export const Grid = styled.div`
  display : grid;
  grid-template-columns : repeat(auto-fit, minmax(20rem,1fr));
  grid-gap : 20px;
  place-items: center;
  padding: 20px;
  background-color: #f8f8f8; 
`;

export const Item = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: white;
  transition: transform .2s;

  &:hover {
    transform: scale(1.03);
  }

  h3 {
    margin: 10px 0;
    text-align: center;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color : black;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  &:hover {
    color: #e67e22;
  }
`;