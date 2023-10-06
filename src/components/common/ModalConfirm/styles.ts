import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalStyle = styled(Modal)`
  .ant-modal-content {
    width: auto;
    padding: 40px;
    border-radius: 14px;
    background-color: ${(props) => props.theme.colors.neutral800};
    .ant-modal-title {
      color: ${(props) => props.theme.colors.colorHigh};
      font-family: ${(props) => props.theme.font.variable};
      font-style: normal;
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      text-align: center;
    }
    .ant-modal-close {
      right: 24px;
      top: 24px;
      inset-inline-end: 24px;
      width: 40px;
      height: 40px;
    }
    .ant-modal-header {
      background-color: inherit;
      border-radius: unset;
    }

    @media only screen and (max-width: 600px) {
      padding: 40px 16px;
      .ant-modal-title {
        font-size: 16px;
        line-height: 24px;
      }
      h5 {
        font-size: inherit;
        line-height: inherit;
      }
    }
  }
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  text-align: center;
  .success-img {
    img {
      width: 64px;
      height: 64px;
    }
  }
  .content-modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    text-align: center;
    color: ${(props) => props.theme.colors.surfaceHight};
    font-family: ${(props) => props.theme.font.variable};
    font-style: normal;
    h5 {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
    }
    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    gap: 24px;

    .success-img {
      img {
        width: 48px;
        height: 48px;
      }
    }
    .content-modal {
      h5 {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: center;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: center;
      }
    }
  }
`;
