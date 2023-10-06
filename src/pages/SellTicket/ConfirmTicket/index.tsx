/* eslint-disable import/no-extraneous-dependencies */
import Button from '@components/common/Button';
import Modal from '@components/common/ModalConfirm';
import { DELIVERY_METHOD_VALUE } from '@constants/codeConstants';
import { ROUTE_USER } from '@constants/routes';
import ticketService from '@services/ticketService';
import { Container, H5, H6, Typography } from '@style/DefaultStyled';
import { dateTimeFormatString } from '@utils/format';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { Calendar } from 'iconsax-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { message } from 'antd';
import * as S from './style';

function ConfirmTicket() {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useLocation();
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleOpen = async () => {
    try {
      const res = await ticketService.createInsideTicket({
        ...state.data,
        pictureOfProof: state.pictureOfProof[0].thumbUrl,
      });
      if (res.data) {
        setIsOpen(true);
        setTimeout(() => {
          navigate(ROUTE_USER.USER_MY_TICKET_SALES);
        }, 1000);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };
  return (
    <Container>
      <S.Wrapper>
        <H5>{t('registerSellTicket.headerConfirmTicket')}</H5>
        <div className="section-1">
          <div>
            <div
              className="container-img"
              style={{ backgroundImage: `url(${state.coverImage})` }}
            />
          </div>
          <div className="container-info-text">
            <H6>{state?.performer}</H6>
            <H5>{state?.title}</H5>
            <span className="sub-text">{state?.place}</span>
            <div className="container-date">
              <Calendar />
              <span>{`${t('common.useDate')}:  ${dateTimeFormatString(
                state?.performanceDate
              )}`}</span>
            </div>
            <div className="container-plain-text">
              {`${t('registerSellTicket.seatPosition')}: ${state.groupName} | ${
                state.sectionName
              } | ${state.floorName} | ${state.rowName}`}
            </div>
            <div className="container-plain-text">
              {`${t(
                'buyTicket.transactionLabel'
              )}: ${state.transactionMethod.map(
                (item: 'SELLER_SHIPMENT' | 'PIN_TRANSACTION') =>
                  DELIVERY_METHOD_VALUE[item]
              )}`}
            </div>
          </div>
        </div>
        <div className="section-2">
          <div className="container-salePrice">
            <div className="text-bold">{t('registerSellTicket.salePrice')}</div>
            <div className="text-bold">{`${formatNumberWithCommas(
              state.salePrice
            )} 원`}</div>
          </div>
          <div className="container-list-fee">
            <div className="container-fee">
              <div className="title-fee">
                {t('registerSellTicket.saleCommissions')}
              </div>
              <div className="fee">{`${formatNumberWithCommas(
                state.saleCommission
              )} 원`}</div>
            </div>
            <div className="container-fee">
              <div className="title-fee">
                {t('registerSellTicket.discountCoupon')}
              </div>
              <div className="fee">{`${formatNumberWithCommas(
                state.totalDiscount
              )} 원`}</div>
            </div>
            <div className="container-fee">
              <div className="title-fee">
                {t('registerSellTicket.shippingFee')}
              </div>
              <div className="fee">{`${state.shippingFee} 원`}</div>
            </div>
          </div>
          <div className="container-total-fee">
            <div className="text-bold"> {t('registerSellTicket.AMR')}</div>
            <div className="text-bold">{`${formatNumberWithCommas(
              state.actualAmountSeller
            )}원`}</div>
          </div>
          <div />
        </div>
        <div className="section-3">
          <H6>{t('registerSellTicket.penaltyTitle')} </H6>
          <Typography>{t('registerSellTicket.penaltyDes')}</Typography>
        </div>
        <div className="container-button-submit">
          <Button
            htmlType="submit"
            size="large"
            color={theme?.colors?.black}
            bgcolor={theme?.colors?.solidBrightGreenNetrual}
            maxwidth="384"
            onClick={handleOpen}
          >
            {t('registerSellTicket.registerButton')}
          </Button>
        </div>
        <Modal isOpen={isOpen} onCancel={handleCancel}>
          <H5> {t('registerSellTicket.confirmTitle')}</H5>
          <div className="container-modal-description">
            <Typography>
              {t('registerSellTicket.confirmDesc1')} <br />
              {t('registerSellTicket.confirmDesc2')}
            </Typography>
          </div>
        </Modal>
      </S.Wrapper>
    </Container>
  );
}
export default ConfirmTicket;
