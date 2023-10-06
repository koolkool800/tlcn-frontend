import BackButton from '@components/common/BackButton';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import EngLang from '../../../../assets/images/eng.png';
import KorLang from '../../../../assets/images/kor.png';
import { LOCAL_STORE } from '../../../../constants/codeConstants';
import { H5, H6 } from '../../../../style/DefaultStyled';
import { getLanguage, localHandler } from '../../../../utils/localStorage';
import Button from '../../../common/Button';
import Modal from '../../../common/ModalConfirm';
import Select from '../../../common/Select';
import { Option } from '../../../common/Select/style';
import * as S from './style';

export const LANG_LIST = [
  {
    label: 'English',
    value: 'en',
    code: EngLang,
  },
  {
    label: 'Korea',
    value: 'ko',
    code: KorLang,
  },
];

const ChangeLanguage = () => {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const theme: DefaultTheme = useTheme() as DefaultTheme;
  const [openModal, setOpenModal] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>(
    LOCAL_STORE.LANG_DEFAULT
  );

  useLayoutEffect(() => {
    setCurrentLang(getLanguage());
  }, []);

  /**
   * the event used to close modal
   * @returns {void}
   */
  const handleCloseModal = (): void => {
    window.location.reload();
  };
  /**
   * the event used to open modal
   * @returns {void}
   */
  const handleOpenModal = (): void => {
    setOpenModal(true);
    localHandler.setLocal(LOCAL_STORE.LANG, currentLang);
    i18n.changeLanguage(currentLang);
  };

  const handleChange = (value: string) => {
    setCurrentLang(value);
  };

  return (
    <>
      <BackButton link={location.pathname} label="My page" />
      <S.Container>
        <S.Wrap>
          <H5>Change Language</H5>
          <Select
            style={{ width: '100%' }}
            placeholder="Select language"
            value={currentLang}
            onChange={handleChange}
            optionLabelProp="label"
          >
            {LANG_LIST.map((lang) => (
              <Option key={lang.value} value={lang.value} label={lang.label}>
                <S.OptionContent>
                  <span role="img" aria-label={lang.value}>
                    <img src={lang.code} alt="language" />
                  </span>
                  <span>{lang.label}</span>
                </S.OptionContent>
              </Option>
            ))}
          </Select>
        </S.Wrap>
        <Button
          htmlType="submit"
          color={theme.colors.black}
          bgcolor={theme.colors.primary500}
          style={{ width: 'auto' }}
          onClick={handleOpenModal}
        >
          Save
        </Button>

        <Modal isOpen={openModal} onCancel={handleCloseModal}>
          <>
            <div className="content-modal ">
              <H5>Change language successfully</H5>
              <H6>
                Congratulations that you have successfully change language for a
                Resell Ticket account
              </H6>
            </div>

            <Button
              size="large"
              color={theme.colors.black}
              bgcolor={theme.colors.primary500}
              onClick={handleCloseModal}
            >
              Done
            </Button>
          </>
        </Modal>
      </S.Container>
    </>
  );
};

export default ChangeLanguage;
