import { styled } from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 18px;
  .container-title {
    padding: 12px 10px;
    background-color: ${(props) => props.theme.colors.surfaceDarkOutline};
    border-radius: 12px 12px 0px 0px;
  }
  .list-info {
    padding: 20px 16px;
    background-color: ${(props) => props.theme.colors.neutral20};
    border-radius: 0px 0px 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
      font-size: 16px;
      font-style: normal;
      line-height: 24px;
      font-weight: 400;
    }
    .bold {
      font-weight: 700;
    }
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    .container-title {
      h5 {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0em;
      }
    }
    .list-info {
      gap: 8px;
    }
  }
`;
