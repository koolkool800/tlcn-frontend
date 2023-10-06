import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    h5 {
      display: none;
    }
  }
`;

export const Header = styled.div`
  .mobile {
    display: none;
  }
  @media (max-width: ${(props) => props.theme.isMobile}) {
    .mobile {
      display: block;
      margin-bottom: 14px;

      font-size: 24px;
    }
    .desktop {
      display: none;
    }
  }
`;
