import { styled } from 'styled-components';

export const Container = styled.div`
  margin-bottom: 70px;
  display: flex;
  gap: 40px;
  .left {
    flex: 1;
  }
  .right {
    flex: 1;
    .breadcrumd-wrap {
      margin-bottom: 20px;
    }
    .ticket-description-wrap {
      margin-bottom: 24px;
    }
    .select-ticket-section {
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h6 {
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 24px;
          color: #fff;
        }
      }
    }
    .filter-select-wrap {
      .ant-collapse-borderless > .ant-collapse-item {
        border-bottom: none;
        width: 100%;
      }
      .ant-space {
        width: 100%;
        .ant-space-item {
          width: 100%;
        }
      }
      .ant-space-item .ant-collapse-header {
        background-color: ${(props) => props.theme.colors.surfaceDark};
        border-radius: 14px;
        padding: 10px;
        align-items: center;
        .ant-collapse-header-text {
          color: ${(props) => props.theme.colors.collapseFilter};
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
        .ant-collapse-expand-icon {
          padding-inline-end: 0;
        }
      }
    }
    .filter-tag-container {
      display: flex;
      flex-wrap: wrap;
      row-gap: 8px;
      .tag-text {
        color: ${(props) => props.theme.colors.surfaceHight};
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
      }
      .ant-tag > span + .anticon {
        margin-inline-start: 6px;
      }
    }
    .ticket-view-section {
      margin-bottom: 40px;
    }
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ButtonSubmitFormBuyTicket = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .btn-payment {
    max-width: 384px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: ${(props) => props.theme.colors.purple200};
    padding: 14px;
    border-radius: 14px;
    cursor: pointer;
    transition: opacity ease-out 0.2s;
    span {
      font-size: 21px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      color: #000;
    }
    &:hover {
      opacity: 0.4;
      transition: opacity ease-out 0.2s;
    }
  }
`;
