import React, { useEffect, useRef, useCallback, useState } from "react";
import styled from "styled-components";
import socketClient from "socket.io-client";
import { useParams, useHistory } from "react-router";
import Peer from "peerjs";

type roomProps = {
  userId: string;
};
const Container = styled.div`
  & .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, auto-fill);
    grid-auto-rows: 250px;
    justify-content: center;
    gap: 10px;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: black;
    }
  }
`;
const InfoContainer = styled.div`
  text-align: center;
  padding: 10px;
  font-weight: bold;
`;
const Button = styled.button`
  all: unset;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 10px;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  min-width: 150px;
  text-align: center;
  cursor: pointer;
  box-shadow: 1px 1px 6px 3px #e3e3e3;
`;
const Room = () => {
  const { roomId = null } = useParams();
  const history = useHistory();
  const socket = useRef(socketClient.connect("http://localhost:8080"));
  const myPeer = useRef(
    new Peer(undefined, {
      host: "/",
      port: 3001,
    })
  );
  const userList: any = useRef([]);
  const videoList: any = useRef({});
  const [id, setId] = useState("");
  const myVideo = document.createElement("video");

  const connectToNewUser = (userId: string, stream: MediaStream) => {
    const call = myPeer.current.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
    call.on("close", () => {
      video.remove();
    });
    videoList.current[userId] = call;
    userList.current.push(userId);
    console.log(userList.current);
  };

  const addVideoStream = (video: any, stream: MediaStream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    document.querySelector(".video-grid")?.appendChild(video);
  };

  const openVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      }); //get video
      addVideoStream(myVideo, stream);
      socket.current.on("user-connected", ({ userId }: roomProps) => {
        connectToNewUser(userId, stream);
      });

      myPeer.current.on("call", (call) => {
        call.answer(stream);
        console.log("answer");
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, [connectToNewUser]);

  const closeVideo = () => {
    socket.current.on("user-disconnected", ({ userId }: roomProps) => {
      if (videoList.current[userId]) {
        videoList.current[userId].close();
        socket.current.emit("user-hangout");
      } else {
        socket.current.emit("user-hangout");
        //myPeer.current.disconnect();
      }
    });
  };

  const handleClose = () => {
    socket.current.emit("user-leave");
    socket.current.on("user-hangout", () => {
      myPeer.current.disconnect();
      setTimeout(() => {
        //history.replace("/");
      }, 500);
    });
  };

  useEffect(() => {
    if (Object.keys(videoList.current).length < 2) {
      openVideo();
      myPeer.current.on("open", (id) => {
        setId(id);
        userList.current.push(id);
        console.log(userList.current);
        socket.current.emit("join-room", { roomId, userId: id });
      });
      closeVideo();
    }
  }, []);

  return (
    <>
      <Container>
        <InfoContainer>{`입장 코드: ${roomId}`}</InfoContainer>
        <div className="video-grid"></div>
      </Container>
      <Button onClick={handleClose}>끊기</Button>
    </>
  );
};
export default Room;
