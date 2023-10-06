import { styled } from 'styled-components';

export const ContainerPinReceived = styled.div`
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
`;

export const Action = styled.div`
  display: inline-flex;
  gap: 4px;
`;
export const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  border-radius: 11.2px;
  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceSmall};
    color: ${(props) => props.theme.colors.colorHigh};
  }
  background-color: ${(props) => props.theme.colors.surfaceDark};
  white-space: nowrap;
  text-align: center;
  font-family: ${(props) => props.theme.font.variable};
  color: ${(props) => props.theme.colors.surfaceHight};
  text-align: center;
  font-size: 12px;
  line-height: 16px;
`;

export const WrapperMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const WrapperMobileItem = styled.div`
  .item {
    display: flex;
    justify-content: space-between;

    :first-child {
      color: ${(props) => props.theme.colors.surfaceMedium};
      max-width: 40%;
    }

    :last-child {
      font-size: 16px;
      white-space: break-spaces;
    }
  }

  display: flex;
  flex-direction: column;
  gap: 12px;

  background-color: ${(props) => props.theme.colors.neutral20};
  padding: 16px;
  border-radius: 8px;

  color: ${(props) => props.theme.colors.surfaceHight};
`;
