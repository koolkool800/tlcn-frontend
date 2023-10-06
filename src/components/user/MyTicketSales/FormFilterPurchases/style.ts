import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
export const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  > * {
    width: 25% !important;
  }
`;
