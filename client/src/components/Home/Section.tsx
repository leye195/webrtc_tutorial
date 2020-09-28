import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 95vh;
  margin: 0 auto;
`;

const Section: FunctionComponent = ({ children }) => {
  return <Container>{children}</Container>;
};
export default Section;
