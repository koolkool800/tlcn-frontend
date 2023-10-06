import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    gap: 24px;
  }
`;
