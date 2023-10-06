import { position } from '@style/animations';
import styled from 'styled-components';

export const DrawerContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 10;
  opacity: 0;
  left: 100%;
  top: 0;
  transition: all 0.5s ease-in-out;
  padding: 0;
  &.open {
    left: 0%;
    top: 0;
    opacity: 1;
    transition: all 0.5s ease-in-out;
  }
  .content {
    background-color: ${(props) => props.theme.colors.surfaceDarkBackground};
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    width: 100%;
  }
  .overlay {
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
`;

export const ContentDrawerWrap = styled.div``;
