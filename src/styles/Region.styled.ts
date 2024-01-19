import styled from "styled-components";

export const RegionContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;

export const RegionSelectBox = styled.select`
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

export const RegionOption = styled.option`
  padding: 5px;
  font-size: 16px;
`;