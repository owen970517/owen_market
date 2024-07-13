import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  justify-content : center;
  align-items : center;
  flex-direction : column;
`;

export const TextInput = styled.input<{isError? : string}>`
  width : 500px;
  height : 50px;
  margin : 10px 10px;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 16px;
  border: 1px solid ${props => props.isError ? 'red' : '#000'};
  @media (max-width: 768px) {
    width: 90%;
    height: 40px;
    font-size: 14px;
  }
`;

export const SubmitButton = styled.button`
  width : 300px;
  height : 50px;
  margin-bottom : 10px;
  border-radius: 5px;
  border: none;
  background-color: #007BFF;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 90%;
    height: 40px;
    font-size: 16px;
  }
`;