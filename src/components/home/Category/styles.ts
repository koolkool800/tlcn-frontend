import { styled } from 'styled-components';

export const CategoryWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 24px 16px;

  margin: 0 auto;
  @media (max-width: 1024px) {
    /* grid-template-columns: repeat(3, 1fr); */
    margin: 20px auto 40px;
  }

  @media (max-width: 768px) {
    grid-gap: 16px 8px;
  }
`;
