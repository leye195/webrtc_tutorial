import React from "react";
import styled from "styled-components";
import { buttonType } from "../types/types";

const Container = styled.button<{ bgColor: string; textColor: string }>`
  all: unset;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border-radius: 5px;
  padding: 8px;
  margin-top: 5px;
  cursor: pointer;
  width: 65%;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;
const Button = ({
  bgColor = "white",
  textColor = "black",
  text,
  type,
  handleClick,
}: buttonType) => {
  return (
    <Container
      data-type={type}
      bgColor={bgColor}
      textColor={textColor}
      onClick={handleClick}
    >
      {text}
    </Container>
  );
};
export default Button;
