import { styled } from 'styled-components';

export const Tabs = styled.div`
  display: flex;
  gap: 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.surfaceSmall};
  transition: opacity 0.3s;
  margin-bottom: 8px;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    border-bottom: 0px;
    gap: 4px;
  }
`;
export const Tab = styled.div`
  padding: 12px 16px;
  font-size: 15px;
  line-height: 20px;
  font-family: ${(props) => props.theme.font.variable};
  color: ${(props) => props.theme.colors.surfaceMedium};
  outline: none;
  transition: opacity 0.3s;
  &:hover,
  &.active {
    border-radius: 1px;
    border-bottom: 1px solid ${(props) => props.theme.colors.primary500};
    color: ${(props) => props.theme.colors.surfaceHight};
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    &.active {
      border-radius: 1px;
      border-bottom: 0px;
      background-color: ${(props) => props.theme.colors.primarySolid100};
      border-radius: 34px;
      padding: 10px;
    }

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    letter-spacing: 0.4px;
  }
`;
