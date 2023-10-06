import styled from 'styled-components';

export const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  .container-body {
    display: flex;
    justify-content: flex-start;
    margin-top: 32px;
    .content {
      display: flex;
      margin-top: 10px;
    }
  }
  .ant-table-placeholder {
    .ant-table-cell {
      background-color: ${(props) => props.theme.colors.surfaceDarkBackground};
    }
    &:hover {
      .ant-table-cell {
        background-color: ${(props) =>
          props.theme.colors.surfaceDarkBackground} !important;
      }
    }
  }

  .ant-form-item-control-input-content {
    max-height: 200px;
    overflow-y: auto;
  }
`;
