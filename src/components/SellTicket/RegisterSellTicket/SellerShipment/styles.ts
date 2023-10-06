import { styled } from 'styled-components';
import { Typography as T } from '@style/DefaultStyled';
import Chip from '@components/common/Chip';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .container-button-submit {
    text-align: center;
  }
  .container-header {
    margin-bottom: 40px;
  }
  .container-body {
    font-family: ${(props) => props.theme.font.variable};
    width: 100%;
    .ant-radio {
      align-self: unset;
      .container-address {
        display: flex;
        flex-direction: column;
      }
    }
    span {
      &:nth-child(2) {
        align-self: flex-start;
      }
    }
  }
  .container-button-submit {
    margin-bottom: 70px;
    display: flex;
    justify-content: center;
  }
  .ant-radio-wrapper {
    width: 100%;
    span {
      &:has(.container-shipping) {
        width: 100%;
      }
    }
    .container-address {
      span {
        margin-top: 12px;
        margin-bottom: 12px;
        background-color: ${(props) =>
          props.theme.colors.solidLightGreenNetrual};
        color: ${(props) => props.theme.colors.solidBrightGreenNetrual};
      }
      .desc {
        color: ${(props) => props.theme.colors.surfaceMedium};
      }
    }
    .container-available {
      .ant-form-item {
        margin-top: 9px;
        margin-bottom: 12px;
      }

      .view-more {
        width: 68px;
        margin: auto;
      }
    }
    .container-shipping {
      .ant-form-item {
        margin-bottom: 16px;
      }
      .container-sender {
        margin-top: 34px;
      }
      .container-contact {
        margin-top: 34px;
        margin-bottom: 6px;
      }
      .container-address {
        margin-top: 13px;
      }
    }
  }
`;

export const Typography = styled(T)`
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes[2]}px;
  text-align: center;
  margin-bottom: 16px;
`;

export const WrapperAddress = styled.div`
  padding: 0;
  width: 100%;
  text-align: left;

  .desc {
    color: ${(props) => props.theme.colors.surfaceMedium};
  }

  .ant-radio-group {
    width: 100%;
    font-size: 14px;
    display: inline-block;
  }

  .desc-modal {
    margin-left: 32px;
  }

  .address-item {
    margin-bottom: 8px;
  }

  .tag {
    margin-top: 4px;
  }
`;
