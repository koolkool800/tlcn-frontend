import { styled } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  .btn-showMore {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  text-align: left;
  .address-item-detail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    text-align: left;

    .name {
      color: ${(props) => props.theme.colors.surfaceHight};
      font-family: ${(props) => props.theme.font.variable};
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
    .address {
      color: ${(props) => props.theme.colors.surfaceMedium};
      font-family: ${(props) => props.theme.font.variable};
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
  }
`;
