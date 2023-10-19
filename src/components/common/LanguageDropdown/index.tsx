import EngLang from '@assets/images/eng.png';
import KorLang from '@assets/images/kor.png';
import { LOCAL_STORE } from '@constants/codeConstants';
import { getLanguage, localHandler } from '@utils/localStorage';
import { LANGUAGE_VALUE } from 'i18n';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from '../Select';

export const LANG_LIST = [
  {
    label: 'EN',
    value: LANGUAGE_VALUE.en,
    code: EngLang,
  },
  {
    label: 'KR',
    value: LANGUAGE_VALUE.ko,
    code: KorLang,
  },
];

const LanguageDropDown = () => {
  const { i18n } = useTranslation();
  const langCurrent = getLanguage();
  const [currentLang, setCurrentLang] = useState<string>(
    langCurrent || LANGUAGE_VALUE.en
  );
  const [open, setOpen] = useState(false);

  const handleChange = (value: string) => {
    setCurrentLang(value);
    localHandler.setLocal(LOCAL_STORE.LANG, value);
    setOpen(false);
    window.location.reload();
  };

  return (
    <Select
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
      className="container-select-header"
      style={{ width: 65 }}
      value={currentLang}
      optionLabelProp="label"
      options={LANG_LIST}
      onChange={handleChange}
      open={open}
    />
  );
};

export default LanguageDropDown;
