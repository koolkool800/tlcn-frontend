import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 690px;
  margin: 0 auto;

  h5 {
    font-size: 24px;
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    gap: 16px;
  }
`;
export const Header = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 12px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.surfaceMedium};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 12px;
`;
export const IsRead = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.theme.colors.red500};
  border-radius: 50%;
`;

export const ItemMeta = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  max-width: 100%;
  width: 100%;
  .meta-date {
    margin-inline-end: 40px;
    width: 85px;
    display: block;
    word-wrap: break-word;
  }
`;
export const Item = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-radius: 14px;
    background-color: ${(props) => props.theme.colors.surfaceDark};

    cursor: pointer;
  }
  color: ${(props) => props.theme.colors.surfaceHight};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 16px;
  line-height: 24px;

  &.isRead {
    color: ${(props) => props.theme.colors.surfaceSmall};
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
      max-width: 40%;
    }

    :last-child {
      font-size: 16px;
      white-space: break-spaces;
    }

    .title {
      display: flex;
      align-items: center;
      gap: 8px;
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
