import { styled } from 'styled-components';

export const Wrapper = styled.div`
  .ant-form {
    margin-top: 38px;
    max-width: 600px;
    min-width: 384px;
    .ant-form-item:not(.container-name, .container-phone-number) {
      margin-bottom: 16px;
    }
    .container-name {
      margin-bottom: 34px;
    }
    .container-phone-number {
      margin-bottom: 34px;
    }

    .ant-form-item-explain-error {
      text-align: left;
      word-wrap: break-word;
    }

    @media (max-width: ${(props) => props.theme.isMobile}) {
      max-width: 100%;
      min-width: 100% !important;
    }
  }
`;

export const SwitchWrapper = styled.div`
  display: inline-flex;
  align-items: start;
  justify-content: start;
  width: 100%;
  gap: 8px;
`;
