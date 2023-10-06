import Checkbox from '@components/common/Checkbox';
import { CheckboxGroup } from '@components/common/Checkbox/style';
import CustomDropdown from '@components/common/Dropdown';
import Select from '@components/common/Select';
import { DELIVERY_METHOD_OPTIONS } from '@constants/codeConstants';
import { Seat } from '@pages/BuyTicket';
import {
  findClassAndSectionID,
  findClassIdBasedZoneId,
  findClassSectionAndZoneID,
} from '@utils/customList';
import { handleResetBrightness } from '@utils/handleMap';
import { filterDataSeat } from '@utils/transferDataMap';
import { Form } from 'antd';
import { GroupType } from 'interface/event';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

type Props = {
  seat: Seat;
  groups: GroupType[];
};
const FormFilterSeat = ({ seat, groups }: Props) => {
  const { t } = useTranslation();
  const form = Form.useFormInstance();

  const [dataSeat, setDataSeat] = useState<Seat>(seat);
  useEffect(() => {
    setDataSeat(seat);
  }, [seat]);

  /**
   * the event onChange on the Select component
   * used to automatically fill value in form.Item
   * @param key
   * @param value
   * @returns {void}
   */
  const handleClassChange = (key: string, value: string) => {
    switch (key) {
      case 'classes':
        {
          form.setFieldsValue({
            classes: value,
            zones: undefined,
            floors: undefined,
            rows: undefined,
          });
          const valueFormSeat = form.getFieldsValue();
          const resData = filterDataSeat(valueFormSeat, groups);
          setDataSeat(resData);
        }
        break;
      case 'zones':
        {
          if (value) {
            const classId = findClassIdBasedZoneId(value, groups);
            form.setFieldsValue({
              classes: classId,
              zones: value,
              floors: undefined,
              rows: undefined,
            });
          } else {
            form.setFieldsValue({
              classes: form.getFieldValue('classes'),
              zones: value,
              floors: undefined,
              rows: undefined,
            });
          }
          const valueFormSeat = form.getFieldsValue();
          const resData = filterDataSeat(valueFormSeat, groups);
          setDataSeat(resData);
        }
        break;
      case 'floors':
        {
          if (value) {
            const idForm = findClassAndSectionID(value, groups);
            form.setFieldsValue({
              classes: idForm.classID,
              zones: idForm.sectionID,
              floors: value,
              rows: undefined,
            });
          } else {
            form.setFieldsValue({
              classes: form.getFieldValue('classes'),
              zones: form.getFieldValue('zones'),
              floors: value,
              rows: undefined,
            });
          }
          const valueFormSeat = form.getFieldsValue();
          const resData = filterDataSeat(valueFormSeat, groups);
          setDataSeat(resData);
        }

        break;
      case 'rows':
        if (value) {
          const idForm = findClassSectionAndZoneID(value, groups);
          form.setFieldsValue({
            classes: idForm.classID,
            zones: idForm.sectionID,
            floors: idForm.floorID,
            rows: value,
          });
        } else {
          form.setFieldsValue({
            classes: form.getFieldValue('classes'),
            zones: form.getFieldValue('zones'),
            floors: form.getFieldValue('floors'),
            rows: value,
          });

          const valueFormSeat = form.getFieldsValue();
          const resData = filterDataSeat(valueFormSeat, groups);
          setDataSeat(resData);
        }
        break;

      default:
        break;
    }
  };

  return (
    <S.WrapFilter>
      {dataSeat.class.length > 0 && (
        <Form.Item name="classes" style={{ marginBottom: 0, minWidth: 130 }}>
          <Select
            placeholder={t('buyTicket.allClass')}
            options={dataSeat.class}
            allowClear
            onChange={(value) => handleClassChange('classes', value)}
            onClear={() => handleResetBrightness()}
          />
        </Form.Item>
      )}
      {dataSeat.zone.length > 0 && (
        <Form.Item name="zones" style={{ marginBottom: 0, minWidth: 130 }}>
          <Select
            placeholder={t('buyTicket.allZone')}
            options={dataSeat.zone}
            allowClear
            onChange={(value) => handleClassChange('zones', value)}
          />
        </Form.Item>
      )}

      {dataSeat.floors.length > 0 && (
        <Form.Item name="floors" style={{ marginBottom: 0, minWidth: 130 }}>
          <Select
            placeholder={t('buyTicket.allFloor')}
            options={dataSeat.floors}
            allowClear
            onChange={(value) => handleClassChange('floors', value)}
          />
        </Form.Item>
      )}

      {dataSeat.rows.length > 0 && (
        <Form.Item name="rows" style={{ marginBottom: 0, minWidth: 130 }}>
          <Select
            placeholder={t('buyTicket.allRow')}
            options={dataSeat.rows}
            allowClear
            onChange={(value) => handleClassChange('rows', value)}
          />
        </Form.Item>
      )}

      <div style={{ minWidth: 130 }}>
        <CustomDropdown
          trigger={['click']}
          placeholder={t('buyTicket.allDeliveryMethod')}
          items={
            <Form.Item name="method">
              <CheckboxGroup>
                {DELIVERY_METHOD_OPTIONS.map((item: any) => (
                  <Checkbox value={item.value} key={item.value}>
                    {t(`buyTicket.${item.label}`)}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </Form.Item>
          }
        />
      </div>
    </S.WrapFilter>
  );
};

export default FormFilterSeat;
