import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: ${(props) =>
    `${props.theme.maxWidth + props.theme.padding * 2}px`};
  padding: ${(props) => `0 ${props.theme.padding}px`};
  margin: 0 auto;
  text-align: left;
  .ant-table-wrapper {
    padding-left: 80px;
  }
  .tbody-bg {
    background-color: ${(props) => props.theme.colors.white};
  }
  .container-chapter {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    .spacing {
      margin-left: 40px;
    }
    .spacing-level-2 {
      margin-left: 60px;
    }
    .spacing-level-3 {
      margin-left: 80px;
    }
    .spacing-level-4 {
      margin-left: 100px;
    }
  }
  @media (max-width: 767px) {
    padding: ${(props) => `0 ${props.theme.space[3]}px`};
  }

  .user-top-header {
    padding-top: 32px;
    padding-bottom: 48px;
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    .user-top-header {
      padding: 16px 0 16px 0;

      .navbar {
        padding: 0;
      }
    }
  }
`;
