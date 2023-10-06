import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    gap: 16px;
    h5 {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
`;
export const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap {
    width: 100%;
  }
  .ant-tabs-nav-wrap {
    width: 100%;
  }
  .ant-tabs-nav .ant-tabs-nav-list {
    gap: 12px;
    justify-content: space-between;
    width: 100%;
  }
  .ant-tabs .ant-tabs-tab {
    width: 100%;
    /* padding: 0 0 24px 0; */
    padding: 0;
    margin: 0;
    text-align: center;
  }
  .ant-tabs .ant-tabs-tab-btn {
    width: 100%;
    color: #fff;
    font-family: ${(props) => props.theme.font.variable};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    padding: 24px 10px;
    margin: auto;
  }

  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.primary550};
    border-bottom: 3px solid ${(props) => props.theme.colors.primary550};
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin-bottom: 24px;
  }
  .input-wrap {
    width: 100%;
  }
  .orders-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin: 24px 0;
  }
  .ant-tabs .ant-tabs-ink-bar {
    background: transparent;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    .orders-container {
      gap: 16px;
      margin-top: 16px;
    }
    .ant-tabs-nav .ant-tabs-nav-list {
      gap: 8px;
      width: fit-content;
      justify-content: space-between;
    }
    .ant-tabs .ant-tabs-tab {
      padding: 8px;
    }
  }
`;
