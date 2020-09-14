import React, { useEffect, useRef, useCallback, useState } from "react";
import styled from "styled-components";
import socketClient from "socket.io-client";
import { useParams } from "react-router";
import Peer from "peerjs";
import Video from "../components/Video";
import { v4 } from "uuid";
import { roomProps, streamProps } from "../types/room";
import { getSocket } from "../utils/socket";

const Container = styled.div`
  height: 50vh;
  & .videos {
    display: flex;
    justify-content: center;
    width: 400px;
    height: 80%;
    margin: 0 auto;
    @media (min-width: 320px) and (max-width: 450px) {
      flex-wrap: wrap;
      width: 100%;
    }
  }
`;
const InfoContainer = styled.div`
  text-align: center;
  padding: 10px;
  font-weight: bold;
`;
const Videos = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;
  height: 80%;
  margin: 0 auto;
  @media (min-width: 320px) and (max-width: 450px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;
const ButtonContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: black;
  width: 100vw;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  all: unset;
  transform: translate3d(10%, 20%, 0);
  padding: 10px;
  border-radius: 10px;
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  min-width: 150px;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 13px 0px #e4e4e4;
  }
`;

const Room = () => {
  const { roomId = null } = useParams();
  const socket = useRef(getSocket());
  let myPeer = useRef(
    new Peer(undefined, {
      host: "localhost",
      port: 9000,
      path: "/peer/video",
    })
  );
  const [lastId, setLastId] = useState<string>("");
  const [userList, setUserList] = useState<streamProps[]>([]);
  const videoList: any = useRef({});

  const addVideoStream = useCallback((id: string, stream: MediaStream) => {
    if (userList.some((user) => user.id === id) === false)
      setUserList((u) => [...u, { id, stream }]);
  }, []);
  const connectToNewUser = useCallback(
    (userId: string, stream: MediaStream) => {
      if (Object.keys(myPeer.current.connections).length < 1) {
        //상대방 peer 영상 연결 시도
        const call = myPeer.current.call(userId, stream);
        call.on("stream", (userVideoStream) => {
          addVideoStream(userId, userVideoStream);
        });
        call.on("close", () => {
          myPeer.current.disconnect();
        });
        videoList.current[userId] = call;
      }
    },
    [addVideoStream]
  );

  const initPeer = useCallback(
    async (id) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        }); //get video
        addVideoStream(id, stream);
        socket.current.on("user-connected", ({ userId }: roomProps) => {
          connectToNewUser(userId, stream);
        });
        myPeer.current.on("call", (call) => {
          if (Object.keys(myPeer.current.connections).length <= 1) {
            console.log(
              call.peer,
              myPeer.current.connections,
              myPeer.current.id
            );
            //console.log("someone called you");
            //상대방 peer 영상 연결 응답
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
              addVideoStream(id, userVideoStream);
            });
          } else {
            console.log("max");
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    [connectToNewUser, addVideoStream]
  );

  const closeVideo = () => {
    //영상 종료
    socket.current.on("user-disconnected", ({ userId }: roomProps) => {
      if (videoList.current[userId]) {
        videoList.current[userId].close();
        socket.current.emit("user-hangout");
      }
      setUserList((u) => u.filter((user) => user.id !== userId));
    });
  };

  const handleClose = () => {
    setTimeout(() => {
      window.location.replace("/");
    }, 500);
  };

  useEffect(() => {
    myPeer.current.on("open", (id) => {
      if (myPeer.current.id === null) {
        myPeer.current.id = lastId;
      } else {
        setLastId((cur) => myPeer.current.id);
      }
      console.log("..");
      socket.current.emit("join-room", { roomId, userId: myPeer.current.id });
      socket.current.on("request-ignore", () => {
        alert("이미 다른 사람과 연결되어 있습니다.");
        window.location.replace("/");
      });
      initPeer(myPeer.current.id);
    });
    closeVideo();
    return () => {};
  }, []);

  return (
    <>
      <Container>
        <InfoContainer>{`입장 코드: ${roomId}`}</InfoContainer>
        <Videos>
          {userList.map((user) => {
            return <Video key={v4()} id={user.id} stream={user.stream} />;
          })}
        </Videos>
      </Container>
      <ButtonContainer>
        <Button onClick={handleClose}>나가기</Button>
      </ButtonContainer>
    </>
  );
};
export default Room;
