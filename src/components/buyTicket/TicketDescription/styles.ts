import { styled } from 'styled-components';

export const TicketDescription = styled.div`
  .author {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 4px;
    text-transform: uppercase;
  }
  .title-transaction {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 8px;
  }
  .location {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: ${(props) => props.theme.colors.surfaceMedium};
    margin-bottom: 12px;
  }
  .date {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: ${(props) => props.theme.colors.solidBrightGreenNetrual};
    .icon {
      height: 20px;
      width: 20px;
    }
  }
`;
