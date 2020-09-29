import React, { useRef, useEffect } from "react";
import styled, { css } from "styled-components";

type VideoProps = {
  id: string | undefined;
  stream: MediaStream | undefined;
  me: boolean;
  sound: string;
};
const VideoScreen = styled.video<{ me: boolean }>`
  ${(props) =>
    props.me
      ? css`
          position: absolute;
          height: 25%;
          right: 10px;
          bottom: -10px;
          z-index: 10;
        `
      : css`
          width: 100%;
          height: 100%;
          background-color: black;
          margin: 10px;
        `}
`;
const Video = ({ id, stream, me, sound }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    else {
      videoRef.current.srcObject = stream ? stream : null;
      videoRef.current.muted = sound === "off" ? true : false;
    }
  }, [stream, sound]);
  return <VideoScreen id={id} me={me} ref={videoRef} autoPlay></VideoScreen>;
};

export default Video;
