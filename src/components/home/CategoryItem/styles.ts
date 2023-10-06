import { H5 } from '@style/DefaultStyled';
import { styled } from 'styled-components';

export const Container = styled.div`
  border-radius: 60px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => props.theme.colors.gray500};
  padding: 12px 10px;
  cursor: pointer;
  width: fit-content;
  min-width: 215px;
  max-width: 248px;
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    object-fit: cover;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.lg}px) {
    width: initial;
    min-width: initial;
    max-width: initial;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    max-width: 62px;
    flex-direction: column;
    justify-content: start;
    background-color: transparent;
    padding: 0;
    width: initial;
    min-width: initial;
    max-width: initial;
    img {
      width: 62px;
      height: 62px;
    }
  }
`;

export const H5Custom = styled(H5)`
  width: auto;
  word-wrap: break-word;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
  /* max-width: 6rem; */
  text-align: center;
  text-transform: capitalize;
  overflow: auto;
  color: ${(props) => props.theme.colors.surfaceHight};
  @media (max-width: ${(props) => props.theme.breakPoint.lg}px) {
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0.4px;
    text-align: center;
  }
`;
