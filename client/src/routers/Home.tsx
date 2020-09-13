import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import Form from "../components/Form";
const Container = styled.div`
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeadTitle = styled.p`
  font-weight: bold;
  font-size: 3rem;
  padding: 5px;
  margin-bottom: 10px;
  color: #3498db;
`;
const FormContainer = styled.div`
  position: relative;
  max-width: 500px;
  min-width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px auto;
  border: 1px solid #e3e3e3;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 4px #e3e3e3;
`;
const CodeInput = styled.input`
  border: 1px solid #e3e3e3;
  padding: 10px;
  width: 90%;
  border-radius: 10px;
  margin-bottom: 30px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const Button = styled.button<{ btnType: String }>`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 1.2rem;
  flex: 1;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #dadada;
  }
  ${(props) =>
    props.btnType === "private" &&
    css`
      background-color: #3498db;
      color: white;
      &:hover {
        background-color: #2fa0ec;
      }
    `}
`;
const BackButton = styled.button<{ color: string }>`
  all: unset;
  position: absolute;
  bottom: 0;
  color: ${(props) => props.color};
  border-radius: 10px;
  padding: 8px;
  margin: 5px;
  cursor: pointer;
`;
const Home = () => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const history = useHistory();
  const handleEnter = () => {
    if (roomCode !== "") {
      history.push(`/room/${roomCode}`);
    } else {
      alert("");
    }
  };
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;
      setRoomCode(value);
    },
    [roomCode]
  );
  const handleToggle = useCallback(() => {
    console.log("toggle");
    setToggle((cur) => !cur);
  }, []);
  return (
    <Container>
      <FormContainer>
        <HeadTitle>WEVA</HeadTitle>
        {toggle === false ? (
          <>
            <CodeInput placeholder="회의 ID 입력" onChange={handleChange} />
            <ButtonContainer>
              <Button btnType="private" onClick={handleToggle}>
                로그인
              </Button>
              <Button
                btnType="default"
                onClick={handleEnter}
                disabled={roomCode.length > 0 ? false : true}
              >
                회의 참가
              </Button>
            </ButtonContainer>
          </>
        ) : (
          <>
            <Form>
              <BackButton color={"#d1d1d1"} onClick={handleToggle}>
                뒤로
              </BackButton>
            </Form>
          </>
        )}
      </FormContainer>
    </Container>
  );
};
export default Home;
