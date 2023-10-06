import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 0 16px;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    padding: 0px;
  }
`;

export const TabWrapper = styled.div`
  .ant-tabs-tab-btn {
    font-size: 16px;
    font-weight: 700;
  }
  .ant-tabs-top > .ant-tabs-nav::before {
    /* border-bottom: 0px; */
  }

  .ant-tabs-nav .ant-tabs-nav-list {
    gap: 24px;
  }

  .ant-tabs .ant-tabs-tab {
    margin: 0;
    padding: 8px 12px;
  }
`;
