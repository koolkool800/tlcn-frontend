import Select from '@components/common/Select';
import { Option } from '@components/common/Select/style';
import { Form } from 'antd';
import Input from '@components/common/Input';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

const DetailSeatPotion = ({
  dataForm,
  classes,
  zones,
  floors,
  rows,
}: {
  dataForm: any;
  classes: any;
  zones: any;
  floors: any;
  rows: any;
}) => {
  const { t } = useTranslation();
  return (
    <S.Container>
      <Form.Item
        name="section"
        label={t('registerSellTicket.sectionLabel')}
        style={{ marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: t('registerSellTicket.sectionMessageError'),
          },
        ]}
      >
        <Select
          placeholder={t('registerSellTicket.sectionPlaceholder')}
          options={zones?.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
          disabled={!classes}
        >
          {zones?.map((option: any) => (
            <Option key={option.id} value={option.id}>
              {t('eventDetail.zone')} - {option.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="floor"
        style={{ marginBottom: 0 }}
        rules={[
          {
            required: true,
            message: t('registerSellTicket.floorMessageError'),
          },
        ]}
      >
        <Select
          placeholder={t('registerSellTicket.floorPlaceholder')}
          options={floors?.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
          disabled={!dataForm?.section}
        >
          {floors?.map((option: any) => (
            <Option key={option.id} value={option.id}>
              {t('eventDetail.floor')} - {option.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="row"
        style={{ marginBottom: 0 }}
        rules={[
          { required: true, message: t('registerSellTicket.rowMessageError') },
        ]}
      >
        <Select
          placeholder={t('registerSellTicket.rowPlaceholder')}
          options={rows?.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
          disabled={!dataForm?.floor}
        >
          {rows?.map((option: any) => (
            <Option key={option.id} value={option.id}>
              {t('eventDetail.row')} - {option.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="seat1" style={{ marginBottom: 0 }}>
        <Input placeholder={t('registerSellTicket.seatPlaceholder')} />
      </Form.Item>
    </S.Container>
  );
};

export default DetailSeatPotion;
