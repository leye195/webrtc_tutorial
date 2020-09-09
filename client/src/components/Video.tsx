import React, { useRef, useEffect } from "react";
import styled from "styled-components";

type VideoProps = {
  id: string | undefined;
  stream: MediaStream | undefined;
};
const VideoScreen = styled.video`
  width: 100%;
  height: 100%;
  background-color: black;
  margin: 10px;
`;
const Video = ({ id, stream }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream ? stream : null;
  }, [stream]);
  return <VideoScreen id={id} ref={videoRef} autoPlay></VideoScreen>;
};

export default Video;
