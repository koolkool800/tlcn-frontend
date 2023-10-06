import { styled } from 'styled-components';

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
export const ListItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 20px 16px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.neutral900};
`;
export const Item = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 16px;
  transition: all 0.2s;
  color: ${(props) => props.theme.colors.surfaceHight};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  border-radius: 8px;
  p {
    white-space: nowrap;
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: auto;
    min-width: 0;
  }
  &.active {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
  &.active * {
    color: ${(props) => props.theme.colors.primary500};
  }
  &:focus,
  &:hover,
  &:visited {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
`;

/** ** responsive for mobile */
export const ListMobile = styled.div`
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const ListItemMobile = styled.div`
  width: fit-content;
  display: flex;
`;

export const ItemMobile = styled.div`
  padding: 10px 8px;
  color: ${(props) => props.theme.colors.surfaceHight};
  white-space: nowrap;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;

  text-align: center;
  &.active {
    color: ${(props) => props.theme.colors.primary500};
    border-bottom: 1px solid ${(props) => props.theme.colors.primary500};
  }

  .item {
    flex: 1;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  }
`;
