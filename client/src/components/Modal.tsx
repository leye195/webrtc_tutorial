import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
`;
const Container = styled.div`
  max-width: 600px;
  min-width: 250px;
  width: 100%;
  padding: 10px 0;
  box-shadow: 0px 0px 15px 1px black;
  border-radius: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;
const Modal: FunctionComponent = ({ children }) => {
  return (
    <Layout>
      <Container>{children}</Container>
    </Layout>
  );
};
export default Modal;
