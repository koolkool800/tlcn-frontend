import { styled } from 'styled-components';

export const TabsContainer = styled.div`
  .tab-cards-wrap {
    display: flex;
    gap: 12px;
  }
`;
export const TabsCard = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${(props) => props.theme.colors.neutral900};
  padding: 12px 24px;
  border-radius: 14px;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  transition: all 0.3s;
  border: 1px solid transparent;

  cursor: pointer;
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.primary500};
  }
  &.tab-active {
    background-color: ${(props) => props.theme.colors.primary500};
    color: #000;
    transition: all 0.3s;
  }
`;
export const TabCardContent = styled.div`
  display: none;
  &.tab-active {
    display: block;
  }
`;
