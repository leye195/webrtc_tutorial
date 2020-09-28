import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";

const Container = styled.div`
  text-align: center;
  padding: 40px 10px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.2em;
  background-image: url("https://images.unsplash.com/photo-1495364141860-b0d03eccd065?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=755&q=80 755w");
  background-size: cover;
  background-position: center;
`;
const TimeText = styled.p`
  color: white;
  text-shadow: 0 0 10px black;
`;

const Clock = () => {
  const timer = useRef<number | undefined>(undefined);
  const [time, setTime] = useState<string>(
    moment(moment.now()).format("YYYY년 MM월 DD일 hh:mm:ss")
  );

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((cur) =>
        moment(moment.now()).format("YYYY년 MM월 DD일 hh:mm:ss")
      );
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, []);
  return (
    <Container>
      <TimeText>{time}</TimeText>
    </Container>
  );
};
export default Clock;
