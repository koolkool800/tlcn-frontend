import { styled } from 'styled-components';

export const DeliveryInfoContainer = styled.div`
  padding: 24px 16px 24px 32px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${(props) => props.theme.colors.neutral900};
  h6 {
    font-weight: 400;
  }
  .line {
    height: 1px;
    background: ${(props) => props.theme.colors.surfaceHight};
  }
  .row {
    display: flex;
    justify-content: space-between;
    .total {
      font-weight: 700;
      color: ${(props) => props.theme.colors.primary500};
    }
    .method {
      color: ${(props) => props.theme.colors.red500};
    }
  }
  .text {
    color: ${(props) => props.theme.colors.surfaceMedium};
    margin-top: 8px;
  }
`;
