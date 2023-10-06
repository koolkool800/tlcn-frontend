import { styled } from 'styled-components';

export const TopEventSection = styled.div`
  background-color: transparent;
  margin-bottom: 80px;
  .ant-empty-description {
    color: ${(props) => props.theme.colors.white};
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    margin-bottom: 40px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SeeMore = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  cursor: pointer;

  span {
    color: ${(props) => props.theme.colors.emphasisDarkSurfaceHigh};
    font-size: ${(props) => props.theme.fontSizes[0]}px;
  }

  svg {
    color: ${(props) => props.theme.colors.emphasisDarkSurfaceHigh};
    transform: rotate(-90deg);
    width: 16px;
    height: 16px;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    span {
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: center;
    }
  }
`;
