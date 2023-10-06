import { styled } from 'styled-components';

export const CardCategory = styled.div<{ backgroundImg?: string }>`
  position: relative;
  height: 152px;
  width: 282px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  overflow: hidden;
  .overlay {
    background-image: url(${(props) => props.backgroundImg});
    background-color: ${(props) =>
      props.backgroundImg ? '' : props.theme.colors.primary500};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: grayscale(${(props) => (props.backgroundImg ? 1 : 0)});
    height: 100%;
    width: 100%;
    transition: 300ms ease-in-out all;
  }
  &:hover {
    .overlay {
      filter: grayscale(0);
      transition: 300ms ease-in-out all;
      transform: scale(1.05);
    }
  }
  p {
    position: absolute;
    color: ${(props) =>
      props.backgroundImg ? props.theme.colors.primary500 : '#000'};
    /* font-family: ${(props) => props.theme.font.bold}; */
    font-size: 32px;
    line-height: 40px;
    cursor: default;
  }
`;
