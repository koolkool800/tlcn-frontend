import { styled } from 'styled-components';
import bgImg from '@assets/images/topEventBG.png';

export const Layout = styled.div`
  margin-top: 112px;
  section {
    &.background {
      background-image: url(${bgImg});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin: 0 auto;
    }
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    margin-top: 0;
  }
`;
