import { css } from "styled-components";
export const flex = (dir: string, align: string, justify: string) => {
  return css`
    display: flex;
    flex-direction: ${dir};
    align-items: ${align};
    justify-content: ${justify};
  `;
};
