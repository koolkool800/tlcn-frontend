import { styled } from 'styled-components';

export const VoucherTicketContainer = styled.div<{
  isapplied: string;
  status: number;
}>`
  border-radius: 16px;
  background-color: ${({ isapplied, theme }) =>
    isapplied === 'true' ? theme.colors.red400 : '#fff'};
  max-width: 266px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: black;
  position: relative;
  .overlay {
    position: absolute;
    background-color: ${({ status, theme }) =>
      status === 1 ? theme.colors.red400 : theme.colors.lightSolidNeutral900};
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .content-wrap {
    padding: 12px;
    border-right: 1px #121212;
    border-right-style: dashed;
    position: relative;
    .title {
      font-size: 14px;
      line-height: 22px;
      font-weight: 700;
    }
    .exp-date {
      font-size: 13px;
      line-height: 22px;
      font-weight: 700;
      color: ${(props) => props.theme.colors.red500};
    }
    .desc {
      font-size: 12px;
      line-height: 20px;
      font-weight: 400;
      letter-spacing: 0.4px;
      color: ${(props) => props.theme.colors.emphasisDarkColor};
    }
  }
  .circle {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #121212;
    position: absolute;
    &.circle-top-right {
      top: -15px;
      right: -15px;
    }
    &.circle-bottom-right {
      bottom: -15px;
      right: -15px;
    }
  }
  .action {
    padding: 6px;
    z-index: 1;
    min-width: 70px;
    button {
      color: ${(props) => props.theme.colors.red500};
      background-color: ${(props) => props.theme.colors.red450};
      padding: 8px 12px;
      border-radius: 12px;
    }
  }
`;
