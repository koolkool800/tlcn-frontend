import { styled } from 'styled-components';
import { Typography as T } from '@style/DefaultStyled';

export const Container = styled.div`
  display: grid;
  gap: 28px;

  .textarea {
    margin-bottom: -24px;
  }
`;

export const Typography = styled(T)`
  font-weight: 700;

  text-align: center;
`;
