import { styled } from 'styled-components';

export const TabsWrap = styled.div`
  width: 100%;
  .ant_tabs {
    width: 100%;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin-bottom: 20px;
  }
  .ant-tabs-nav .ant-tabs-nav-list {
    gap: 12px;
  }
  .ant-tabs .ant-tabs-tab {
    /* padding: 12px 0;
    margin: 0 24px; */
  }
  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.surfaceHight};
  }
  .ant-tabs .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-family: ${(props) => props.theme.font.variable};
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
  .ant-tabs-top > .ant-tabs-nav::before {
    color: ${(props) => props.theme.colors.surfaceMedium};
  }
  .ant-tabs .ant-tabs-ink-bar {
    background: ${(props) => props.theme.colors.primary500};
  }
  .ant-tabs-top > .ant-tabs-nav::before {
    border-bottom: none;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    .ant-tabs .ant-tabs-ink-bar {
      background: none;
    }
    .ant-tabs-tab.ant-tabs-tab-active {
      background-color: #53f6c633;
      border-radius: 34px;
    }
  }
`;
