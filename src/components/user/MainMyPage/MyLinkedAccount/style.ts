import { css, styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 40px;
`;
export const Btn = styled.div<{
  bg?: string;
  border?: string | number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  width: fit-content;

  ${({ border }) =>
    border &&
    css`
      border: 1px solid ${(props) => props.theme.colors.colorHigh};
      min-width: 200px;
    `}

  border-radius: 11.2px;
  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
  background-color: ${(props) => props.bg};
  white-space: nowrap;
  text-align: center;
  font-family: ${(props) => props.theme.font.variable};
  color: ${(props) => props.theme.colors.surfaceHight};
  text-align: center;
  font-size: 12px;
  line-height: 16px;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  width: 510px;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 2px 4px;
`;

export const Text = styled.div<{
  color: string;
}>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.theme.font.variable};
  font-style: normal;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
`;
