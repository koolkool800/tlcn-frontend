import { styled } from 'styled-components';

export const PaymentContainer = styled.div`
  .payment-method-section {
    margin-bottom: 40px;
    h6 {
      margin-bottom: 20px;
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 40px;
    @media (max-width: ${(props) => props.theme.isMobile}) {
      gap: 20px;
    }
    .text-wrap {
      h6 {
        margin-bottom: 12px;
      }
    }
    p {
      color: ${(props) => props.theme.colors.surfaceHight};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      display: list-item;
      list-style: inside;
      margin-inline-start: 12px;
      span {
        color: ${(props) => props.theme.colors.blue300};
      }
    }
  }
  .right {
    width: 100%;
    max-width: 383px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 24px;
    .price-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px 16px;
      background-color: ${(props) => props.theme.colors.neutral20};
      border-radius: 14px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      .text {
        color: ${(props) => props.theme.colors.surfaceMedium};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .price {
        color: ${(props) => props.theme.colors.surfaceHight};
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        &.total {
          color: ${(props) => props.theme.colors.primary500};
        }
        &.discount {
          color: ${(props) => props.theme.colors.red550};
        }
      }
    }
  }
`;
