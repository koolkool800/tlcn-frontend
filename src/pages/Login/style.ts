import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  .ant-btn-default {
    &:disabled {
      background-color: ${(props) => props.theme.colors.primary500};
    }
  }
  .login-form {
    max-width: 600px;
    min-width: 384px;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    .login-form {
      min-width: fit-content;
      width: 100%;
    }
  }
`;
export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;
export const Extend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding: 4px 0;
  margin-bottom: 40px;
  span {
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 14px;
    line-height: 22px;
  }
`;
export const Line = styled.div`
  width: 1px;
  height: 14px;
  border-left: 1px solid ${(props) => props.theme.colors.primary500};
`;
export const Social = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
