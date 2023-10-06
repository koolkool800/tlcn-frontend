import notImage from '@assets/images/notImage.png';
import Breadcrumb from '@components/common/Breadcrumb';
import RadioGroup from '@components/common/RadioGroup';
import { DELIVERY_METHOD, IdQuery } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import useDimensions from '@hooks/useDimensions';
import { ButtonSubmitFormBuyTicket } from '@pages/BuyTicket/styles';
import buyTicketService from '@services/buyTicketService';
import { Container, H5, H6 } from '@style/DefaultStyled';
import { dateTimeFormatString } from '@utils/format';
import { getInfoEvent } from '@utils/helper';
import { Form, message } from 'antd';
import { ResponseModel } from 'interface';
import { FilterType } from 'interface/general';
import { TicketDetail } from 'interface/ticketInterface';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as S from './styles';

function getParamFromQuery(inputString: string) {
  const match = inputString.match(/method=(.+)/);
  if (!match || !match[1]) {
    return '';
  }
  return match[1];
}

const SelectTransactionMethod = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isMobile } = useDimensions();
  const params: FilterType = useParams();
  const idTicket = String(params?.id || '');
  const location = useLocation();
  const [detailTicket, setDetailTicket] = useState<TicketDetail>();
  // fetch data ticket detail
  useEffect(() => {
    if (idTicket) {
      const fetchEventData = async () => {
        try {
          const response: ResponseModel<TicketDetail> =
            await buyTicketService.getTicketDetail(idTicket);
          setDetailTicket(response.data);
        } catch (e) {
          const error = e as ResponseModel<string>;
          message.error(t(`HTTP_STATUS.${error.errorCode as string}`));
          navigate(-1);
        }
      };
      fetchEventData();
    }
  }, [idTicket]);

  /**
   * event when click submit button
   * @param values method: 'PIN_TRANSACTION' | 'SELLER_SHIPMENT'
   * @returns {void}
   */
  const handleSubmit = (values: {
    method: 'PIN_TRANSACTION' | 'SELLER_SHIPMENT';
  }): void => {
    const method = values.method as string;
    navigate(ROUTES.ORDER_TICKET(String(idTicket) as string, method), {
      state: { productDetail: location?.state?.productDetail },
    });
  };
  return (
    <Container>
      <S.Wrapper>
        <H5>{t('buyTicket.transactionMethodHeader')}</H5>
        {!isMobile && (
          <div className="breadCrumb-wrap">
            {location?.state?.productDetail && (
              <Breadcrumb
                items={[
                  {
                    title: t(
                      `home.${
                        getInfoEvent(
                          location.state.productDetail?.event?.eventType
                        ).title
                      }`
                    ),
                    href: `${ROUTES.EVENT_PAGES}?title=${
                      getInfoEvent(
                        location.state.productDetail?.event?.eventType
                      ).title
                    }&eventTypes=${
                      location.state.productDetail?.event?.eventType
                    }`,
                  },
                  {
                    title: `${location.state.productDetail?.event?.name}`,
                    href: `${ROUTES.EVENT_DETAIL.replace(
                      IdQuery,
                      JSON.stringify(location.state.productDetail?.event?.id)
                    )}`,
                  },
                  {
                    title: t('buyTicket.selectTicket'),
                    href: `${ROUTES.BUY_TICKET}/${location.state.productDetail?.event?.id}`,
                  },
                  {
                    title: t('buyTicket.transactionMethodHeader'),
                  },
                ]}
              />
            )}
          </div>
        )}

        <section className="main-detail">
          <div className="information-detail">
            <div className="image-wrap">
              {detailTicket?.image ? (
                <img src={detailTicket?.image} alt={detailTicket?.image} />
              ) : (
                <img src={notImage} alt={notImage} />
              )}
            </div>

            <div className="details">
              <div className="detail-header">
                <p className="author">{detailTicket?.performer}</p>
                <H6>{detailTicket?.eventName}</H6>
                <p className="place">{detailTicket?.place}</p>
              </div>

              <div className="showTime">
                <span>{dateTimeFormatString(detailTicket?.useDate)}</span>
              </div>
              <p className="seat-position">{detailTicket?.seatInfo}</p>
            </div>
          </div>
          <div className="select-transaction-method-wrapper">
            <H6>{t('buyTicket.transactionLabel')}</H6>
            <Form onFinish={handleSubmit} name="select-method">
              <Form.Item
                name="method"
                rules={[
                  {
                    required: true,
                    message: t('buyTicket.transactionSelectRequireMessage'),
                  },
                ]}
                initialValue={getParamFromQuery(location.search)}
              >
                <RadioGroup
                  direction="vertical"
                  options={[
                    {
                      label: t('buyTicket.pinTransaction'),
                      value: DELIVERY_METHOD.PIN_TRANSACTION,
                    },
                    {
                      label: t('buyTicket.sellerShipment'),
                      value: DELIVERY_METHOD.SELLER_SHIPMENT,
                    },
                  ]}
                />
              </Form.Item>
            </Form>
          </div>
          <ButtonSubmitFormBuyTicket>
            <button type="submit" className="btn-payment" form="select-method">
              <span>{t('buyTicket.btnSelect')}</span>
            </button>
          </ButtonSubmitFormBuyTicket>
        </section>
      </S.Wrapper>
    </Container>
  );
};

export default SelectTransactionMethod;
