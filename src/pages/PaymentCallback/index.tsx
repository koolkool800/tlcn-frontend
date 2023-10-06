import Modal from '@components/common/ModalConfirm';
import { ROUTE_USER } from '@constants/routes';
import useParam from '@hooks/useParam';
import { H5 } from '@style/DefaultStyled';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const PaymentCallback = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const queryUrl = useParam();

  // used to display notifications when payment success
  useEffect(() => {
    if (queryUrl?.paymentStatus) {
      // message.success(t(`HTTP_STATUS.${queryUrl?.paymentStatus}`));
      // navigate(ROUTE_USER.USER_MY_PURCHASES, { replace: true });
      setIsModalOpen(true);
    }
  }, [queryUrl]);

  return (
    <S.Container>
      <S.SpinAnt />

      <Modal
        isOpen={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          navigate(ROUTE_USER.USER_MY_PURCHASES, { replace: true });
        }}
      >
        <div className="content-modal">
          {queryUrl?.paymentStatus === 'PAYMENT_SUCCESS' ? (
            <>
              <H5>{t(`HTTP_STATUS.${queryUrl?.paymentStatus}`)}</H5>
              <p>{t('buyTicket.within12Hours')}</p>
            </>
          ) : (
            <H5>{t(`HTTP_STATUS.${queryUrl?.paymentStatus}`)}</H5>
          )}
        </div>
      </Modal>
    </S.Container>
  );
};

export default PaymentCallback;
