import styled from "styled-components"

export const Container = styled.div`
  width: 550px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
`

export const PreviewWrapper = styled.div`
  position: relative;
`
export const DeleteBtn = styled.div`
  position: absolute;
  top : -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #000;
  cursor : pointer;
`

export const PreviewImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  gap: 5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
`;

export const FileInput = styled.div`
  label {
    display: inline-block;
    padding: 0.5em 0.75em;
    color: #fff;
    font-size: 16px;
    line-height: normal;
    vertical-align: middle;
    background-color: #74c0fc;
    border-radius: 5px;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #489dcf;
    }
  }

  input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #217dbb;
  }
`;