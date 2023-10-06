import { styled } from 'styled-components';

export const ContentWrap = styled.div`
  margin-bottom: 40px;
  .title-select-payment {
    color: ${(props) => props.theme.colors.surfaceHight};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 8px;
  }
  .payment-accounts-wrap {
    margin-left: -6px;
    margin-bottom: 16px;
  }
`;
