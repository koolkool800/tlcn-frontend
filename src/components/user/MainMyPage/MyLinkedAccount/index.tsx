import { Add, ArrowLeft2 } from 'iconsax-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ButtonTag, H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import CustomLink from '@components/common/CustomLink';
import ModalAddNewAccount from '../ModalAddNewAccount';
import * as S from './style';

const MyLinkedAccount = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

  /**
   * the event used to close modal
   * @returns {void}
   */
  const handleCloseModal = (): void => {
    setOpenModal(false);
  };
  /**
   * the event used to open modal
   * @returns {void}
   */
  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    handleCloseModal();
  };
  return (
    <>
      <CustomLink to={location.pathname}>
        <S.Btn>
          <ArrowLeft2 size="16" />
          {t('user.myPage')}
        </S.Btn>
      </CustomLink>
      <S.Container>
        <H5>{t('user.linkedAccount')}</H5>
        <S.Wrapper>
          <S.Content>
            <S.Text color={theme.colors.surfaceHight}>Shinhan bank</S.Text>
            <S.Text color={theme.colors.surfaceMedium}>
              1802 **** *** *** 9546
            </S.Text>
            <ButtonTag>Default</ButtonTag>
          </S.Content>
          <S.Content>
            <S.Text color={theme.colors.surfaceHight}>Shinhan bank</S.Text>
            <S.Text color={theme.colors.surfaceMedium}>
              1802 **** *** *** 9546
            </S.Text>
          </S.Content>
          <S.Content>
            <S.Text color={theme.colors.surfaceHight}>Shinhan bank</S.Text>
            <S.Text color={theme.colors.surfaceMedium}>
              1802 **** *** *** 9546
            </S.Text>
          </S.Content>
        </S.Wrapper>
        <S.Btn border="1" onClick={handleOpenModal}>
          {t('user.addNewAccount')} <Add size="16" variant="Outline" />
        </S.Btn>

        <ModalAddNewAccount
          open={openModal}
          onCancel={handleCloseModal}
          onSubmit={onFinish}
        />
      </S.Container>
    </>
  );
};

export default MyLinkedAccount;
