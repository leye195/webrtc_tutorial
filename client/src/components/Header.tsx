import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAuth } from "../reducers/user";
const Container = styled.header<{ visible: boolean }>`
  position: relative;
  height: 60px;
  width: 100vw;
  background-color: #dcdcdce0;
  display: ${(props) => (props.visible ? "none" : "block")};
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
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleToggle = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };
  useEffect(() => {
    dispatch(userAuth());
  });
  return (
    <Container visible={pathname.includes("room")}>
      <MenuButton onClick={handleToggle}>
        <NavLink exact to={"/"} activeClassName="active">
          홈
        </NavLink>
        <NavLink to={"/chat"} activeClassName="active">
          채팅
        </NavLink>
      </MenuButton>
    </Container>
  );
};
export default Header;
