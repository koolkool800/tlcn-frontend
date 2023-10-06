import { styled } from 'styled-components';

export const Wrapper = styled.div`
  .header-production {
    margin-bottom: 48px;
  }
  .container-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .breadCrumb-wrap {
      margin-top: 10px;
    }
    .container-instant-price {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
      .price {
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        color: ${(props) => props.theme.colors.lightGreen};
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    .header-production {
      display: none;
    }
    .product-seat-info {
      margin-bottom: 8px;
    }
    .container-map {
      margin-bottom: 20px;
    }
    .container-instant-price {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .price {
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        color: ${(props) => props.theme.colors.lightGreen};
      }
    }
  }
`;
export const ButtonSubmitFormBuyTicket = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .btn-payment {
    min-width: 272px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: ${(props) => props.theme.colors.purple200};
    padding: 14px;
    border-radius: 19.6px;
    cursor: pointer;
    transition: opacity ease-out 0.2s;
    span {
      font-size: 21px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      color: #000;
    }
    &:hover {
      opacity: 0.4;
      transition: opacity ease-out 0.2s;
    }
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    width: 100%;
    .btn-payment {
      margin-top: 20px;
      border-radius: 22.4px;
    }
  }
`;
