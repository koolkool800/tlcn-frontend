import { styled } from 'styled-components';

export const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 8px;
  .left {
    display: flex;
    align-items: center;
    gap: 20px;
    img {
      width: 100%;
      height: 42px;
    }
  }
  .btn-search-xs {
    display: none;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    padding: 0 16px;
    .left {
      flex: 1;
      img {
        width: 100px;
        height: 32px;
      }
    }
  }
  .btn-search-xs {
    display: flex;
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  .container-select-header {
    .ant-select-selection-item {
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
  button {
    span {
      color: ${(props) => props.theme.colors.surfaceHight};
    }
  }
`;
