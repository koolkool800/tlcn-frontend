import Button from '@components/common/Button';
import { useAppSelector } from '@hooks/useAppSelector';
import { RootState } from '@redux/store';
import { PreConfirmOderPayment } from '@services/buyTicketService';
import { H6 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { currencyFormat } from '@utils/currency';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import * as S from './styles';
import PaypalPayment from '../PaypalPayment';
import { useState } from 'react';
type Props = {
  loading: boolean;
  idTicket: string;
  methodDelivery: string;
  setPaymentSuccess: (value: boolean) => void;
};

function TotalPayment({
  loading,
  idTicket,
  methodDelivery,
  setPaymentSuccess,
}: Props) {
  const { t } = useTranslation();
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const paymentOrder: PreConfirmOderPayment = useAppSelector(
    (state: RootState) => state.paymentOrderReducer.payment
  );

  const handlePaypalButton = () => {
    setIsPayment(true);
  };

  return (
    <S.PaymentContainer>
      <Row gutter={[24, 24]} align="bottom">
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 16 }}>
          <div className="left">
            <div className="text-wrap">
              <H6>{t('buyTicket.totalInfo.purchaseSafetyProgram')}</H6>
              <div
                dangerouslySetInnerHTML={{
                  __html: t('buyTicket.totalInfo.purchaseSafetyProgram1'),
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: t('buyTicket.totalInfo.purchaseSafetyProgram2'),
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: t('buyTicket.totalInfo.purchaseSafetyProgram3'),
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: t('buyTicket.totalInfo.purchaseSafetyProgram4'),
                }}
              />
            </div>
            <div className="text-wrap">
              <H6>{t('buyTicket.totalInfo.admissionSecurityService')}</H6>
              <div
                dangerouslySetInnerHTML={{
                  __html: t('buyTicket.totalInfo.admissionSecurityService1'),
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: t('buyTicket.totalInfo.admissionSecurityService2'),
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: t('buyTicket.totalInfo.admissionSecurityService3'),
                }}
              />
            </div>
          </div>
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
          <div className="right">
            <div className="price-container">
              <div className="row">
                <div className="text">
                  {t('buyTicket.totalPayment.productPrice')}
                </div>
                <div className="price">
                  {currencyFormat(paymentOrder.price)} 원
                </div>
              </div>
              <div className="row">
                <div className="text">
                  {t('buyTicket.totalPayment.deliveryFee')}
                </div>
                <div className="price">
                  {currencyFormat(paymentOrder.deliveryFee)} 원
                </div>
              </div>
              <div className="row">
                <div className="text">
                  {t('buyTicket.totalPayment.platformFee')}
                </div>
                <div className="price">
                  {currencyFormat(paymentOrder.platformFee)} 원
                </div>
              </div>
              <div className="row">
                <div className="text">
                  {t('buyTicket.totalPayment.discount')}
                </div>
                <div className="price discount">
                  {currencyFormat(paymentOrder.totalDiscount)} 원
                </div>
              </div>
              <div className="row">
                <div className="text">
                  {t('buyTicket.totalPayment.totalPayment')}
                </div>
                <div className="price total">
                  {currencyFormat(paymentOrder.totalPayment)} 원
                </div>
              </div>
            </div>
            <div className="btn-wrap">
              {isPayment ? (
                <div className="payment">
                  <PaypalPayment
                    idTicket={idTicket}
                    methodDelivery={methodDelivery}
                    setPaymentSuccess={setPaymentSuccess}
                  />
                </div>
              ) : (
                <Button
                  // htmlType="submit"
                  size="large"
                  color={theme?.colors?.black}
                  bgcolor={theme?.colors?.purple200}
                  loading={loading}
                  onClick={handlePaypalButton}
                >
                  {t('buyTicket.totalPayment.makePayment')}
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </S.PaymentContainer>
  );
}

export default TotalPayment;
