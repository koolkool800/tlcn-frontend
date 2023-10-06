import { useAppSelector } from '@hooks/useAppSelector';
import { RootState } from '@redux/store';
import { H6 } from '@style/DefaultStyled';
import { currencyFormat } from '@utils/currency';
import { dateTimeFormatString } from '@utils/format';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

function TicketInformationDetails() {
  const { t } = useTranslation();

  const detailTicket: any = useAppSelector(
    (state: RootState) => state.ticketReducer
  );

  return (
    <S.TicketInformationDetailsWrap>
      <H6>{t('buyTicket.ticketInformation')}</H6>
      <div className="ticket-information-details">
        <Row gutter={[4, { xs: 6 }]}>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 4 }}>
            <Row gutter={[4, 8]}>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="title">{t('buyTicket.productName')}</p>
              </Col>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="ticket-detail">{detailTicket?.eventName}</p>
              </Col>
            </Row>
          </Col>

          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 4 }}>
            <Row gutter={[4, 8]}>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="title">{t('buyTicket.useDate')}</p>
              </Col>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="ticket-detail">
                  {dateTimeFormatString(
                    detailTicket?.useDate,
                    'YYYY.M.DD HH:mm'
                  )}
                </p>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
            <Row gutter={[4, 8]}>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="title">{t('buyTicket.seatPosition')}</p>
              </Col>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="ticket-detail">{detailTicket?.seatInfo}</p>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 3 }}>
            <Row gutter={[4, 8]}>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="title">{t('buyTicket.unitPrice')}</p>
              </Col>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="ticket-detail fw700">
                  {currencyFormat(detailTicket?.unitPrice || 0)} 원
                </p>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 2 }}>
            <Row gutter={[4, 8]}>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="title quantity-title">
                  {t('buyTicket.quantity')}
                </p>
              </Col>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="ticket-detail quantity-detail">
                  {detailTicket?.quantity}
                </p>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 3 }}>
            <Row gutter={[4, 8]}>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="title into-money-title">
                  {t('buyTicket.intoMoney')}
                </p>
              </Col>
              <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 24 }}>
                <p className="ticket-detail fw700 into-money-detail">
                  {currencyFormat(detailTicket?.intoMoney || 0)} 원
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </S.TicketInformationDetailsWrap>
  );
}

export default TicketInformationDetails;
