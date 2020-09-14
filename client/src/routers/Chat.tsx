import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { rootState } from "../reducers";
import { Redirect } from "react-router";

const Container = styled.div``;
const Chat = () => {
  const { isLoggedIn } = useSelector((state: rootState) => state.user);
  return <Container>{isLoggedIn ? "chat" : <Redirect to={"/"} />}</Container>;
};
export default Chat;
