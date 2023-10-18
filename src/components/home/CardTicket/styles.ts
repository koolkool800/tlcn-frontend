import { styled } from 'styled-components';

export const CardTicket = styled.div`
  width: 282px;
  border-radius: 14px 14px 0 0;

  cursor: pointer;

  .img-wrap {
    border-radius: 14px;
    margin-bottom: 16px;
    background-color: ${(props) => props.theme.colors.neutral20};
    width: 282px;
    height: 376px;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: transform 0.2s ease-out;
      &:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease-out;
      }
    }
  }
  .bottom-content {
    .title {
      /* font-family: ${(props) => props.theme.font.bold}; */
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
      margin-bottom: 2px;

      overflow: hidden;
      text-overflow: '----';
      white-space: nowrap;
    }
    .location {
      /* font-family: ${(props) => props.theme.font.regular}; */
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 8px;
      color: #ffffffa3;

      overflow: hidden;
      text-overflow: '----';
      white-space: nowrap;
    }
    .price {
      /* font-family: ${(props) => props.theme.font.bold}; */
      font-size: 16px;
      line-height: 24px;
      color: ${(props) => props.theme.colors.primary500};
    }
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    width: 254px;
    border-radius: 14px;

    .img-wrap {
      border-radius: 14px;
      margin-bottom: 16px;
      background-color: ${(props) => props.theme.colors.neutral20};
      width: 100%;
      height: 340px;
      img {
        height: 100%;
        object-fit: fill;
      }
    }
    .title {
      font-size: 14px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
    }
    .location {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
    }
    .price {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
`;
