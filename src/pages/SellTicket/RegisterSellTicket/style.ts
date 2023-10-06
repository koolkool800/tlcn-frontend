import { styled } from 'styled-components';
import { H5 } from '../../../style/DefaultStyled';
import Button from '../../../components/common/Button';

export const Container = styled.div`
  margin-top: 48px;
  margin-bottom: 20px;
  .container-loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .container-pop {
    width: 100%;
    .ant-form-item-control-input-content {
      display: flex;
      justify-content: center;
      margin-top: 12px;
    }
    .content {
      display: flex;
      flex-direction: column-reverse;
      gap: 0;
      span {
        margin-bottom: 8px;
      }
    }
  }
  .item-hover {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.colors.surfaceHight};
    }
  }
  .content {
    display: grid;
    grid-template-columns: 45% 55%;
    gap: ${(props) => props.theme.paddingGrid.xl}px;

    .left {
      flex: 1;
      .image-wrap {
        width: 100%;
        max-height: 865px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 14px;
          object-fit: cover;
          /* aspect-ratio: 5/4; */
        }
      }
    }

    .right {
      flex: 1;
      .breadcrumb-wrap {
        margin-bottom: 20px;
      }
      .transaction-section {
        padding: 0 16px;
        display: flex;
        gap: ${(props) => props.theme.paddingGrid.xxl}px;
        flex-direction: column;
        margin-bottom: 40px;
      }
      .container-method-description {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: -40px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    .content {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const Header = styled(H5)`
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const BtnNext = styled(Button)`
  max-width: 384px;
  margin: auto;
  background-color: ${(props) => props.theme.colors.primary500};
  color: ${(props) => props.theme.colors.black} !important;

  &:hover {
    opacity: 1;
  }
  &:disabled {
    opacity: 0.4;
    background-color: ${(props) => props.theme.colors.primary500};
    color: ${(props) => props.theme.colors.black} !important;
  }
`;

export const ContainerLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  .container-info-coupon {
    max-width: 200px;
    white-space: break-spaces;
  }
`;

export const ContainerExpiredDate = styled.div`
  color: ${(props) => props.theme.colors.solidBasicRed500};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
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

export const ContainerRegisterSellTicket = styled.div`
  width: 100%;
  max-width: ${(props) =>
    `${props.theme.maxWidth + props.theme.padding * 2}px`};
  padding: ${(props) => `0 ${props.theme.padding}px`};
  margin: 0 auto;
  color: ${(props) => props.theme.colors.black};
  @media (max-width: 767px) {
    padding: 0 0;
  }
`;
