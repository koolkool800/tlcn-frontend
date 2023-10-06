import { styled } from 'styled-components';

export const Btn = styled.div`
  width: 100%;
  padding: 12px 24px;
  background-color: ${(props) => props.theme.colors.surfaceDark};
  color: ${(props) => props.theme.colors.surfaceHight};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 16.8px;
  transition: background-color 0.2s ease-in-out;
  img {
    width: 24px;
    height: 24px;
  }
  .content {
    flex: 1;
  }
  &:hover {
    background-color: #414141;
    transition: background-color 0.2s ease-in-out;
  }
`;
