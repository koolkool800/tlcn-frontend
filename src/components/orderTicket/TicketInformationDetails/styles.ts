import { styled } from 'styled-components';

export const TicketInformationDetailsWrap = styled.div`
  h6 {
    margin-bottom: 20px;
  }
  .title {
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
  .ticket-information-details {
    background-color: ${(props) => props.theme.colors.neutral20};
    padding: 18px 16px;
    border-radius: 14px;
    @media (max-width: ${(props) => props.theme.isMobile}) {
      padding: 12px;
    }
  }
  .ticket-detail {
    color: ${(props) => props.theme.colors.surfaceHight};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    @media only screen and (max-width: 600px) {
      text-align: end;
    }
    &.fw700 {
      font-weight: 700;
    }
  }

  .quantity-title,
  .quantity-detail {
    text-align: center;
  }
  .quantity-title {
    @media only screen and (max-width: 600px) {
      text-align: left;
    }
  }
  .quantity-detail {
    @media only screen and (max-width: 600px) {
      text-align: end;
    }
  }

  .into-money-title,
  .into-money-detail {
    text-align: end;
  }
  .into-money-title {
    @media only screen and (max-width: 600px) {
      text-align: left;
    }
  }
  .into-money-detail {
    @media only screen and (max-width: 600px) {
      text-align: end;
    }
  }
`;
