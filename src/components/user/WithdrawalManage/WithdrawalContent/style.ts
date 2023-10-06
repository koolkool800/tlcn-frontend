import Button from '@components/common/Button';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    display: flex;
    flex-direction: column-reverse;
  }
`;
export const WrapColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const Left = styled(WrapColumn)`
  gap: 12px;
  padding-left: 16px;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    padding-left: 0px;
  }
`;
export const WithdrawAmount = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.surfaceMedium};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 16px;
  line-height: 24px;
`;
export const Right = styled(WrapColumn)`
  gap: 12px;
  padding-right: 16px;
`;
export const Ul = styled.ul`
  padding-left: 24px;
  li {
    color: ${(props) => props.theme.colors.surfaceHight};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 16px;
    line-height: 24px;
  }
`;
export const B1 = styled.div`
  color: ${(props) => props.theme.colors.colorHigh};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 16px;
  line-height: 24px;
`;

export const AddNewBankAccount = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.surfaceHight};
  width: fit-content;
`;

export const BankInformation = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  button {
    width: fit-content;
    padding: 10px 8px;
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    button {
      height: 32px;
    }
  }
`;
