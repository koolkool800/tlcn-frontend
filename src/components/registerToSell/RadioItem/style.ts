import { styled } from 'styled-components';

export const Wrapper = styled.div<{
  type: 'pinTransaction' | 'sellerShipment' | 'onsiteTransaction';
}>`
  display: flex;
  .transaction-type {
    max-height: 40px;
    min-width: 136px;
    border-radius: 14px;
    color: #000;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    margin-left: 10px;
    max-width: 800px;
  }
  .pinTransaction {
    background-color: ${(props) =>
      props.theme.colors.transactionType.PIN_TRANSACTION};
  }
  .sellerShipment {
    background-color: ${(props) =>
      props.theme.colors.transactionType.SELLER_SHIPMENT};
  }
  .onsiteTransaction {
    background-color: ${(props) =>
      props.theme.colors.transactionType[props.type]};
  }
`;
