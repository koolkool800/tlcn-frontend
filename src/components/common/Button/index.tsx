import { ButtonProps } from 'antd';
import * as S from './style';

interface PropsBtn extends ButtonProps {
  color?: string;
  bgcolor?: string;
  size?: 'small' | 'large';
  hoverbgcolor?: string;
  hoverColor?: string;
  maxwidth?: string;
}

const Button = ({
  children,
  color,
  bgcolor,
  hoverbgcolor,
  hoverColor,
  size = 'small',
  maxwidth,
  ...restProps
}: PropsBtn) => {
  const small = {
    fontSize: '15px',
    lineheight: '20px',
    padding: '10px 20px',
    borderradius: '14px',
    maxwidth,
  };
  const large = {
    fontSize: '18px',
    lineheight: '24px',
    padding: '12px 24px',
    borderradius: '16.8px',
    maxwidth,
  };
  const style = size === 'small' ? small : large;
  const styleBtn = {
    color: color || '#ffffff',
    bgcolor: bgcolor || 'rgba(255, 255, 255, 0.08)',
    hoverbgcolor: hoverbgcolor || bgcolor || 'rgba(255, 255, 255, 0.08)',
    hoverColor,
    ...style,
  };
  return (
    <S.BtnAnt {...restProps} {...styleBtn}>
      {children}
    </S.BtnAnt>
  );
};

export default Button;
