import Button from '@components/common/Button';
import styled from 'styled-components';

export const Wrapper = styled.div`
  /* min-height: 700px;
  min-width: 1240px; */

  .container-loading {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container-mobile-title {
    display: flex;
    justify-content: space-between;
    padding: 0 11px;
    margin-top: 10px;
  }
  .shipping-type-tag {
    min-width: 136px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    border-radius: 14px;
    margin-bottom: 10px;
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
  .container-content {
    width: auto;
    display: flex !important;
    flex-direction: column;
    margin-top: 48px;

    .row-action {
      justify-content: space-between;
      @media only screen and (max-width: 600px) {
        flex-direction: row-reverse;
      }
      margin-bottom: 20px;
    }

    .box-filter {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media screen and (max-width: 500px) {
        align-items: flex-end;
        .button {
          width: 40px;
          height: 40px;
        }
      }
    }
    .box-search {
      display: flex;
      align-items: center;
      width: 100%;
      padding-left: 50px;

      @media (max-width: ${(props) => props.theme.isMobile}) {
        padding-left: 0;
      }

      .ant-form-item {
        width: 100%;
        margin-bottom: unset;
      }
      .ant-form {
        width: 100%;
        .ant-col {
          min-height: unset;
        }
      }
    }
    .box-checkbox {
      display: flex;
      align-items: center;
      margin-bottom: unset;
      .ant-checkbox-wrapper {
        color: ${(props) => props.theme.colors.white};
        min-width: 200px;
        .ant-checkbox-checked {
          .ant-checkbox-inner {
            background-color: ${(props) => props.theme.colors.primary500};
            color: ${(props) => props.theme.colors.primary500};
            border-color: ${(props) => props.theme.colors.primary500};
          }
        }
      }
    }
    .fade-in {
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
      display: none;
    }
    .show {
      opacity: 1;
      margin-right: 24px;
      display: block;
      min-width: 250px;
    }
  }

  .ant-table-content {
    overflow: auto;
  }

  .btn-action {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: ${(props) => props.theme.isMobile}) {
    .ant-table-content .ant-table-cell {
      padding: 8px 16px;

      button {
        height: 32px;
        width: fit-content;
      }
    }

    .ant-row {
      justify-content: center;
    }
  }
`;

export const Header = styled.div`
  width: 100%;
  text-align: center;
  justify-content: center;
  display: flex;
  color: ${(props) => props.theme.colors.white};
  /* padding: 0 0 20px 0; */
  position: relative;
  h5 {
    margin-bottom: 48px;
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    justify-content: space-between;
    align-items: center;
    h5 {
      margin-bottom: 0;
      font-size: 16px;
    }

    button {
      margin-right: 0px;
    }

    margin-top: 16px;
    margin-bottom: 24px;
  }
`;

export const ButtonCustom = styled(Button)`
  width: 80px;
  height: 40px;
  color: ${(props) => props.theme.colors.emphasisDarkColorHight};
  margin-right: 24px;
  background-color: ${(props) => props.theme.colors.primary500};

  position: absolute;
  right: 0;
  &:hover {
    color: ${(props) => props.theme.colors.emphasisDarkColorHight} !important;
    opacity: 1 !important;
  }
`;

export const WrapperTable = styled.div<{ isShown: boolean }>`
  .container-body {
    display: ${(props) => (props.isShown ? 'flex' : 'block')};
  }
  .container-body .ant-row {
    display: initial;
  }
`;
