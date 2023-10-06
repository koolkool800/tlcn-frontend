import { styled } from 'styled-components';

export const SelectShipmentContainer = styled.div`
  .addresses-select-container {
    margin-top: 4px;
    padding-left: 40px;
    .select-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .address-item-detail {
        display: flex;
        flex-direction: column;
        gap: 6px;

        .name {
          color: ${(props) => props.theme.colors.surfaceHight};
          font-family: ${(props) => props.theme.font.variable};
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
        .address {
          color: ${(props) => props.theme.colors.surfaceMedium};
          font-family: ${(props) => props.theme.font.variable};
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
        .default-tag {
          color: ${(props) => props.theme.colors.primary500};
          font-size: 9px;
          font-style: normal;
          font-weight: 400;
          line-height: 12px;
          padding: 6px;
          border-radius: 8px;
          background-color: ${(props) =>
            props.theme.colors.solidLightGreenNetrual};
          width: fit-content;
        }
      }
    }
    .ant-radio {
      align-self: flex-start;
    }
  }
  .title-select-address {
    color: ${(props) => props.theme.colors.surfaceHight};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
  .form-container {
    display: block;
  }
  .form-shipping {
    margin-top: 4px;
    padding-left: 40px;
    display: block;
    .title-form-item {
      color: ${(props) => props.theme.colors.surfaceHight};
      font-family: ${(props) => props.theme.font.variable};
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      margin-bottom: 6px;
      &.recipient {
        display: flex;
        gap: 20px;
        align-items: center;
      }
    }
    .form-item-wrap {
      display: flex;
      flex-direction: column;
      .ant-form-item {
        margin-bottom: 16px;
      }
    }
  }
`;
