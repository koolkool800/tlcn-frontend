import styled from 'styled-components';

export const WrapperFooter = styled.div`
  background-color: ${(props) => props.theme.colors.surfaceDarkBackground};
  /* height: 380px; */
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 20px 0;
  color: white;
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    padding: 20px 16px 58px;
    flex-direction: column-reverse;
    height: auto;
    .divider-above {
      order: 1;
    }
  }
`;

export const WrapperActions = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;

  .container-navigate-left {
    display: flex;
    justify-content: space-between;
    span {
      font-family: ${(props) => props.theme.font.variable};
      color: ${(props) => props.theme.colors.surfaceHight}!important;
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
    }

    span:first-child {
      padding: 20px 20px 20px 0px;
    }
    span:not(:first-child) {
      padding: 20px;
    }
  }
  .container-navigate-right {
    display: flex;
    align-items: center;
    gap: 22px;

    img {
      cursor: pointer;
    }

    span {
      color: ${(props) => props.theme.colors.white}!important;
      padding: 10px;
      font-size: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    flex-direction: column-reverse;
    justify-content: center;
    gap: 24px;
    .container-navigate-left {
      span {
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.4px;
        text-align: center;
        padding: 0px;
      }

      span:first-child {
        padding: 0px;
      }
      span:not(:first-child) {
        padding: 0px;
      }
    }
    .container-navigate-right {
      justify-content: center;
      gap: 22px;
      img {
        height: 20px;
        width: 20px;
      }

      span {
      }
    }
  }
`;

export const WrapperInfo = styled.div`
  display: flex;
  max-width: 1200px;
  gap: 50px;
  width: 100%;
  justify-content: space-between;
  .paragraph {
    span {
      font-family: ${(props) => props.theme.font.variable};
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: ${(props) => props.theme.colors.surfaceMedium};
    }
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
