import React, { useState } from "react";
import styled from "styled-components";
import SlideMenu from "./SlideMenu";
const Container = styled.header`
  position: relative;
  height: 60px;
  width: 100vw;
  background-color: gold;
`;

const MenuButton = styled.div`
  position: absolute;
  right: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;
const Line = styled.div`
  width: 35px;
  height: 5px;
  margin: 2px;
  background-color: white;
`;

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };
  return (
    <>
      <Container>
        <MenuButton onClick={handleToggle} onBlur={() => console.log("aaa")}>
          <Line></Line>
          <Line></Line>
          <Line></Line>
        </MenuButton>
      </Container>
      <SlideMenu toggle={toggle} handleToggle={handleToggle} />
    </>
  );
};
export default Header;
