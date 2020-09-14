import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  min-width: 300px;
  height: 50%;
  margin: auto;
  border: 1px solid #e3e3e3;
  border-radius: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Grid: FunctionComponent = ({ children }) => {
  return <Container>{children}</Container>;
};
export default Grid;
