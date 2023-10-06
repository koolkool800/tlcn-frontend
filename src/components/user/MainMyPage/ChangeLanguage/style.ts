import { styled } from 'styled-components';

export const Container = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 24px;

  .ant-space-item {
    margin-bottom: 2px;
  }
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const BtnEdit = styled.div<{
  bg?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: ${(props) => props.bg};
  font-family: ${(props) => props.theme.font.variable};
  color: ${(props) => props.theme.colors.surfaceHight};
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  width: fit-content;
  border-radius: 11.2px;
  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
`;

export const OptionContent = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  img {
    margin-top: 4px;
  }
`;
