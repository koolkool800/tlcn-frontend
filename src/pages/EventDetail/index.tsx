import TicketDescription from '@components/buyTicket/TicketDescription';
import Breadcrumb from '@components/common/Breadcrumb';
import Button from '@components/common/Button';
import Modal from '@components/common/ModalConfirm';
import { EventIDQuery } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import eventService from '@services/eventService';
import paymentService from '@services/paymentService';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { paymentEximbay } from '@utils/eximbay';
import { dateTimeFormatString } from '@utils/format';
import { getInfoEvent } from '@utils/helper';
import { Grid, message } from 'antd';
import { ResponseModel } from 'interface';
import { EventType } from 'interface/event';
import { UserType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styles';
import PaypalPaymentUnlock from '@components/eventPage/paymentUnlock';
import useAuth from '@hooks/useAuth';

function EventDetail() {
  const { id = '' } = useParams();
  const [data, setData] = useState<EventType>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { xs } = Grid.useBreakpoint();

  const [userProfile, setUserProfile] = useState<UserType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  /**
   * fetch event detail
   * @returns {Promise<void>}
   */
  const loadTopEvent = async (): Promise<void> => {
    try {
      const response: ResponseModel<EventType> = await eventService.getDetail(
        id,
        {
          returnStageMap: false,
          returnGroups: false,
        }
      );
      setData(response.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      message.error(err?.message);
    }
  };

  /**
   * func load profile
   * @returns {Promise<void>}
   */
  const loadUserProfile = async (): Promise<void> => {
    try {
      const res: ResponseModel<UserType> = await userService.getProfile();
      setUserProfile(res?.data || null);
    } catch (err) {
      /** * error */
    }
  };

  useEffect(() => {
    if (id) {
      loadTopEvent();
      loadUserProfile();
    }
  }, [id]);

  /**
   * the event used to close modal
   * @returns {void}
   */
  const handleCloseModal = (): void => {
    setOpenModal(false);
  };
  /**
   * the event used to close modal
   * @returns {void}
   */
  const handleOpenModal = (): void => {
    setOpenModal(true);
  };
  /**
   * event when click buy ticket button
   * @returns {void}
   */
  const handleBuyTicket = async () => {
    if (userProfile) {
      if (userProfile?.totalBalance < 0) {
        handleOpenModal();
        return;
      }
      navigate(`${ROUTES.BUY_TICKET}/${id}?redirectUrl=`);
    } else {
      navigate(
        `${ROUTES.LOGIN}/?redirectUrl=${window.location.origin}${ROUTES.BUY_TICKET}/${id}`
      );
    }
  };

  /**
   * event when click sell ticket button
   * @returns {void}
   */
  const handleSellTicket = async () => {
    if (userProfile) {
      if (userProfile?.totalBalance < 0) {
        handleOpenModal();
        return;
      }
      if (userProfile?.level > 1) {
        navigate(`${ROUTES.SELL_TICKET.replace(EventIDQuery, id)}`);
      }
      if (userProfile?.level === 1) {
        navigate(ROUTES.REGISTRATION_SELLER);
      }
    } else {
      navigate(
        `${ROUTES.LOGIN}/?redirectUrl=${
          window.location.origin
        }${ROUTES.SELL_TICKET.replace(EventIDQuery, id)}`
      );
    }
  };

  const handlePayment = async () => {
    setIsPayment(true);
  };

  useEffect(() => {
    if (paymentSuccess) {
      // redirect to detail page
      navigate(`${ROUTES.BUY_TICKET}/${id}?redirectUrl=`);
    }
  }, [paymentSuccess]);

  return (
    <S.ContainerEventDetail>
      <S.Container>
        {!xs ? (
          <div className="left">
            <div className="image-wrap">
              <img src={data?.coverImage} alt="" loading="lazy" />
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundImage: `url(${data?.coverImage})`,
              width: '100%',
              height: 375,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              position: 'absolute',
            }}
          />
        )}
        <div className="right">
          {!xs && (
            <div className="breadcrumd-wrap">
              <Breadcrumb
                items={[
                  {
                    title: t(`home.${getInfoEvent(data?.eventType).title}`),
                    className: 'item-hover',
                    href: `${ROUTES.EVENT_PAGES}?title=${
                      getInfoEvent(data?.eventType).title
                    }&eventTypes=${data?.eventType}`,
                  },
                  {
                    title: data?.title,
                  },
                ]}
              />
            </div>
          )}
          <section className="transaction-section">
            <TicketDescription
              author={data?.performer ?? ''}
              title={data?.title ?? ''}
              location={data?.place ?? ''}
              calendar={`${t('common.useDate')}: ${dateTimeFormatString(
                data?.performanceDate
              )}`}
            />

            <div className="transaction-action">
              <div
                aria-hidden
                className="btn-action buy-btn"
                onClick={handleBuyTicket}
              >
                {t('eventDetail.buy')}
              </div>

              <div
                aria-hidden
                className="sale-btn btn-action"
                onClick={handleSellTicket}
              >
                {t('eventDetail.sell')}
              </div>
            </div>
          </section>

          <section className="shipping-information-section">
            <h4>{t('eventDetail.shipInfo')}</h4>
            <div className="shipping-details">
              <div className="shipping-item-row">
                <div className="shipping-type">
                  <div className="shipping-type-tag pin-transaction">
                    {t('eventDetail.pinTrans')}
                  </div>
                </div>
                <div className="shipping-item-detail">
                  <ul>
                    <li>{t('eventDetail.shippingRule1')}</li>
                    <li style={{ whiteSpace: 'break-spaces' }}>
                      {t('eventDetail.shippingRule2')}
                    </li>
                    <li>{t('eventDetail.shippingRule3')}</li>
                  </ul>
                </div>
              </div>{' '}
              <div className="shipping-item-row">
                <div className="shipping-type">
                  <div className="shipping-type-tag seller-shipment">
                    {t('eventDetail.sellerShip')}
                  </div>
                </div>
                <div className="shipping-item-detail">
                  <ul>
                    <li style={{ whiteSpace: 'break-spaces' }}>
                      {t('eventDetail.sellerShipRule1')}
                    </li>
                    <li style={{ whiteSpace: 'break-spaces' }}>
                      {t('eventDetail.sellerShipRule2')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="purchase-information-section">
            <h4>
              {t('eventDetail.purchaseRefund')} / {t('eventDetail.cancelInfo')}
            </h4>
            <p>{t('eventDetail.purCanExtraInfo')}</p>
          </section>
        </div>

        <Modal
          isOpen={openModal}
          hiddenIcon={false}
          onCancel={handleCloseModal}
        >
          <>
            <div className="content-modal">
              <H5>{t('payment.title')}</H5>
              <S.Desc>
                {t('payment.description', {
                  totalBalance: userProfile?.totalBalance,
                })}
              </S.Desc>
            </div>

            {!isPayment ? (
              <Button
                size="large"
                maxwidth="384"
                color={theme.colors.black}
                bgcolor={theme.colors.primary500}
                onClick={handlePayment}
                loading={loading}
              >
                {t('payment.pay')}
              </Button>
            ) : (
              <PaypalPaymentUnlock
                setPaymentSuccess={setPaymentSuccess}
                setCloseModel={setOpenModal}
              />
            )}
          </>
        </Modal>
      </S.Container>
    </S.ContainerEventDetail>
  );
}

export default EventDetail;
