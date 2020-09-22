import React from "react";
import styled from "styled-components";

const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
`;
const Section: React.FunctionComponent = ({ children }) => {
  return <Container>{children}</Container>;
};
export default Section;
