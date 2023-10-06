import { styled } from 'styled-components';

export const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 0 48px;
  .left {
    display: flex;
    align-items: center;
    gap: 20px;
    img {
      width: 100%;
      height: 42px;
    }
  }
  .right {
    display: flex;
    gap: 0.5rem;
    .ant-select-selection-item {
      color: ${(props) => props.theme.colors.surfaceHight};
    }
    .btn-login {
      color: ${(props) => props.theme.colors.surfaceHight};
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
