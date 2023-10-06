import { Form, Switch } from 'antd';
import { useRef } from 'react';
import * as S from './style';

type Props = {
  defaultChecked?: boolean;
  label?: string | JSX.Element;
};

function SwitchCustom({ defaultChecked, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onTrigger = () => {
    if (ref.current) ref.current.click();
  };

  return (
    <S.Wrapper>
      <Form.Item name="isDefault">
        <Switch ref={ref} defaultChecked={!!defaultChecked} />
      </Form.Item>
      {label && (
        <div className="content" aria-hidden="true" onClick={onTrigger}>
          {label}
        </div>
      )}
    </S.Wrapper>
  );
}

export default SwitchCustom;
