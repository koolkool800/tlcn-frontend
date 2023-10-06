import Button from '@components/common/Button';
import Modal from '@components/common/ModalConfirm';
import userService from '@services/userService';
import { H5, H6 } from '@style/DefaultStyled';
import { message } from 'antd';
import { ResponseModel } from 'interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type Props = {
  open: boolean;
  onHideCancelListing: (isReload?: boolean) => void;
  ticketNumber: string | number;
};

const ModalCancelListing = ({
  open,
  onHideCancelListing,
  ticketNumber,
}: Props) => {
  const { t } = useTranslation();
  const theme = useTheme() as DefaultTheme;
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      const res = await userService.ticketSaleCancelListing({
        id: ticketNumber,
      });
      message.success(t('user.cancelListingSuccess'));
      onHideCancelListing(true);
    } catch (err) {
      const error = err as ResponseModel<string>;
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }

    setLoading(false);
  };

  return (
    <Modal hiddenIcon={false} isOpen={open} onCancel={onHideCancelListing}>
      <S.ModalBody>
        <S.Wrapper>
          <div className="content-modal ">
            <H5>{t('user.cancelListingTitle')}</H5>
          </div>
          <H6>{t('user.cancelListingDesc')}</H6>
          <Button
            loading={loading}
            size="large"
            onClick={handleCancel}
            bgcolor={theme.colors.solidBrightGreenNetrual}
            color={theme.colors.emphasisDarkColorHight}
          >
            {t('user.submit')}
          </Button>
        </S.Wrapper>
      </S.ModalBody>
    </Modal>
  );
};

export default ModalCancelListing;
