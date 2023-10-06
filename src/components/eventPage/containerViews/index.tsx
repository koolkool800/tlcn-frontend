import Button from '@components/common/Button';
import { H6 } from '@style/DefaultStyled';
import { titleCase } from '@utils/helper';
import { Checkbox, Drawer, Form, Grid, Row, Spin } from 'antd';
import { CloseCircle } from 'iconsax-react';
import { EventModelFilterType } from 'interface/event';
import { ObjectLiteral } from 'interface/general';
import React, { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, useTheme } from 'styled-components';
import CheckboxCustom from '../../common/Checkbox';
import Chip from '../../common/Chip';
import CustomDropDown from '../../common/CustomDropDown';
import * as S from './style';

const { useBreakpoint } = Grid;

function ContainerViews({
  isShown,
  content,
  dropdowns,
  defaultValue = {},
  onValuesChange,
  onGetSelectedValue,
  loading,
  xs,
  setIsShown,
}: {
  isShown: boolean;
  content: React.ReactNode;
  dropdowns: EventModelFilterType[];
  defaultValue: ObjectLiteral;
  loading?: boolean;
  onValuesChange?: (value: ObjectLiteral, allValue: ObjectLiteral) => void;
  onGetSelectedValue?: (value: EventModelFilterType[]) => void;
  xs?: boolean;
  setIsShown?: (value: boolean) => void;
}) {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const theme = useTheme() as DefaultTheme;
  const form = Form.useFormInstance();
  /** * State get list item checked */
  const [selectedValue, setSelectedValue] = useState<EventModelFilterType[]>(
    []
  );

  /** *
   * Func update new value for Form and selectedValue state
   * @param name // key filter
   * @param valueCurrent // value change
   * @param checked // value check box
   * @returns void
   */
  const handleUpdateFields = (
    name: string,
    valueCurrent: string,
    checked: boolean
  ) => {
    let newData: string[] = [];
    if (!checked) {
      newData = form
        .getFieldValue(name)
        ?.filter((val: string) => val !== valueCurrent);
    } else {
      newData = form.getFieldValue(name) || [];
      if (typeof newData === 'string') {
        newData = [newData];
      }

      newData = [...newData, valueCurrent];
    }

    form.setFieldValue(name, [...newData]);

    if (!checked) {
      onValuesChange?.(
        {
          ...form.getFieldsValue(),
          [name]: newData,
        },
        {}
      );
    }

    setSelectedValue((pre) => {
      const newValueSelected = [...pre];
      const index = newValueSelected.findIndex(
        (v: EventModelFilterType) => v.field === name
      );
      if (index !== -1) {
        newValueSelected[index].data = newData;
      }
      return newValueSelected;
    });
  };

  /** *
   * Render dynamic list dropdown and init data for form and selectedValue state
   * @returns React.ReactNode
   */
  const renderDropdown = useMemo(() => {
    const values: EventModelFilterType[] = [];
    const html: React.ReactNode = dropdowns?.map((item) => {
      let indexValue = values.findIndex((v) => v.field === item.field);
      if (indexValue === -1) {
        values.push({
          field: item.field,
          data: [],
        });

        indexValue = values.length - 1;
      }

      if (
        typeof defaultValue === 'object' &&
        Object.prototype.hasOwnProperty.call(defaultValue, item.field)
      ) {
        values[indexValue].data = item.data.filter((data: string) =>
          defaultValue[item.field]?.includes(data)
        );
      }

      return (
        <CustomDropDown
          key={item.field}
          title={String(t(`home.${item.field}`))}
          filter={
            <Form.Item
              name={item.field}
              initialValue={defaultValue[item.field]}
            >
              <Checkbox.Group>
                {item.data?.map((data: string) => (
                  <CheckboxCustom
                    value={data}
                    key={data}
                    onChange={(e) =>
                      handleUpdateFields(item.field, data, e.target.checked)
                    }
                  >
                    {titleCase(String(data))}
                  </CheckboxCustom>
                ))}
              </Checkbox.Group>
            </Form.Item>
          }
        />
      );
    });
    setSelectedValue(values);

    return html;
  }, [dropdowns]);

  /** *
   * Check has any item check
   * @returns bool
   */
  const checkHasAnyChecked = useMemo(() => {
    if (onGetSelectedValue) onGetSelectedValue(selectedValue);
    return selectedValue?.some(
      (item: EventModelFilterType) => item.data.length
    );
  }, [selectedValue]);
  const handleClearAll = () => {
    selectedValue.forEach((item) => form.setFieldValue(item.field, []));
    const changeValue: ObjectLiteral = form.getFieldsValue() || {};
    const newData = selectedValue.map((item) => {
      changeValue[item.field] = [];
      return { ...item, data: [] };
    });
    setSelectedValue(newData);
    onValuesChange?.(changeValue, {});
  };

  const handleSetIsShown = () => {
    if (setIsShown) {
      setIsShown(false);
    }
  };

  return (
    <>
      {!screens.xs && (
        <S.WrapperContainer>
          <div className="container-body">
            {!xs && (
              <div
                className={`fade-in ${isShown ? 'show' : ''}`}
                style={{ width: 400 }}
              >
                {isShown && renderDropdown}
              </div>
            )}
            <div
              style={{
                marginTop: checkHasAnyChecked ? 4 : -16,
                width: '100%',
              }}
            >
              {!xs && (
                <div style={{ display: 'flex' }}>
                  {selectedValue?.map((item: EventModelFilterType) =>
                    item.data?.map((data: string) => (
                      <div key={`${item.field}-${data}`}>
                        <Chip
                          key={`${item.field}_${item.data}`}
                          onClose={() =>
                            handleUpdateFields(item.field, data, false)
                          }
                        >
                          {titleCase(data)}
                        </Chip>
                      </div>
                    ))
                  )}

                  {checkHasAnyChecked && (
                    <Chip clearAll onClick={handleClearAll}>
                      {t('home.clearAll')}
                    </Chip>
                  )}
                </div>
              )}
              {loading ? (
                <div className="container-loading">
                  <Spin />
                </div>
              ) : (
                <Row gutter={[24, 0]} className="content">
                  {content}
                </Row>
              )}
            </div>
          </div>
        </S.WrapperContainer>
      )}

      {screens.xs && (
        <>
          {loading ? (
            <div className="container-loading">
              <Spin />
            </div>
          ) : (
            <Row gutter={[24, 0]} className="content">
              {content}
            </Row>
          )}
          <Drawer
            title={<H6>{t('home.filter')}</H6>}
            placement="bottom"
            closable={false}
            className="drawer-custom"
            onClose={() => handleSetIsShown()}
            open={isShown}
            extra={<CloseCircle onClick={() => handleSetIsShown()} />}
            key="bottom-drawer"
            headerStyle={{
              textAlign: 'center',
              borderBottom: 'unset',
            }}
            style={{
              backgroundColor: theme.colors.solidBasicNeutral800,
              color: theme.colors.lightGrey,
            }}
            footer={
              <>
                <Button
                  onClick={() => {
                    form.setFieldsValue({
                      ...form.getFieldsValue(),
                      places: [],
                      performers: [],
                    });
                    // setSelectedValue({});
                  }}
                >
                  {t('home.clearAll')}
                </Button>
                <Button
                  bgcolor={theme.colors.primarySolid500}
                  color="black"
                  onClick={() => {
                    onValuesChange?.(form.getFieldsValue(), {});
                    handleSetIsShown();
                  }}
                >
                  {t('home.done')}
                </Button>
              </>
            }
            footerStyle={{
              display: 'flex',
              gap: 10,
            }}
          >
            {renderDropdown}
          </Drawer>
        </>
      )}
    </>
  );
}

export default memo(ContainerViews);
