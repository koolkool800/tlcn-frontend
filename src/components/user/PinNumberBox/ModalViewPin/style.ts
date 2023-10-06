import { styled } from 'styled-components';

export const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 384px;
  display: flex;

  flex-direction: column;
  gap: 32px;
`;

export const ListPin = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 0.5rem;

  text-align: left;
  color: ${(props) => props.theme.colors.lightGrey};

  .pin-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  border-radius: 11.2px;
  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceSmall};
    color: ${(props) => props.theme.colors.colorHigh};
  }
  background-color: ${(props) => props.theme.colors.surfaceDark};
  white-space: nowrap;
  text-align: center;
  font-family: ${(props) => props.theme.font.variable};
  color: ${(props) => props.theme.colors.surfaceHight};
  text-align: center;
  font-size: 12px;
  line-height: 16px;
`;
