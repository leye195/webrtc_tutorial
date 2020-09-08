import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { Link, useLocation, useHistory } from "react-router-dom";

const Container = styled.div`
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeadTitle = styled.p`
  font-weight: bold;
  font-size: 1.3rem;
  padding: 5px;
  margin-bottom: 20px;
`;
const FormContainer = styled.div`
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
const Button = styled.button`
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  flex: 1;
  cursor: pointer;
  font-weight: bold;
`;
const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const history = useHistory();
  const handleEnter = () => {
    if (roomCode !== "") {
      history.push(`/room/${roomCode}`);
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
  return (
    <Container>
      <FormContainer>
        <HeadTitle>RTC Room</HeadTitle>
        <CodeInput placeholder="입장 코드 입력" onChange={handleChange} />
        <ButtonContainer>
          <Button>
            <Link to={`/room/${v4()}`}>방 생성</Link>
          </Button>
          <Button onClick={handleEnter}>입장</Button>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};
export default Home;
