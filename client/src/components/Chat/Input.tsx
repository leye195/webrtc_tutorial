import React from "react";
import styled from "styled-components";
import { inputType } from "../../types/types";

const Container = styled.section`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TextInput = styled.input`
  all: unset;
  border: 1px sold #e3e3e3;
  border-radius: 10px;
  background-color: white;
  padding: 10px 5px;
  width: 80%;
`;

const Input = ({ placeholder }: inputType) => {
  return (
    <Container>
      <TextInput placeholder={placeholder} />
    </Container>
  );
};
export default Input;
