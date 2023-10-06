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
  width: 100%;

  .ant-tabs .ant-tabs-tab-btn {
    color: #fff;
    font-family: ${(props) => props.theme.font.variable};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.primary550};
  }
  .ant-tabs-top > .ant-tabs-nav::before {
    border-bottom: none;
  }
  .ant-tabs .ant-tabs-tab {
    padding: 24px 10px;
  }
  .ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    margin-left: 12px;
  }

  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    .ant-tabs .ant-tabs-tab {
      padding: 8px 10px;
    }
  }
`;

export const TabContent = styled.div`
  .orders-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-top: 24px;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    .orders-container {
      gap: 16px;
      margin-top: 16px;
    }
  }
`;
