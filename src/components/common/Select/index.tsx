import { SelectProps, Spin } from 'antd';
import { BaseOptionType, DefaultOptionType } from 'antd/es/select';
import { ArrowDown2 } from 'iconsax-react';
import * as S from './style';

export interface PropsSelect extends SelectProps<any, BaseOptionType> {
  width?: number | string | undefined;
  options?: (BaseOptionType | DefaultOptionType)[];
  loadingVoucher?: boolean;
}
const Select = ({
  width,
  options = [],
  loadingVoucher,
  children,
  ...restProps
}: PropsSelect) => {
  if (children) {
    return (
      <S.AntSelect
        {...restProps}
        width={width}
        suffixIcon={loadingVoucher ? <Spin /> : <ArrowDown2 size="20" />}
      >
        {children}
      </S.AntSelect>
    );
  }
  return (
    <S.AntSelect
      {...restProps}
      width={width}
      options={options}
      suffixIcon={loadingVoucher ? <Spin /> : <ArrowDown2 size="20" />}
    />
  );
};

export default Select;
