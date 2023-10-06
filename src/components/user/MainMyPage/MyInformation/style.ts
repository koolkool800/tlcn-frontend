import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  .bankAccount {
    max-width: 600px;
  }

  form {
    max-width: 600px;
    min-width: 384px;
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    form {
      max-width: 100%;
      min-width: 100%;
    }
    margin-top: 24px;
  }
`;
export const EditContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;
export const BtnEdit = styled.div<{
  bg?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 8px;
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

export const PhoneNumberItem = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;

  button {
    width: fit-content;
    padding: 10px 8px;
  }
`;
