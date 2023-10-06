import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 0 16px;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    padding: 0px;
  }
`;
export const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    gap: 16px;
    flex-direction: column;
  }
`;
