import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .action-back {
    display: none;
  }
  @media (max-width: ${(props) => props.theme.isMobile}) {
    gap: 24px;

    h5 {
      font-size: 24px;
    }

    .action-back {
      display: block;
    }
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    gap: 0;
    .ant-tabs-top > .ant-tabs-nav::before {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .ant-tabs .ant-tabs-tab {
      margin: 0 24px 0 0;
      padding: 8px 10px;
    }

    .ant-tabs-nav .ant-tabs-nav-list {
      gap: 0px;
      padding-bottom: 8px;
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Text = styled.div<{
  color: string;
}>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.theme.font.variable};
  font-style: normal;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
`;
export const Default = styled.div`
  color: ${(props) => props.theme.colors.primary500};
  font-family: ${(props) => props.theme.font.variable};
  font-style: normal;
  text-align: center;
  padding: 6px;
  font-size: 9px;
  font-weight: 400;
  line-height: 12px;
  border-radius: 8.4px;
  border-radius: 8.4px;
  background: rgba(83, 246, 198, 0.08);
`;

export const TabWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

export const Search = styled.div`
  width: 100%;
  .desktop {
    width: 100%;
  }
  .mobile {
    display: none;
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
  }
`;
