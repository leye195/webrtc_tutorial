import React from "react";
import styled from "styled-components";

const Container = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonGrid = styled.div``;

const LeftSide = () => {
  return (
    <Container>
      <ButtonGrid></ButtonGrid>
    </Container>
  );
};
export default LeftSide;
