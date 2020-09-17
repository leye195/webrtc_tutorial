import React, { useState, useCallback, FunctionComponent } from "react";
import styled, { css } from "styled-components";
import Submit from "./Button";
import { loadUser, saveUser, checkExist } from "../utils/user";
import { useDispatch } from "react-redux";
import { userLogIn, userSignUp } from "../reducers/user";
const Container = styled.div`
  width: 100%;
  height: 150px;
`;
const ButtonContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Button = styled.button<{ on: boolean }>`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 1rem;
  flex: 1;
  background-color: #d1d1d1;
  color: white;
  ${(props) =>
    props.on === true &&
    css`
      background-color: #3498db;
    `}
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100px;
`;
const Input = styled.input`
  all: unset;
  padding: 5px 10px;
  font-size: 1.2rem;
  margin-top: 5px;
  background-color: #f9f9f9;
`;
const Form: FunctionComponent = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const dispatch = useDispatch();

  const handleId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setId((cur) => value);
  }, []);

  const handlePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;
      setPassword((cur) => value);
    },
    []
  );

  const handlePasswordAgain = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;
      setPasswordAgain((cur) => value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLButtonElement>) => {
      const {
        currentTarget: { dataset },
      } = e;
      const type = dataset["type"];
      if (type === "login") {
        /* if (checkExist("user", { userId: id, password })) {
          dispatch(userLogIn(id));
          clearForm();
        }*/
        dispatch(userLogIn({ userId: id, password }));
        clearForm();
      } else if (type === "signup") {
        //console.log(id, password, passwordAgain);
        /*if (!checkExist("user", { userId: id, password })) {
          saveUser("user", { userId: id, password });
          userSignUp({ userId: id });
        }*/
        dispatch(userSignUp({ userId: id, password }));
        clearForm();
      }
    },
    [id, password, passwordAgain]
  );
  const clearForm = () => {
    setId((cur) => "");
    setPassword((cur) => "");
    setPasswordAgain((cur) => "");
  };
  const handleToggle = useCallback(() => {
    setToggle((cur) => !cur);
    clearForm();
  }, []);

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={handleToggle} on={toggle === false}>
          로그인
        </Button>
        <Button onClick={handleToggle} on={toggle === true}>
          가입
        </Button>
      </ButtonContainer>
      {toggle ? (
        <InputContainer>
          <Input placeholder="ID" value={id} onChange={handleId} />
          <Input
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            type="password"
          />
          <Input
            placeholder="Password Again"
            value={passwordAgain}
            onChange={handlePasswordAgain}
            type="password"
          />
          <Submit
            type={"signup"}
            bgColor={"#3498db"}
            textColor={"white"}
            text={"확인"}
            handleClick={handleSubmit}
          />
        </InputContainer>
      ) : (
        <InputContainer>
          <Input placeholder="ID" value={id} onChange={handleId} />
          <Input
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            type="password"
          />
          <Submit
            type={"login"}
            bgColor={"#3498db"}
            textColor={"white"}
            text={"확인"}
            handleClick={handleSubmit}
          />
        </InputContainer>
      )}
      {children}
    </Container>
  );
};
export default Form;
