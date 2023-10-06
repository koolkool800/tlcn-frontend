import Button from '@components/common/Button';
import { TicketSaleStatus } from '@constants/codeConstants';
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

  .pointer {
    cursor: pointer;
  }
  .information-detail {
    padding: 24px 0;
    display: flex;
    gap: 16px;
    border-top: 1px dashed #fff;
    border-bottom: 1px dashed #fff;

    .image-wrap {
      width: 235px;
      height: 235px;
      .no-image {
        width: 100%;
        aspect-ratio: 1/1;
        background-color: ${(props) => props.theme.colors.lightSolidNeutral900};
      }

      img {
        height: 100%;
        aspect-ratio: 1/1;
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
      display: flex;
      align-items: center;
      gap: 7px;
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
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;

    .order-total {
      .row {
        display: flex;
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
    .btn-pay {
      width: initial;
    }
    span {
      color: ${(props) =>
        props.theme.colors.emphasisDarkSurfaceHigh} !important;
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
  status: TicketSaleStatus;
}>`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.feedbackError600};

  p {
    font-family: ${(props) => props.theme.font.variable};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;

    color: ${(props) => {
      switch (props.status) {
        case TicketSaleStatus.PENDING:
          return props.theme.colors.feedbackWarning400;
        case TicketSaleStatus.IS_LISTING:
          return props.theme.colors.solidBasicBlue;
        case TicketSaleStatus.PAYMENT_COMPLETED:
          return props.theme.colors.primary550;
        case TicketSaleStatus.TRANSACTION_COMPLETED:
          return props.theme.colors.primary550;
        case TicketSaleStatus.ON_SHIPPING:
          return props.theme.colors.feedbackError400;
        case TicketSaleStatus.EXPIRED:
          return props.theme.colors.feedbackError600;
        case TicketSaleStatus.CANCEL:
          return props.theme.colors.red100;
        default:
          return '';
      }
    }};
  }
`;

export const BtnCancel = styled(Button)`
  background-color: ${(props) => props.theme.colors.feedbackError600};
`;

export const BtnSendPin = styled(Button)`
  background-color: ${(props) => props.theme.colors.feedbackWarning500};
`;
