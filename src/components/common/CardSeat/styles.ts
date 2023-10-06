import { styled } from 'styled-components';

export const CardSeat = styled.div`
  max-width: 180px;
  height: 100%;
  padding: 14px 10px;
  border-radius: 14px;
  background-color: #252525;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: default;
  &.active {
    background-color: ${(props) => props.theme.colors.primary550};
  }
  .price {
    font-size: 15px;
    line-height: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }
  .position {
    color: #fff;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    margin-bottom: 16px;
  }
  .transaction-type-wrap {
    display: flex;
    gap: 4px;
    row-gap: 6px;
    flex-wrap: wrap;
  }
`;

export const TransactionType = styled.span<{
  type: 'PIN_TRANSACTION' | 'SELLER_SHIPMENT';
}>`
  padding: 4px 6px;
  border-radius: 8px;
  color: #000;
  font-size: 9px;
  font-weight: 400;
  line-height: 12px;
  background-color: ${(props) =>
    props.theme.colors.transactionType[props.type]};
`;
