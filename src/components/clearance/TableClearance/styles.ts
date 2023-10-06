import Button from '@components/common/Button';
import { styled } from 'styled-components';
import { Container as C } from '@style/DefaultStyled';

export const WrapperTable = styled.div`
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    width: 100%;
    overflow-x: auto;
  }

  .heading {
    font-weight: 400;
    font-size: ${(props) => props.theme.fontSizes[1]}px;
    color: ${(props) => props.theme.colors.surfaceMedium};
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    //padding: 16px 0px !important;
    color: ${(props) => props.theme.colors.lightGrey};
  }

  .ant-table-tbody tr:first-child td:first-child {
    border-top-left-radius: 10px;
  }
  .ant-table-tbody .ant-table-row .ant-table-cell:first-child {
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
  }

  .ant-table-tbody .ant-table-row .ant-table-cell:last-child {
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
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
`;
