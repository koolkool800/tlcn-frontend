import { styled } from 'styled-components';

export const SellerShipmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  .short-desc {
    h6 {
      margin-bottom: 12px;
    }
    p {
      display: list-item;
      list-style-type: disc;
      list-style-position: outside;
      color: ${(props) => props.theme.colors.surfaceHight};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      margin-left: 16px;
      @media only screen and (max-width: 600px) {
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  .vouchers-container {
    h6 {
      margin-bottom: 20px;
    }
    .ant-checkbox-group {
      width: 100%;
      .vouchers-wrap {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }
    }
    .btn-see-more-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      .btn-see-more {
        background-color: ${(props) => props.theme.colors.neutral20};
        border-radius: 14px;
        padding: 10px 20px;
        color: ${(props) => props.theme.colors.surfaceHight};
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }

  .payment-method-section {
    h6 {
      margin-bottom: 20px;
    }
  }
`;

export const ContainerMenu = styled.div`
  margin-top: 4px;
  background-color: ${(props) => props.theme.colors.solidBasicNeutralV};
  padding: 12px;
  border-radius: 20px;
  .rc-virtual-list-holder-inner {
    gap: 16px;
    .ant-select-item {
      border-radius: 14px;
    }
  }
`;

export const ContainerLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`;

export const ContainerExpiredDate = styled.div`
  color: ${(props) => props.theme.colors.solidBasicRed500};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;
