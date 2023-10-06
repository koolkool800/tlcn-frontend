import { styled } from 'styled-components';

export const WrapperMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0;
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
