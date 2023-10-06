import { css, styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  &table thead .ant-table-cell {
    font-weight: 400;
    font-size: ${(props) => props.theme.fontSizes[1]};
  }

  tr td:first-child {
    border-top-left-radius: 14px;
  }
  tr td:last-child {
    border-top-right-radius: 14px;
  }

  tr td:first-child {
    border-bottom-left-radius: 14px;
  }
  tr td:last-child {
    border-bottom-right-radius: 14px;
  }

  .mobile {
    width: 100% !important;
    height: 40px;
    font-size: 15px;
  }
`;

export const Btn = styled.div<{
  bg?: string;
  border?: string | number;
  borderRadius?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  width: fit-content;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.colorHigh};
  white-space: nowrap;
  text-align: center;
  font-family: ${(props) => props.theme.font.variable};
  color: ${(props) => props.theme.colors.black};
  text-align: center;

  font-size: 12px;
  height: 32px;
  padding: 8px 16px;
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  text-transform: capitalize;
  font-size: ${(props) => props.theme.fontSizes[1]}px;

  height: 30px;
  .status {
    border-radius: 16px;
    padding: 4px 8px;
    height: 100%;
    width: fit-content;

    line-height: 22px;
  }

  .PENDING {
    color: rgba(255, 153, 51, 1);
    background-color: rgba(255, 153, 51, 0.3);
  }
  .REPLIED {
    color: rgba(51, 153, 255, 1);
    background-color: rgba(51, 153, 255, 0.3);
  }

  .mobile {
    background: none !important;
  }
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
    }

    :last-child {
      font-size: 16px;
      white-space: break-spaces;
    }

    .PENDING {
      color: rgba(255, 153, 51, 1);
    }
    .REPLIED {
      color: rgba(51, 153, 255, 1);
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
