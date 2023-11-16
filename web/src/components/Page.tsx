import React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import Text from "./Text";

type Props = {
  title?: string;
  children: ReactNode;
};

const Page = ({ children, title }: Props) => {
  return (
    <Container>
      {title ? <Text variant="subtitle">{title}</Text> : null}
      {children}
    </Container>
  );
};

export default Page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
