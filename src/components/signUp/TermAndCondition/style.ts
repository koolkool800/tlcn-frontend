import { CheckboxGroup } from '@components/common/Checkbox/style';
import { styled } from 'styled-components';

export const TextRed = styled.span`
  color: ${(props) => props.theme.colors.red500};
`;

export const CheckboxGroupCustom = styled(CheckboxGroup)`
  background-color: transparent;
`;
