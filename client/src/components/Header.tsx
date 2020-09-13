import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Container = styled.header`
  position: relative;
  height: 60px;
  width: 100vw;
  background-color: #dcdcdce0;
`;

const MenuButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & a {
    padding: 5px;
    color: white;
    font-weight: bold;
    &.active {
      color: rgb(52, 152, 219);
    }
  }
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
        <MenuButton onClick={handleToggle}>
          <NavLink exact to={"/"} activeClassName="active">
            홈
          </NavLink>
          <NavLink to={"/chat"} activeClassName="active">
            채팅
          </NavLink>
        </MenuButton>
      </Container>
    </>
  );
};
export default Header;
