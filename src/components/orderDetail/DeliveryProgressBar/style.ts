import { styled } from 'styled-components';

export const DeliveryProgressContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  .progress-wrap {
    width: 100%;
    display: flex;
    gap: 4px;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    overflow: auto;
    .progress-wrap {
      width: fit-content;
      overflow: auto;
    }
  }
`;

export const Step = styled.div<{ isActive: boolean }>`
  width: 100%;
  &:first-child {
    .status-bar {
      border-radius: 4px 0px 0px 4px;
    }
  }
  &:last-child {
    .status-bar {
      border-radius: 0px 4px 4px 0px;
    }
  }
  p {
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.primary500 : theme.colors.surfaceSmall};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 16px;
  }
  .status-bar {
    height: 8px;
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.primary500 : theme.colors.surfaceSmall};
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    width: fit-content;
    p {
      white-space: nowrap;
    }
  }
`;
