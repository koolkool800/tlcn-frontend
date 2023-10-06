import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 40px;
  }
  .ant-form {
    .container-voucher {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 32.5px;
      margin-top: 16.5px;
    }
    .container-button-submit {
      display: flex;
      justify-content: center;
      margin-bottom: 73px;
      margin-top: 40px;
    }
    h5 {
      &:nth-child(1) {
        color: ${(props) => props.theme.colors.white};
        margin-bottom: 10px;
      }
    }
    .container {
      display: flex;
      flex-direction: column;
      .ant-checkbox {
        margin-top: 12px;
      }
      .container-title {
        display: flex;
        flex-direction: column;
        h3 {
          color: ${(props) => props.theme.colors.white};
        }
        .description {
          .header {
            color: ${(props) => props.theme.colors.white};
          }
          span {
            color: ${(props) => props.theme.colors.red500};
          }
        }
        span {
          color: ${(props) => props.theme.colors.surfaceSmall};
        }
      }
      .container-item-list {
        .ant-radio {
          position: absolute;
          top: 10px;
          left: 0;
        }
      }
      .container-price {
        display: flex;
        width: 100%;
        max-width: 500px;
        justify-content: space-between;
        margin: 12px 0px;
        color: ${(props) => props.theme.colors.surfaceMedium};
        .container-detail-price {
          span {
            &:nth-child(2) {
              font-weight: 700;
              font-weight: 700;
              line-height: 24px;
              color: ${(props) => props.theme.colors.surfaceHight};
            }
          }
        }
      }
      .container-form-check-sale-amount {
        label {
          font-size: 16px;
        }
        .container-check-sale-mount {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          h5 {
            color: ${(props) => props.theme.colors.surfaceMedium};
            font-size: 14px;
          }
          span {
            color: ${(props) => props.theme.colors.surfaceHight};
            font-size: 16px;
          }
        }
      }
    }

    .container-item-list .ant-checkbox {
      align-self: flex-start !important;
    }
  }
`;
