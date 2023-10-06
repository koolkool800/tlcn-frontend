import { styled } from 'styled-components';

export const Status = styled.div<{ status: string }>`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  border-radius: 16px;

  display: flex;
  align-items: center;
  height: 22px;
  justify-content: center;
  gap: 6px;

  background-color: ${(props) => {
    switch (props.status) {
      case 'PENDING':
        return 'rgba(176, 138, 0, 0.30)';
      case 'APPROVED':
        return 'rgba(4, 192, 0, 0.30)';
      default:
        return '';
    }
  }};

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${(props) => {
      switch (props.status) {
        case 'PENDING':
          return '#D8A800';
        case 'APPROVED':
          return '#04C000';
        default:
          return '';
      }
    }};
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    padding: 6px;
  }
`;

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
