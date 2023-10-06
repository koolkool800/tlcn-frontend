import { styled } from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 792px;
  @media (max-width: ${(props) => props.theme.isMobile}) {
    height: 100vh;
  }

  h5 {
    margin-bottom: 48px;
    @media (max-width: ${(props) => props.theme.isMobile}) {
      gap: 20px;
    }
  }
  .main-detail {
    display: flex;
    flex-direction: column;
    gap: 40px;
    .information-detail {
      display: flex;
      gap: 24px;
      @media (max-width: ${(props) => props.theme.isMobile}) {
        gap: 12px;
      }
      .image-wrap {
        height: 150px;
        width: 113px;
        img {
          border-radius: 14px;
          object-fit: fill;
          height: 150px;
        }
      }
      .details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        flex: 1 0 0;

        .detail-header {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          .author {
            color: ${(props) => props.theme.colors.surfaceHight};
            font-family: ${(props) => props.theme.font.variable};
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 22px;
            text-transform: uppercase;
          }
          .place {
            color: ${(props) => props.theme.colors.surfaceMedium};
            font-family: ${(props) => props.theme.font.variable};
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            margin-top: 4px;
          }
        }

        .showTime {
          color: ${(props) => props.theme.colors.primary550};
          font-family: ${(props) => props.theme.font.variable};
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
        }
        .seat-position {
          color: #fff;
          font-family: ${(props) => props.theme.font.variable};
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px;
        }
      }
    }

    .select-transaction-method-wrapper {
      h6 {
        margin-bottom: 8px;
      }
      .ant-form-item {
        margin-bottom: 0;
      }
      .ant-radio-group {
        width: 100%;
        .ant-space {
          width: 100%;
          justify-content: space-between;
        }
      }
    }
  }
`;
