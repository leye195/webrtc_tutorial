import React, { useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { v4 } from "uuid";
import Form from "../components/Form";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../reducers";
import Section from "../components/Home/Section";
import Grid from "../components/Home/Grid";
import GridButton from "../components/Home/GridButton";
import Modal from "../components/Modal";
import Title from "../components/Home/Title";
import { userAuth } from "../reducers/user";

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
const ButtonContainer = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
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
const H3 = styled.h3`
  margin-bottom: 10px;
`;
const Text = styled.p``;
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
  const [roomCode, setRoomCode] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const history = useHistory();
  const { isLoggedIn, userId } = useSelector((state: rootState) => state.user);
  const dispatch = useDispatch();

  const handleCreate = useCallback(() => {
    history.push(`/room/${v4()}`);
  }, []);

  const handleOpenModal = useCallback(() => {
    setModalOpen((cur) => true);
    clearRoomCode();
  }, []);
  const handleCloseModal = useCallback(() => {
    setModalOpen((cur) => false);
    clearRoomCode();
  }, []);

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
    setToggle((cur) => !cur);
  }, []);

  const clearRoomCode = () => {
    setRoomCode((cur) => "");
  };

  useEffect(() => {
    if (isLoggedIn) {
      setToggle((cur) => false);
    }
  }, [isLoggedIn]);

  return (
    <Container>
      {modalOpen && (
        <Modal>
          <Content>
            <Title size={"1.5"} text={"회의 참가"} />
            <InputContainer>
              <Input
                placeholder="회의 ID"
                value={roomCode}
                onChange={handleChange}
              />
              <Input defaultValue={userId} placeholder="입장 이름" />
            </InputContainer>
            <ButtonContainer direction={"row"}>
              <Button btnType="default" onClick={handleCloseModal}>
                취소
              </Button>
              <Button btnType="private" onClick={handleEnter}>
                참가
              </Button>
            </ButtonContainer>
          </Content>
        </Modal>
      )}
      {isLoggedIn ? (
        <Section>
          <Grid>
            <GridButton bgColor={"orange"} handleClick={handleCreate}>
              <H3>🎥</H3>
              <Text>새 회의</Text>
            </GridButton>
            <GridButton
              bgColor={"rgb(52,152,219)"}
              handleClick={handleOpenModal}
            >
              <H3>➕</H3>
              <Text>참가</Text>
            </GridButton>
          </Grid>
        </Section>
      ) : (
        <FormContainer>
          <HeadTitle>WEVA</HeadTitle>
          {toggle === false ? (
            <>
              <Input placeholder="회의 ID 입력" onChange={handleChange} />
              <ButtonContainer direction={"column"}>
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
      )}
    </Container>
  );
};
export default Home;
