import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
export const ListMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 14px;
`;
export const MenuItem = styled.div`
  width: 100%;
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  color: ${(props) => props.theme.colors.surfaceHight};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  border-radius: 8px;
  &:focus,
  &:hover,
  &:visited {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
  .left {
    display: flex;
    align-items: center;
    gap: 12px;
    p {
      white-space: nowrap;
      text-align: start;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: auto;
      min-width: 0;
      color: ${(props) => props.theme.colors.surfaceHight};
      font-family: ${(props) => props.theme.font.variable};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
    }
  }
`;
