import { H6 } from '@style/DefaultStyled';
import { styled } from 'styled-components';

export const Container = styled.div`
  margin-bottom: 70px;
  display: flex;
  gap: 40px;
  .item-hover {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.colors.surfaceHight};
    }
  }
  .left {
    /* width: 50%; */
    flex: 1;
    .image-wrap {
      width: 100%;
      height: 100%;
      max-height: 865px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 14px;
        object-fit: cover;
      }
    }
  }

  .right {
    /* width: 50%; */
    flex: 1;
    @media screen and (max-width: 500px) {
      padding: 20px 16px 58px;
    }
    .breadcrumd-wrap {
      margin-bottom: 20px;
    }
    .transaction-section {
      display: flex;
      gap: 24px;
      flex-direction: column;
      margin-bottom: 40px;

      .seat-section {
        padding: 20px 16px;
        background-color: ${(props) => props.theme.colors.neutral20};
        border-radius: 14px;
        .seat-title {
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 12px;
          text-align: center;
          color: ${(props) => props.theme.colors.white};
        }
        .seats-wrap {
          display: flex;
          flex-direction: column;
          gap: 20px;
          .item-seat {
            display: flex;
            justify-content: space-between;
            align-items: center;
            p,
            .item-seat-detail {
              color: #fff;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 24px;
              width: 200px;
              &.item-seat-detail {
                display: flex;
                align-items: center;
                gap: 8px;
              }
            }
          }
        }
      }

      .transaction-action {
        display: flex;
        gap: 12px;

        .btn-action {
          width: 272px;
          padding: 14px 28px;
          border-radius: 22px;
          text-align: center;
          color: #000;
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px;
          cursor: pointer;
          transition: opacity 0.2s ease-in-out;

          &:hover {
            opacity: 0.8;
            transition: opacity 0.2s ease-in-out;
          }
        }
        .buy-btn {
          flex: 1;
          background-color: ${(props) => props.theme.colors.purple300};
        }
        .sale-btn {
          flex: 1;
          background-color: ${(props) => props.theme.colors.primary500};
        }
      }
    }
    .shipping-information-section {
      margin-bottom: 40px;
      h4 {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        color: #fff;
        margin-bottom: 20px;
      }
      .shipping-details {
        display: flex;
        gap: 24px;
        flex-direction: column;

        .shipping-item-row {
          display: flex;
          gap: 8px;
          color: #fff;
          .shipping-type {
            width: 136px;
            max-width: 136px;
            .shipping-type-tag {
              min-width: 136px;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 8px 0;
              border-radius: 14px;

              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
              color: #000;
              white-space: nowrap;
              &.pin-transaction {
                background-color: ${(props) =>
                  props.theme.colors.transactionType.PIN_TRANSACTION};
              }
              &.seller-shipment {
                background-color: ${(props) => props.theme.colors.lightBlue};
              }
            }
          }
          .shipping-item-detail {
            color: ${(props) => props.theme.colors.lightGrey};
            li {
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 24px;
              margin-left: 15px;
            }
          }
        }
      }
    }
    .purchase-information-section {
      margin-bottom: 40px;
      h4 {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        margin-bottom: 12px;
        color: ${(props) => props.theme.colors.lightGrey};
      }
      p {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        color: ${(props) => props.theme.colors.lightGrey};
      }
    }
  }
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    position: relative;
    .transaction-section {
      margin-top: calc(375px + 10px);
    }
    .transaction-action {
      width: 100%;
      position: fixed;
      display: flex;
      bottom: 0px;
      left: 0;
      background: ${(props) => props.theme.colors.black};
      padding: 20px 16px;
      border-top: 1px solid ${(props) => props.theme.colors.lightGrey};
      .btn-action {
        width: 110px;
      }
    }
    .shipping-item-row {
      flex-direction: column;
    }
  }
`;
export const Desc = styled(H6)`
  font-weight: 400;
`;

export const ContainerEventDetail = styled.div`
  width: 100%;
  max-width: ${(props) =>
    `${props.theme.maxWidth + props.theme.padding * 2}px`};
  padding: ${(props) => `0 ${props.theme.padding}px`};
  margin: 0 auto;
  position: relative;
  @media (max-width: 767px) {
    padding: ${(props) => `0 0`};
  }
`;
