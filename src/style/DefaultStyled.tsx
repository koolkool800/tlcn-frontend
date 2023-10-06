import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: ${(props) =>
    `${props.theme.maxWidth + props.theme.padding * 2}px`};
  padding: ${(props) => `0 ${props.theme.padding}px`};
  margin: 0 auto;
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
export const H4 = styled.h4`
  text-align: center;
  color: ${(props) => props.theme.colors.colorHigh};
  font-family: ${(props) => props.theme.font.variable};
  font-style: normal;
  font-size: 32px;
  font-weight: 800;
  line-height: 40px;
`;
export const H5 = styled.h5`
  text-align: center;
  color: ${(props) => props.theme.colors.colorHigh};
  font-family: ${(props) => props.theme.font.variable};
  font-style: normal;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
`;
export const H6 = styled.h6`
  color: ${(props) => props.theme.colors.surfaceHight};
  font-family: ${(props) => props.theme.font.variable};
  font-style: normal;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
export const Typography = styled.p`
  color: ${(props) => props.theme.colors.surfaceHight};
  font-family: ${(props) => props.theme.font.variable};
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

export const ContainerSection = styled.section`
  background-color: transparent;
  padding: 80px 16px;
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth}px;
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    padding: 0 16px;
    .event-container {
      overflow-x: auto;
      font-size: 80px;
      scroll-behavior: smooth;
    }
  }
`;

export const TitleSectionHompage = styled.h5`
  color: #fff;
  margin-bottom: 24px;
  /* font-family: ${(props) => props.theme.font.bold}; */
  font-size: 24px;
  line-height: 32px;
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 16px;
  }
`;
export const CountNotification = styled.div`
  min-width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.colorHigh} !important;
  font-family: ${(props) => props.theme.font.variable};
  font-size: 11px;
  line-height: 18px;
  text-transform: uppercase;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.red500};
  white-space: nowrap;
  text-align: center;
`;

export const ButtonTag = styled.div`
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
  display: initial;
`;

export const NoContent = styled.div`
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.colors.white};
  height: 5rem;
  color: ${(props) => props.theme.colors.white};

  display: flex;
  justify-content: center;
  align-items: center;
`;
