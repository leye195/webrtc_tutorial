import React from "react";
import styled from "styled-components";

type TitleType = {
  text?: string;
  size: string;
};

const Container = styled.div`
  margin-bottom: 20px;
`;
const Text = styled.p<{ size: string }>`
  font-size: ${(props) => `${props.size}rem`};
  font-weight: bold;
  padding: 5px 0px;
`;

const Title = ({ text, size = "1.0" }: TitleType) => {
  return (
    <Container>
      <Text size={size}>{text}</Text>
    </Container>
  );
};
export default Title;
