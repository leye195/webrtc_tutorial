import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

type propsType = {
  toggle: Boolean;
  handleToggle: Function;
};
const Container = styled.div<{ toggle: Boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  will-change: opacity;
  transition: opacity 0.5s;
  margin: 0;
  padding: 0;
  ${(props) =>
    props.toggle
      ? css`
          opacity: 0.9;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `};
`;
const MenuContainer = styled.div<{ toggle: Boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #e3e3e3;
  transition: all 0.5s;
  min-width: 0px;
  ${(props) =>
    props.toggle
      ? css`
          width: 260px;
        `
      : css`
          width: 0px;
        `}
`;
const MenuHead = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-bottom: 1px solid #e3e3e3;
`;
const SlideMenu = ({ toggle, handleToggle }: propsType) => {
  return (
    <Container toggle={toggle} onClick={() => handleToggle()}>
      <MenuContainer toggle={toggle}>
        <MenuHead>WebRTC 연습</MenuHead>
      </MenuContainer>
    </Container>
  );
};
export default SlideMenu;
