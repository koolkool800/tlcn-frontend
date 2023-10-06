import styled from 'styled-components';

export const Wrapper = styled.div`
  .container-loading {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container-mobile-title {
    display: flex;
    justify-content: space-between;
    padding: 0 11px;
    margin-top: 10px;
  }
  .container-content {
    width: auto;
    display: flex !important;
    flex-direction: column;
    margin-top: 48px;
    .row-action {
      justify-content: space-between;
      @media only screen and (max-width: 600px) {
        flex-direction: row-reverse;
      }
    }
    justify-content: space-between;
    .box-filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 282px;
      @media screen and (max-width: 500px) {
        align-items: flex-end;
        .button {
          width: 40px;
          height: 40px;
        }
      }
    }
    .box-search {
      display: flex;
      align-items: center;
      width: 100%;
      padding-left: 10px;
      .ant-form-item {
        width: 100%;
        margin-bottom: unset;
      }
      .ant-form {
        width: 100%;
        .ant-col {
          min-height: unset;
        }
      }
    }
    .box-checkbox {
      display: flex;
      align-items: center;
      margin-bottom: unset;
      .ant-checkbox-wrapper {
        color: ${(props) => props.theme.colors.white};
        min-width: 200px;
        .ant-checkbox-checked {
          .ant-checkbox-inner {
            background-color: ${(props) => props.theme.colors.primary500};
            color: ${(props) => props.theme.colors.primary500};
            border-color: ${(props) => props.theme.colors.primary500};
          }
        }
      }
    }
    .fade-in {
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
      display: none;
    }
    .show {
      opacity: 1;
      margin-right: 24px;
      display: block;
      max-width: 282px;
    }
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    .img-wrap {
      width: 166px;
      height: 222px;
    }
    .container-mobile-title {
      padding: 20px 11px;
      p {
        font-size: 12px;
        color: ${(props) => props.theme.colors.white};
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.4px;
      }
    }
  }
`;
