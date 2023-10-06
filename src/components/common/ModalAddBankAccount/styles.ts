import { Typography } from '@style/DefaultStyled';
import { styled } from 'styled-components';
import Button from '../Button';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;

  text-align: left;
`;

export const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const Title = styled(Typography)`
  color: ${(props) => props.theme.colors.surfaceHight};
`;

export const ChangeAction = styled(Typography)`
  color: ${(props) => props.theme.colors.primary500};
`;

export const AddNewBankAccount = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.surfaceHight};
  width: fit-content;
`;
