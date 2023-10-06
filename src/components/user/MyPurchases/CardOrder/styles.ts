import { OrderStatus } from '@constants/codeConstants';
import { styled } from 'styled-components';

export const CardContainer = styled.div`
  padding: 16px;
  background-color: ${(props) => props.theme.colors.neutral900};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .order-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .order-date {
      display: flex;
      gap: 16px;
      p {
        color: ${(props) => props.theme.colors.surfaceHight};
        font-family: ${(props) => props.theme.font.variable};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
    }
  }

  .information-detail {
    padding: 24px 0;
    display: flex;
    gap: 16px;
    border-top: 1px dashed
      ${(props) => props.theme.colors.emphasisDarkSurfaceSmall};
    border-bottom: 1px dashed
      ${(props) => props.theme.colors.emphasisDarkSurfaceSmall};

    .image-wrap {
      width: 235px;
      height: 235px;
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
    }
    .author-detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .author {
        text-transform: uppercase;
        font-weight: 700;
      }
      .see-more-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: center;
        color: ${(props) => props.theme.colors.surfaceHight};
      }
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
      p {
        font-size: 16px;
        span {
          color: ${(props) => props.theme.colors.primary500};
          font-weight: 700;
        }
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;

    .order-total {
      .row {
        display: flex;
        align-items: center;
        p {
          color: ${(props) => props.theme.colors.surfaceMedium};
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
        }
        span {
          margin-left: 24px;
          color: ${(props) => props.theme.colors.primary500};
          font-weight: 700;
        }
      }
    }
  }

  .btn-wrap {
    display: flex;
    justify-content: end;
    gap: 16px;
    .btn-pay {
      width: initial;
    }
    span {
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
  }

  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    padding: 16px;
    gap: 12px;
    .order-status {
      flex-direction: column-reverse;
      align-items: flex-start;
      gap: 8px;
      .order-date {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        p {
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
          letter-spacing: 0em;
          text-align: left;
        }
      }
    }
    .information-detail {
      padding: 12px 0;
      gap: 12px;
      .image-wrap {
        width: 96px;
        height: 127px;
        border-radius: 14px;
      }
      .details {
        gap: 4px;
      }
    }

    .bottom {
      flex-direction: column;
      gap: 8px;
      .order-total {
        .row {
          justify-content: space-between;
        }
      }
    }
  }
`;

export const StatusOrder = styled.div<{
  status:
    | 'PAYMENT_COMPLETED'
    | 'PAYMENT_PENDING'
    | 'EXPIRED'
    | 'DELIVERY_COMPLETED'
    | 'TRANSACTION_COMPLETED'
    | 'DELIVERY_UNIT_RECEIVED'
    | 'DELIVERY_UNIT_COMPLETED_CHECKING'
    | 'SENT_PIN'
    | 'SENT_DELIVERY_UNIT'
    | 'CANCEL';
}>`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  p {
    color: ${(props) => {
      switch (props.status) {
        case OrderStatus.PAYMENT_COMPLETED:
          return props.theme.colors.primary550;
        case OrderStatus.DELIVERY_COMPLETED:
          return props.theme.colors.primary550;
        case OrderStatus.TRANSACTION_COMPLETED:
          return props.theme.colors.primary550;
        case OrderStatus.SENT_DELIVERY_UNIT:
          return props.theme.colors.red700;
        case OrderStatus.SENT_PIN:
          return props.theme.colors.red700;
        case OrderStatus.DELIVERY_UNIT_COMPLETED_CHECKING:
          return props.theme.colors.red700;
        case OrderStatus.DELIVERY_UNIT_RECEIVED:
          return props.theme.colors.red700;
        case OrderStatus.PAYMENT_PENDING:
          return props.theme.colors.yellow50;
        case OrderStatus.CANCEL:
          return props.theme.colors.red100;
        default:
          return '';
      }
    }};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
`;
