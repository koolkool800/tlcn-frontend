import Checkbox from '@components/common/Checkbox';
import { Typography } from '@style/DefaultStyled';
import { Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const TermAndCondition = () => {
  const form = Form.useFormInstance();
  const { t } = useTranslation();
  const listCheckbox = [
    //   {
    //     label: <Typography>Agree to all terms and conditions</Typography>,
    //     value: 'all',
    //   },
    {
      label: (
        <Typography>
          {t('auth.termOfServices')}{' '}
          <S.TextRed>({t('auth.required')})</S.TextRed>
        </Typography>
      ),
      value: '1',
    },
    {
      label: (
        <Typography>
          {t('auth.collection')} <S.TextRed>({t('auth.required')})</S.TextRed>
        </Typography>
      ),
      value: '2',
    },
    {
      label: (
        <Typography>
          {t('auth.youAre14year')}{' '}
          <S.TextRed>({t('auth.essential')})</S.TextRed>
        </Typography>
      ),
      value: '3',
    },
  ];

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const listCheckboxConvert = useMemo(() => {
    return listCheckbox.map((item) => item.value);
  }, []);

  const onChangeCheckbox = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < listCheckbox.length);
    setCheckAll(list.length === listCheckbox.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? listCheckboxConvert : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    form.setFieldsValue({ term: checkAll });
  }, [checkAll]);

  return (
    <div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        {t('auth.agreeCondition')}
      </Checkbox>

      <S.CheckboxGroupCustom value={checkedList} onChange={onChangeCheckbox}>
        {listCheckbox.map((item) => {
          return (
            <Checkbox key={item.value} value={item.value}>
              {item.label}
            </Checkbox>
          );
        })}
      </S.CheckboxGroupCustom>
    </div>
  );
};

export default React.memo(TermAndCondition);
