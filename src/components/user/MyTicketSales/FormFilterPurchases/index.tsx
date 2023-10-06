import { Form } from 'antd';
import { SearchNormal1 } from 'iconsax-react';
import userService from '@services/userService';
import { useEffect } from 'react';
import {
  DELIVERY_CODE,
  LIST_DELIVERY_MAP,
  LIST_TRANSACTION_MAP,
  TRANSACTION_CODE,
} from '../../../../constants/codeConstants';
import theme from '../../../../style/themes/default';
import Checkbox from '../../../common/Checkbox';
import { CheckboxGroup } from '../../../common/Checkbox/style';
import Chip from '../../../common/Chip';
import DatePickerCustom from '../../../common/Datepicker';
import CustomDropdown from '../../../common/Dropdown';
import Input from '../../../common/Input';
import * as S from './style';

const checkActive = (deliveryMethod: any, transactionMethod: any) => {
  if (
    (deliveryMethod && deliveryMethod.length > 0) ||
    (transactionMethod && transactionMethod.length > 0)
  ) {
    return true;
  }
  return false;
};
const FormFilterPurchases = () => {
  const [form] = Form.useForm();
  const deliveryValueFiled = Form.useWatch('deliveryMethod', form);
  const transactionValueFiled = Form.useWatch('transactionMethod', form);

  const defaultValue = {
    name: '',
  };
  const onValuesChange = (changedValues: any, allValues: any) => {
    console.log('Success:', changedValues);
  };
  const handleUpdateFields = (name: string, valueCurrent: string) => {
    const newData = form
      .getFieldValue(name)
      ?.filter((val: string) => val !== valueCurrent);
    form.setFieldsValue({ [name]: newData });
  };

  /** Load data  */
  const loadData = async () => {
    try {
      const response = await userService.getOrdersSales();
      console.log('my res', response);
    } catch (err) {
      /* empty */
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ minWidth: '100%' }}
      initialValues={defaultValue}
      onValuesChange={onValuesChange}
    >
      <S.Container>
        <Form.Item name="name" style={{ margin: 0, width: '100%' }}>
          <Input
            allowClear
            placeholder="Enter a key word"
            prefix={<SearchNormal1 size="20" color="#FFFFFF" />}
          />
        </Form.Item>
        <S.Wrap>
          <DatePickerCustom name="startDate" placeholder="From" mb="0" />

          <DatePickerCustom name="endDate" placeholder="To" mb="0" />

          <CustomDropdown
            trigger={['click']}
            placeholder="Delivery method"
            items={
              <Form.Item
                name="deliveryMethod"
                style={{ margin: 0 }}
                validateTrigger={['onChange', 'onBlur']}
              >
                <CheckboxGroup
                  style={{
                    backgroundColor: `${theme.colors.surfaceDarkBackground}`,
                    borderRadius: 14,
                  }}
                >
                  {LIST_DELIVERY_MAP.map((item) => (
                    <Checkbox key={item.value} value={item.value}>
                      {item.label}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </Form.Item>
            }
          />

          <CustomDropdown
            trigger={['click']}
            placeholder="Transaction method"
            items={
              <Form.Item name="transactionMethod" style={{ margin: 0 }}>
                <CheckboxGroup
                  style={{
                    backgroundColor: `${theme.colors.surfaceDarkBackground}`,
                    borderRadius: 14,
                  }}
                >
                  {LIST_TRANSACTION_MAP.map((item) => (
                    <Checkbox key={item.value} value={item.value}>
                      {item.label}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </Form.Item>
            }
          />
        </S.Wrap>
        <div>
          {deliveryValueFiled &&
            deliveryValueFiled.map((value: string) => (
              <Chip
                key={value}
                onClose={() => handleUpdateFields('deliveryMethod', value)}
              >
                {DELIVERY_CODE[value]}
              </Chip>
            ))}
          {transactionValueFiled &&
            transactionValueFiled.map((value: string) => (
              <Chip
                key={value}
                onClose={() => handleUpdateFields('transactionMethod', value)}
              >
                {TRANSACTION_CODE[value]}
              </Chip>
            ))}

          {checkActive(deliveryValueFiled, transactionValueFiled) && (
            <Chip
              clearAll
              onClick={() => {
                form.setFieldsValue({
                  deliveryMethod: '',
                });
                form.setFieldsValue({
                  transactionMethod: '',
                });
              }}
            >
              Clear all
            </Chip>
          )}
        </div>
      </S.Container>
    </Form>
  );
};

export default FormFilterPurchases;
