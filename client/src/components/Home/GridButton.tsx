import React, { FunctionComponent } from "react";
import styled from "styled-components";

type buttonType = {
  bgColor: string;
  handleClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};

const Button = styled.button<{ bgColor: string }>`
  all: unset;
  background-color: ${(props) => props.bgColor};
  color: white;
  font-weight: bold;
  border-radius: 40px;
  width: 200px;
  height: 200px;
  justify-self: center;
  align-self: center;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 6px 2px #e3e3e3;
  }
`;
const Text = styled.p``;

const GridButton = ({
  bgColor = "white",
  handleClick,
  children,
}: buttonType) => {
  return (
    <Button bgColor={bgColor} onClick={handleClick}>
      {children}
    </Button>
  );
};
export default GridButton;
