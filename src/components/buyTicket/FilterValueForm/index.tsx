import Chip from '@components/common/Chip';
import { SEAT_TRANSACTION_TYPE } from '@constants/codeConstants';
import { Seat } from '@pages/BuyTicket';
import { handleResetBrightness } from '@utils/handleMap';
import { Form, Grid } from 'antd';
import { FormEventFilter } from 'interface/event';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

type Props = {
  seat: Seat;
  setFieldValue: (fieldName: string, newValue: any) => void;
  resetFormFields: () => void;
};

const FilterValueForm = ({ seat, setFieldValue, resetFormFields }: Props) => {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const { xs } = Grid.useBreakpoint();
  const { isObstructed, method, ...resFields } =
    Form.useWatch<FormEventFilter>([], form) || {};
  // //  used to check active value form when filter
  const isValidFields = Object.keys(resFields).some((field) => {
    const fieldName = field as keyof typeof resFields;
    return resFields[fieldName] || (method && method.length > 0);
  });

  /**
   * used to render value field current
   * @param fieldName field name current
   * @param idField value form current
   * @returns {string}
   */
  const renderValue = (fieldName: string, valueFieldCurrent: any): string => {
    switch (fieldName) {
      case 'classes':
        return (
          seat.class.find((classItem) => classItem.value === valueFieldCurrent)
            ?.label ?? ''
        );

      case 'zones':
        return (
          seat.zone.find((classItem) => classItem.value === valueFieldCurrent)
            ?.label ?? ''
        );

      case 'floors':
        return (
          seat.floors.find((classItem) => classItem.value === valueFieldCurrent)
            ?.label ?? ''
        );

      case 'rows':
        return (
          seat.rows.find((classItem) => classItem.value === valueFieldCurrent)
            ?.label ?? ''
        );

      default:
        return '';
    }
  };

  /**
   * event when click close on the Chip component
   * @param fieldName field name current
   * @param idField value form current
   * @returns {void}
   */
  const handleClose = (fieldName: string): void => {
    switch (fieldName) {
      case 'classes':
        form.setFieldsValue({
          classes: undefined,
          zones: undefined,
          floors: undefined,
          rows: undefined,
        });
        setFieldValue('classes', undefined);
        handleResetBrightness();
        break;

      case 'zones':
        form.setFieldsValue({
          classes: form.getFieldValue('classes'),
          zones: undefined,
          floors: undefined,
          rows: undefined,
        });

        setFieldValue('zones', undefined);
        break;

      case 'floors':
        form.setFieldsValue({
          classes: form.getFieldValue('classes'),
          zones: form.getFieldValue('zones'),
          floors: undefined,
          rows: undefined,
        });
        setFieldValue('floors', undefined);

        break;
      case 'rows':
        form.setFieldsValue({
          classes: form.getFieldValue('classes'),
          zones: form.getFieldValue('zones'),
          floors: form.getFieldValue('floors'),
          rows: undefined,
        });
        setFieldValue('rows', undefined);

        break;

      default:
        break;
    }
  };

  /**
   * used render data seat form
   * @returns {ReactNode}
   */
  const renderValueForm = (): ReactNode => {
    return Object.keys(resFields).map((key) => {
      const fieldName = key as keyof typeof resFields;
      const valueCurrent = resFields[fieldName];
      const content = renderValue(fieldName, valueCurrent);
      if (fieldName && valueCurrent) {
        return (
          <Chip key={key} onClose={() => handleClose(fieldName)}>
            {content}
          </Chip>
        );
      }
      return '';
    });
  };

  /**
   * used render delivery method
   * @returns {ReactNode}
   */
  const renderDeliveryMethod = (): ReactNode => {
    return (
      <>
        {method &&
          method.map((value: any) => {
            const key = value as keyof typeof SEAT_TRANSACTION_TYPE;
            return (
              <Chip
                key={value.toString()}
                onClose={() => {
                  const data = form
                    .getFieldValue('method')
                    .filter((i: string) => i !== value);
                  setFieldValue('method', data);
                }}
              >
                {t(`buyTicket.${SEAT_TRANSACTION_TYPE[key]}`)}
              </Chip>
            );
          })}
      </>
    );
  };

  return (
    <>
      {isValidFields && (
        <S.Wrapper>
          <>
            {!xs && renderValueForm()}
            {renderDeliveryMethod()}

            {!xs && (
              <Chip
                clearAll
                onClick={() => {
                  resetFormFields();
                  handleResetBrightness();
                }}
              >
                {t('buyTicket.clearAll')}
              </Chip>
            )}
          </>
        </S.Wrapper>
      )}
    </>
  );
};

export default FilterValueForm;
