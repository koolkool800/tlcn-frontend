import styled from 'styled-components';

export const SliderWrapper = styled.div`
  position: relative;
  max-height: 480px;
  height: 100%;
  width: 100%;
  .slick-slider {
    height: 100%;
    overflow: hidden;
    .slick-list {
      height: 100%;
    }
    .slick-dots {
      bottom: 0;
    }

    .item-slider {
      display: flex !important;
      width: 100%;
      height: 100%;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        max-height: 480px;
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    margin-bottom: 40px;
    max-height: 375px;
    .slick-slider {
      overflow: hidden;
      .slick-list {
        height: 100%;
      }
      .slick-dots {
        bottom: 0;
      }
      .item-slider {
        display: flex !important;
        width: 100%;
        height: 100%;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          max-height: 200px;
        }
      }
    }
  }
`;

export const containerPreviousBtn = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 10px;
  opacity: 0.5;
  border-radius: 22px;
  transition: opacity 0.5s ease-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }

  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    display: none;
  }
`;

export const containerNextBtn = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  right: 10px;
  border-radius: 22px;
  opacity: 0.5;
  transition: opacity 0.5s ease-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }

  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    display: none;
  }
`;
