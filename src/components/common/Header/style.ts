import { styled } from 'styled-components';

export const Header = styled.div`
  padding: 10px 0px 0px 0px;
  margin-bottom: 24px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: background-color 0.2s ease-out;
  /* background-color: #121212 !important; */
  &.home {
    position: fixed;
    margin-bottom: 0;
    background-color: transparent;
  }
  &.visible {
    top: 0;
    transition: top 0.4s ease-out;
    background-color: #121212;
    transition: background-color 0.2s ease-out;
    border-bottom: 1px solid ${(props) => props.theme.colors.bgSurface};
  }

  &.hidden {
    /* position: absolute; */
    /* top: -200px; */
    transition: top 0.4s ease-out;
    background-color: transparent;
    transition: background-color 0.2s ease-out;
  }

  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    margin-bottom: 20px;
    &.home {
      position: relative;
      margin-bottom: 0;
    }
  }
`;

export const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  margin: 0 auto;
  .left {
    display: flex;
    align-items: center;
    gap: 20px;
    img {
      width: 100%;
      height: 42px;
    }
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;
