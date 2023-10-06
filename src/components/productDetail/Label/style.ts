import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 8px 10px;
  background-color: ${(props) => props.theme.colors.adjoiningSeats};
  width: 165px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  margin-bottom: 16px;
  margin-top: 16px;
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    margin-bottom: 12px;
  }
`;
