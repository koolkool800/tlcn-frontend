import { Form } from 'antd';
import dayjs from 'dayjs';
import { ObjectLiteral } from 'interface/general';
import { useTranslation } from 'react-i18next';
import DatePickerCustom from '../../../common/Datepicker';
import * as S from './style';

type Props = {
  onChange?: (date: string) => void;
};

const FormFilterWithdrawal = ({ onChange }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onValuesChange = (
    changedValues: ObjectLiteral,
    allValues: ObjectLiteral
  ) => {
    if (allValues?.from && allValues?.to) {
      const from = dayjs(allValues?.from).format('YYYY-MM-DD');
      const to = dayjs(allValues?.to).format('YYYY-MM-DD');

      if (onChange) {
        onChange(`from:${from},to:${to}`);
      }
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ minWidth: '100%' }}
      onValuesChange={onValuesChange}
    >
      <S.Container>
        <S.Wrap>
          <DatePickerCustom
            name="from"
            placeholder={t('user.fromDate')}
            mb="0"
          />
          <DatePickerCustom name="to" placeholder={t('user.toDate')} mb="0" />
        </S.Wrap>
      </S.Container>
    </Form>
  );
};

export default FormFilterWithdrawal;
