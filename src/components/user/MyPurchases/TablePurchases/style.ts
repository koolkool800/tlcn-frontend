import { css, styled } from 'styled-components';

export const Btn = styled.div<{
  bg?: string;
  border?: string | number;
  borderRadius?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  width: fit-content;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.colorHigh};
  white-space: nowrap;
  text-align: center;
  font-family: ${(props) => props.theme.font.variable};
  color: ${(props) => props.theme.colors.black};
  text-align: center;
  font-size: 15px;
  line-height: 20px;
`;
