import { CheckboxProps } from 'antd';
import * as S from './style';

type Props = CheckboxProps;
export type Options = {
  label: string;
  value: string;
  disabled?: boolean;
  groupName?: string;
};

const Checkbox = ({ children, ...restProps }: Props) => {
  return <S.CheckboxAnt {...restProps}>{children}</S.CheckboxAnt>;
};

export default Checkbox;
