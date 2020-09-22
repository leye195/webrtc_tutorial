import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { rootState } from "../reducers";
import { Redirect } from "react-router";
import Section from "../components/Chat/Section";
import Input from "../components/Chat/Input";

const Container = styled.div`
  max-width: 70%;
  height: 100vh;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -1px 1px 10px 8px #e3e3e3;
`;
const LeftSection = styled.section`
  background-color: #6395ed;
  flex: 1;
  border-left: 1px solid #e3e3e3;
`;
const RightSection = styled.section`
  flex: 2;
  border-right: 1px solid #e3e3e3;
`;
const MenuSection = styled.section`
  margin-top: 30px;
`;
const MenuItem = styled.div`
  color: white;
  font-weight: bold;
  margin-left: 10px;
`;
const Ul = styled.ul`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  color: #e3e3e3;
`;
const Li = styled.li`
  margin: 5px;
  padding: 5px;
  font-weight: bold;
  &:hover {
    color: white;
    background-color: #7b9edc;
    border-radius: 20px;
  }
`;
const Chat = () => {
  const { isLoggedIn } = useSelector((state: rootState) => state.user);
  return (
    <Container>
      {isLoggedIn ? (
        <Section>
          <LeftSection>
            <Input placeholder={"연락처 검색"} />
            <MenuSection>
              <MenuItem>모든 연락처</MenuItem>
              <Ul>
                <Li>유저1</Li>
                <Li>유저2</Li>
              </Ul>
            </MenuSection>
          </LeftSection>
          <RightSection></RightSection>
        </Section>
      ) : (
        <Redirect to={"/"} />
      )}
    </Container>
  );
};
export default Chat;
