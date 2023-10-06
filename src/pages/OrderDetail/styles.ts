import { styled } from 'styled-components';

export const OrderDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  .information-wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .order-date {
      font-weight: 400;
    }
    .order-info-details {
      display: flex;
      gap: 16px;

      .img-wrap {
        height: 235px;
        width: 235px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;
        flex: 1;
        .author {
          text-transform: uppercase;
          font-weight: 700;
        }
        .title {
          text-align: left;
        }
        .stadium {
          color: ${(props) => props.theme.colors.surfaceMedium};
        }
        .showTime {
          color: ${(props) => props.theme.colors.primary550};
          p {
            display: flex;
            align-items: center;
            gap: 7px;
          }
        }
        .seat-position {
          font-size: 16px;
          line-height: 24px;
        }
        .quantity {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            color: ${(props) => props.theme.colors.primary500};
            font-weight: 700;
          }
          p {
            font-size: 16px;
          }
        }
      }
    }
    .delivery-wrap {
      margin-bottom: 20px;
    }
  }

  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    gap: 24px;
    h5 {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
    }
    .information-wrap {
      gap: 12px;
      .order-number,
      .order-date {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
      }
      .order-info-details {
        .img-wrap {
          width: 97px;
          height: 127px;
          img {
            border-radius: 14px;
          }
        }
        .details {
          gap: 12px;
        }
      }
    }
  }
`;
