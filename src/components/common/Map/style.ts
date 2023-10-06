import { styled } from 'styled-components';

export const Wrapper = styled.div`
  svg {
    width: 100%;
    @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
      height: 300px;
    }
  }
  .react-transform-wrapper {
    width: 100%;
    .react-transform-component {
      width: 100%;
      justify-content: center;
    }
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    svg {
      width: 100%;
      height: 50vh;
    }
    .react-transform-wrapper {
      width: 100%;
      .react-transform-component {
        width: 100%;
        & > div {
          margin: 0 auto;
          width: 100%;
        }
      }
    }
  }
`;
