import { styled } from 'styled-components';

export const Container = styled.div`
  .description {
    margin-bottom: 20px;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    .ant-row {
      display: unset;
    }
  }
`;

export const BoxItemType: { [key: string]: string } = {
  purple: 'purple',
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
};

export const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.paddingGrid.md}px;
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${(props) => props.theme.paddingGrid.xs}px;
  }
`;

export const BoxItem = styled.div<{ type: string }>`
  padding: 16px;
  border-radius: 8px;
  background-color: #252525;
  border-bottom: 8px ${(props) => props.type} solid;
  cursor: pointer;
  min-width: 166px;
  min-height: 68px;
  .price {
    font-size: 15px;
    font-weight: 700;
    font-family: ${(props) => props.theme.font.variable};

    color: ${(props) => props.theme.colors.white};
  }

  .desc {
    margin-top: 8px;
    font-family: ${(props) => props.theme.font.variable};
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.88);
  }
`;
