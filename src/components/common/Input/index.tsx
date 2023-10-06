import { InputProps, InputRef } from 'antd';
import { Eye, EyeSlash } from 'iconsax-react';
import { Ref, forwardRef } from 'react';
import * as S from './style';

interface Props extends InputProps {
  type?: 'input' | 'password' | 'search';
  placeholder: string;
}
const Input = (
  { type = 'input', placeholder, ...restProps }: Props,
  ref: Ref<InputRef>
) => {
  return (
    <>
      {type !== 'password' ? (
        <S.InputAnt ref={ref} {...restProps} placeholder={placeholder} />
      ) : (
        <S.InputPassAnt
          ref={ref}
          {...restProps}
          placeholder={placeholder}
          iconRender={(visible: boolean) =>
            visible ? <Eye size="20" /> : <EyeSlash size="20" />
          }
        />
      )}
    </>
  );
};

export default forwardRef(Input);
