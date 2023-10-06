import { styled } from 'styled-components';

export const Tabs = styled.div`
  display: flex;
  border-radius: 14px;
  /* background-color: ${(props) => props.theme.colors.bgSurface}; */
  height: 40px;
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;
  &.background-tranparent {
    background-color: transparent;
  }

  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    border-radius: 0;
    background-color: transparent;
    border-bottom: ${(props) => props.theme.colors.surfaceSmall} 1px solid;
    overflow-x: auto;
    width: 100%;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const Tab = styled.div`
  padding: 0 20px;
`;
export const ActiveTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: 15px;
  line-height: 20px;
  font-family: ${(props) => props.theme.font.variable};
  color: ${(props) => props.theme.colors.surfaceHight};
  white-space: nowrap;
  &:hover {
    border-radius: 1px;
    border-bottom: 1px solid ${(props) => props.theme.colors.primary500};
  }
  &.active {
    border-radius: 1px;
    border-bottom: 1px solid ${(props) => props.theme.colors.primary500};
  }
`;
