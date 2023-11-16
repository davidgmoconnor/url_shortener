import styled from "styled-components";

const Vertical = styled.div<{ $size?: number }>`
  padding-bottom: ${(props) =>
    `${props.$size ? Math.floor(props.$size) : 8}px`};
`;

const Horizontal = styled.div<{ $size?: number }>`
  padding-right: ${(props) => `${props.$size ? Math.floor(props.$size) : 8}px`};
`;

export const Spacer = {
  Vertical,
  Horizontal,
};
