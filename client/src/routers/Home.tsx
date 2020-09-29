import React, { useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { rootState } from "../reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import Form from "../components/Form";
import Section from "../components/Home/Section";
import Grid from "../components/Home/Grid";
import GridButton from "../components/Home/GridButton";
import Modal from "../components/Modal";
import Title from "../components/Home/Title";
import Clock from "../components/Home/Clock";
import { getSocket, getSocketId } from "../utils/socket";

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
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Input = styled.input`
  border: 1px solid #e3e3e3;
  padding: 10px;
  width: 90%;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const ButtonContainer = styled.div<{ direction: string; justify: string }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  width: 80%;
  svg {
    padding: 5px;
    color: white;
  }
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
const CallButton = styled.button<{ color: string }>`
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 50%;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
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
const CallingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: callingAni 1.2s infinite forwards;
  @keyframes callingAni {
    from {
      transform: scale(0.9);
    }
    to {
      transform: scale(1);
    }
  }
`;

const H3 = styled.h3`
  margin-bottom: 10px;
`;
const Text = styled.p``;
const Calling = styled(Text)`
  font-weight: bold;
  padding: 10px;
`;
const CodeNumber = styled(Text)`
  text-align: center;
  padding: 10px;
  font-weight: bold;
`;
const Content = styled.div`
  width: 80%;
  height: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  const socket = getSocket();
  const myCode = getSocketId();
  const history = useHistory();
  const [room, setRoom] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [callingId, setCallingId] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [receivedCall, setReceivedCall] = useState<boolean>(false);
  const { isLoggedIn, userId } = useSelector((state: rootState) => state.user);
  const handleOpenModal = useCallback(() => {
    setModalOpen((cur) => true);
    clearRoomCode();
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen((cur) => false);
    clearRoomCode();
  }, []);

  const callRequest = () => {
    if (code !== "") {
      const roomId = v4();
      socket.emit("callRequest", { code, myCode, roomId });
      history.push(`/room/${roomId}`);
    } else {
      alert("");
    }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setCode(value);
  }, []);

  const handleToggle = useCallback(() => {
    setToggle((cur) => !cur);
  }, []);

  const clearRoomCode = () => {
    setCode((cur) => "");
  };

  const acceptCall = useCallback(() => {
    history.push(`/room/${room}`);
  }, [history, room]);

  const rejectCall = useCallback(() => {
    socket.emit("rejectCall", room);
    setReceivedCall((cur) => false);
  }, [socket, room]);
  useEffect(() => {
    if (isLoggedIn) {
      setToggle((cur) => false);
      socket.on("callReceived", (data: any) => {
        const { code, userCode, roomId } = data;
        if (code === myCode) {
          setCallingId((cur) => userCode);
          setReceivedCall((cur) => true);
          setRoom((cur) => roomId);
        }
      });
    }
  }, [isLoggedIn, socket, myCode]);

  return (
    <Container>
      {modalOpen && (
        <Modal direction={"row"}>
          <Content>
            <Title size={"1.5"} text={"영상 통화"} />
            <InputContainer>
              <Input
                placeholder="유저 ID"
                value={code}
                onChange={handleChange}
              />
              <Input defaultValue={userId} placeholder="입장 이름" />
            </InputContainer>
            <ButtonContainer direction={"row"} justify={"none"}>
              <Button btnType="default" onClick={handleCloseModal}>
                취소
              </Button>
              <Button btnType="private" onClick={callRequest}>
                통화 요청
              </Button>
            </ButtonContainer>
          </Content>
        </Modal>
      )}
      {receivedCall && (
        <Modal direction={"column"}>
          <CallingWrapper>
            <Calling>{`${callingId} is calling`}</Calling>
            <ButtonContainer direction={"row"} justify={"center"}>
              <CallButton color={"rgb(127, 186, 0)"} onClick={acceptCall}>
                <FontAwesomeIcon icon={faPhone} size={"2x"} />
              </CallButton>
              <CallButton color={"rgb(232, 16, 35)"} onClick={rejectCall}>
                <FontAwesomeIcon icon={faPhoneSlash} size={"2x"} />
              </CallButton>
            </ButtonContainer>
          </CallingWrapper>
        </Modal>
      )}
      {isLoggedIn ? (
        <Section>
          <Clock />
          <CodeNumber>{`통화ID: ${myCode}`}</CodeNumber>
          <Grid>
            <GridButton
              bgColor={"rgb(52,152,219)"}
              handleClick={handleOpenModal}
            >
              <H3>📞</H3>
              <Text>통화</Text>
            </GridButton>
          </Grid>
        </Section>
      ) : (
        <FormContainer>
          <HeadTitle>WEVA</HeadTitle>
          {toggle === false ? (
            <>
              <ButtonContainer direction={"column"} justify={"none"}>
                <Button btnType="private" onClick={handleToggle}>
                  로그인
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
      )}
    </Container>
  );
};
export default Home;
