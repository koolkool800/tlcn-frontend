import styled from 'styled-components';

export const ModalContainer = styled.div`
  .container-pop {
    width: 100%;
    .ant-form-item-control-input-content {
      display: flex;
      justify-content: center;
      margin-top: 12px;
    }
    .content {
      display: flex;
      flex-direction: column-reverse;
      gap: 0;
      span {
        margin-bottom: 8px;
      }
    }
  }
  .ant-modal-content {
    background-color: ${(props) => props.theme.colors.neutral800};
    padding: 40px 100px 56px;
    .form-report-container {
      .detail {
        margin-bottom: 28px;
        .label {
          font-size: 15px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0em;
          text-align: left;
          color: ${(props) => props.theme.colors.surfaceHight};
          margin-bottom: 12px;
        }
        p {
          color: ${(props) => props.theme.colors.surfaceMedium};
        }
      }

      .list-upload {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .item-upload {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
            svg {
              cursor: pointer;
            }
          }
        }
        .item-name {
          color: ${(props) => props.theme.colors.surfaceMedium};
        }
      }
      .ant-upload-list-text {
        display: none;
      }
    }
  }

  .ant-modal-close {
    height: 33px;
    width: 33px;
  }
  .ant-modal-header {
    background-color: inherit;
  }
  .btn-wrap {
    button {
      span {
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: center;
      }
    }
  }
  .ant-upload-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    width: 100%;
  }
  .wrap-review {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    border-radius: 14px;
    border: 1px dashed ${(props) => props.theme.colors.surfaceHight};

    .upload-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      color: ${(props) => props.theme.colors.surfaceMedium};
    }
  }

  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    .ant-modal-content {
      /* padding: 0; */
      padding: 20px;
      h5 {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0em;
      }
    }
  }
`;

export const PopupNotiContainer = styled.div`
  .ant-modal-content {
    background-color: ${(props) => props.theme.colors.neutral800};
    padding: 40px 100px 56px;
  }

  .ant-modal-close {
    height: 33px;
    width: 33px;
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    img {
      height: 60px;
      width: 60px;
      margin: auto;
    }
  }
`;
