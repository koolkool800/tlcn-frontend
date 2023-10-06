import styled from 'styled-components';

export const SliderWrapper = styled.div`
  @keyframes slideInRight {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  position: relative;
  max-height: 700px;

  .slick-slider {
    height: 100%;
    overflow: hidden;
    .slick-list {
      height: 100%;
    }
    .slick-prev {
      left: 0px;
      z-index: 1;
    }
    .slick-next {
      right: 0;
    }

    .slick-dots li {
      margin: 0 1px !important;
    }

    .item-slider {
      display: flex !important;
      .img-bg {
        width: 100%;
        height: 700px;
        max-height: 700;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .slick-dots {
      display: flex;
      gap: 4px;
      align-items: center;
      position: absolute;
      bottom: 2px;
      margin-top: 20px;
      left: 0px;
      right: 0px;
      transition: bottom 0.3s ease;
      max-height: 400px;
      width: max-content;
      padding: 0 16px 14px 16px;
      margin-left: auto;
      margin-right: auto;
      li {
        margin: 0 0;
      }
      .slick-active {
        border-top: solid 4px #53f6c6;

        img {
          margin-top: 20px;
        }
        .container-paging {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item-active {
          filter: grayscale(0) !important;
        }
      }
      &:before {
        content: '';
        position: absolute;
        opacity: 0.2;
        top: 0;
        left: 0;
        background-color: #171516;
        width: 100%;
        height: 100%;
        border-radius: 14px;
      }
      &:after {
        content: '';
        position: absolute;
        top: -30px;
        width: 100%;
        left: 0;
        height: 30px;
      }
      li {
        position: relative;
        width: 80px;
        opacity: 1;
        .container-paging {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            font-family: Arial, Helvetica, sans-serif;
            position: absolute;
            top: -40px;
            color: #ffff;
            font-weight: bold;
          }
          .img-container {
            background-size: cover;
            margin-top: 14px;
            max-width: 70px;
            border-radius: 14px;
            filter: grayscale(1);
            min-height: 100px;
            width: 100%;
            background-position: center center;
            transition: filter 0.5s ease-in-out;
            &:hover {
              filter: grayscale(0) !important;
            }
          }
        }
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    height: fit-content;
    max-height: 375px;
    position: relative;
    .slick-slider .item-slider .img-bg {
      width: 100%;
      height: 375px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: cover;
    }
    .slick-slider {
      .slick-dots {
        display: none !important;
      }
    }
    .container-index {
      padding: 10px;
      border-radius: 4rem;
      background-color: ${(props) => props.theme.colors.emphasisDarkColor};
      color: ${(props) => props.theme.colors.white};
      position: absolute;
      display: flex;
      right: 4px;
      bottom: 4px;
    }
  }
  @media (min-width: 1950px) {
    display: flex;
    justify-content: center;
    .slick-slider {
      max-width: 1240px;
      width: 100%;
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
