import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  .sign-up-form {
    max-width: 600px;
    min-width: 384px;
  }

  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    .sign-up-form {
      min-width: fit-content;
      width: 100%;
    }
  }
`;
export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  h3 {
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }
`;
export const BtnOTP = styled.div`
  padding: 10px 8px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.font.variable};
  text-align: center;
  font-size: 15px;
  line-height: 20px;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
`;
export const Password = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-bottom: 6px;
  .label {
    color: rgba(255, 255, 255, 0.88);
    font-size: 15px;
    font-family: ${(props) => props.theme.font.variable};
    line-height: 20px;
    &:after {
      content: '*';
      display: inline-block;
      margin-left: 4px;
      font-size: inherit;
      font-family: inherit;
      color: ${(props) => props.theme.colors.red500};
    }
  }
  .description {
    font-family: ${(props) => props.theme.font.variable};
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.4px;
  }
`;
export const Label = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-bottom: 6px;
  .label {
    color: rgba(255, 255, 255, 0.88);
    font-size: 15px;
    font-family: ${(props) => props.theme.font.variable};
    line-height: 20px;
    &:after {
      content: '*';
      display: inline-block;
      margin-left: 4px;
      font-size: inherit;
      font-family: inherit;
      color: ${(props) => props.theme.colors.red500};
    }
  }
  .description {
    font-family: ${(props) => props.theme.font.variable};
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.4px;
  }
`;
export const WrapperDaumCode = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  border: 1px solid;

  .icon {
    color: #ffffff;
    position: absolute;
    right: -1px;
    top: -26px;
    padding: 1px 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    .ti {
      margin-top: 3px;
      font-weight: 600;
    }
  }
`;
