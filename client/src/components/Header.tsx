import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAuth, userLogOut } from "../reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
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

const LogoutButton = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
  padding: 0 5px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    cursor: pointer;
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
  const handleLogout = () => {
    dispatch(userLogOut());
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
      <LogoutButton>
        <FontAwesomeIcon icon={faPowerOff} onClick={handleLogout} />
      </LogoutButton>
    </Container>
  );
};
export default Header;
