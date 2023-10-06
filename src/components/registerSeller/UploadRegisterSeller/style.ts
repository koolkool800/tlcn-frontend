import styled from 'styled-components';

export const Layout = styled.div`
  .ant-upload-list {
    display: none;
  }
`;

export const RenderList = styled.div`
  width: 100%;

  & > div:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const Wrapper = styled.div<{ width?: number; height?: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 8px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.64);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .upload-thumbnail {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 48px;
    height: 48px;
    line-height: 60px;
    text-align: center;
    flex: none;
    color: ${(props) => props.theme.colors.white};
  }
  .upload-name {
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 8px;
    line-height: 1.5714285714285714;
    flex: auto;
    transition: all 0.3s;
  }
  .actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
`;

export const ModalContainer = styled.div`
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
`;
