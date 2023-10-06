import { Form, Typography } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import CheckboxCustom from '../../common/Checkbox';
import DatePickerCustom from '../../common/Datepicker';
import Input from '../../common/Input';

const { Title } = Typography;

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current < dayjs().endOf('day');
};

function ProductInfo() {
  const { t } = useTranslation();

  return (
    <>
      <Title level={5}>{t('onsiteTicket.productInformation')}</Title>
      <Form.Item
        label={t('onsiteTicket.eventName')}
        name="eventName"
        required
        rules={[
          {
            required: true,
            message: t('common.required', {
              field: t('onsiteTicket.eventName'),
            }),
          },
        ]}
      >
        <Input
          allowClear
          type="input"
          placeholder={t('common.placeholder', {
            field: t('onsiteTicket.eventName'),
          })}
        />
      </Form.Item>
      <Form.Item
        label={t('onsiteTicket.performer')}
        name="performer"
        rules={[
          {
            required: true,
            message: t('common.required', {
              field: t('onsiteTicket.performer'),
            }),
          },
        ]}
      >
        <Input
          allowClear
          type="input"
          placeholder={t('common.placeholder', {
            field: t('onsiteTicket.performer'),
          })}
        />
      </Form.Item>
      <Form.Item
        label={t('onsiteTicket.place')}
        name="place"
        rules={[
          {
            required: true,
            message: t('common.required', {
              field: t('onsiteTicket.place'),
            }),
          },
        ]}
      >
        <Input
          allowClear
          type="input"
          placeholder={t('common.placeholder', {
            field: t('onsiteTicket.place'),
          })}
        />
      </Form.Item>
      <DatePickerCustom
        disabledDate={disabledDate}
        name="performanceDate"
        label={t('onsiteTicket.performerDate')}
        placeholder={t('common.placeholder', {
          field: t('onsiteTicket.performerDate'),
        })}
        rules={[
          {
            required: true,
            message: t('common.required', {
              field: t('onsiteTicket.performerDate'),
            }),
          },
        ]}
      />
      <Form.Item
        label={t('onsiteTicket.seatInformation')}
        name="seatInformation"
        rules={[
          {
            required: true,
            message: t('common.required', {
              field: t('onsiteTicket.seatInformation'),
            }),
          },
        ]}
      >
        <Input
          allowClear
          type="input"
          placeholder={t('common.placeholder', {
            field: t('onsiteTicket.seatInformation'),
          })}
        />
      </Form.Item>
      <Form.Item valuePropName="checked" name="isObstructed" required>
        <CheckboxCustom>{t('onsiteTicket.obstructedView')}</CheckboxCustom>
      </Form.Item>
    </>
  );
}

export default ProductInfo;
