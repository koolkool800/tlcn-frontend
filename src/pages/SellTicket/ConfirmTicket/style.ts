import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
  min-height: 700px;
  .section-1 {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 792px;
    margin-top: 40px;
    .container-img {
      width: 282px;
      height: 376px;
      border-radius: 10px;
      max-height: 376px;
      display: flex;
      overflow: hidden;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .container-info-text {
      .sub-text {
        margin-top: 10px;
        color: ${(props) => props.theme.colors.surfaceMedium};
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
      }
      h5 {
        text-align: left;
        margin-bottom: 5px;
      }
      padding-left: 24px;
      .container-plain-text {
        color: ${(props) => props.theme.colors.white};
        margin: 12px 0;
      }
      .container-date {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colors.solidBrightGreenNetrual};
        margin-top: 6px;
        span {
          margin-left: 7px;
        }
      }
    }
    @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
      .container-img {
        width: 113px;
        height: 150px;
        background-size: contain;
      }
    }
  }
  .section-2 {
    display: flex;
    width: 100%;
    max-width: 792px;
    padding: 20px 16px;
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.surfaceDark};
    border-radius: 10px;
    margin-top: 40px;
    flex-direction: column;
    gap: 20px;
    .text-bold {
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
    }
    .container-salePrice {
      display: flex;
      justify-content: space-between;
    }
    .container-list-fee {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .container-fee {
        color: ${(props) => props.theme.colors.surfaceMedium};
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
    }
    .container-total-fee {
      display: flex;
      justify-content: space-between;
    }
  }
  .section-3 {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 792px;
    margin-top: 40px;
    margin-bottom: 40px;
    h6 {
      margin-bottom: 12px;
    }
  }
  .container-button-submit {
    width: 100%;
    margin-bottom: 70px;
    display: flex;
    justify-content: center;
  }
  .container-modal-description {
    max-width: 200px;
    display: flex;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    margin-top: 10px;
  }
`;
