import Breadcrumb from '@components/common/Breadcrumb';
import Map from '@components/common/Map';
import EventInfo from '@components/productDetail/EventInfo';
import Label from '@components/productDetail/Label';
import { BtnCancel } from '@components/user/MyTicketSales/CardOrder/styles';
import ModalCancelListing from '@components/user/MyTicketSales/ModalCancelListing';
import { IdQuery } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import ticketService from '@services/ticketService';
import userService from '@services/userService';
import { Container, H5, Typography } from '@style/DefaultStyled';
import { dateTimeFormatString } from '@utils/format';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { getInfoEvent } from '@utils/helper';
import { Col, Grid, Row } from 'antd';
import { ResponseModel } from 'interface';
import { ProductDetails } from 'interface/ticketInterface';
import { UserType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './style';

function ProductDetail() {
  const { xs } = Grid.useBreakpoint();
  const { id = '' } = useParams();
  const [productDetail, setProductDetail] = useState<ProductDetails>();
  const [isCancelBtn, setIsCancelBtn] = useState<boolean>(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [cancelListingModal, setCancelListingModel] = useState<boolean>(false);

  const fetchProductDetail = async () => {
    const resProduct = await ticketService.getProductDetails(id);
    const resProfile: ResponseModel<UserType> = await userService.getProfile();
    const isActiveCancelBtn =
      Number(resProduct?.data?.authorId) === resProfile?.data?.id;

    setProductDetail(resProduct.data);
    setIsCancelBtn(isActiveCancelBtn);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  /**
   * used to redirect to page select transaction or order ticket
   * @returns {void}
   */
  const handleSubmitPayment = () => {
    if (
      productDetail?.deliveryMethod &&
      productDetail?.deliveryMethod.length >= 2
    ) {
      navigate(`${ROUTES.TICKET_SELECT_TRANSACTION}/${id}`, {
        state: { productDetail },
      });
    } else {
      const method = productDetail?.deliveryMethod.join() as string;
      navigate(ROUTES.ORDER_TICKET(id, method), {
        state: { productDetail },
      });
    }
  };

  /**
   * Handle set open/hide modal cancel listing
   * @returns {void}
   */
  const onHideCancelListing = () => {
    setCancelListingModel(false);
    navigate(-1);
  };

  return (
    <Container>
      <S.Wrapper>
        <H5 className="header-production">Product Detail</H5>
        <Row gutter={[50, 0]}>
          <Col md={{ span: 12 }} xs={{ span: 24 }} className="container-left">
            <div className="container-map">
              <Map
                stadiumMap={productDetail?.event?.stageMap}
                classSelected={{ groupName: productDetail?.groupId }}
                isStatic
              />
            </div>
            {xs && (
              <>
                <H5
                  className="product-seat-info"
                  style={{ textAlign: 'unset' }}
                >
                  {productDetail?.seatInfo}
                </H5>
                {productDetail?.adjoiningSeats && <Label />}
                <div className="container-instant-price">
                  <Typography style={{ marginTop: 4, marginBottom: 8 }}>
                    {t('buyTicket.instantSalePrice')}
                  </Typography>
                  <Typography className="price">
                    {formatNumberWithCommas(productDetail?.totalPrice)} 원
                  </Typography>
                </div>
              </>
            )}
            {productDetail && (
              <EventInfo
                title={productDetail?.event?.name}
                performer={productDetail?.event?.performer}
                place={productDetail?.event?.place}
                performanceDate={String(
                  dateTimeFormatString(productDetail?.event?.performanceDate) ||
                    ''
                )}
                originalPrice={productDetail.event.originalPrice}
              />
            )}
          </Col>
          <Col md={{ span: 12 }} xs={{ span: 24 }} className="container-right">
            {!xs && (
              <div className="breadCrumb-wrap">
                <Breadcrumb
                  items={[
                    {
                      title: t(
                        `home.${
                          getInfoEvent(productDetail?.event.eventType).title
                        }`
                      ),
                      href: `${ROUTES.EVENT_PAGES}?title=${
                        getInfoEvent(productDetail?.event.eventType).title
                      }&eventTypes=${productDetail?.event.eventType}`,
                    },
                    {
                      title: `${productDetail?.event.name}`,
                      href: `${ROUTES.EVENT_DETAIL.replace(
                        IdQuery,
                        JSON.stringify(productDetail?.event?.id)
                      )}`,
                    },
                    {
                      title: t('buyTicket.selectTicket'),
                      href: `${ROUTES.BUY_TICKET}/${productDetail?.event?.id}`,
                    },
                    {
                      title: t('buyTicket.productDetail'),
                    },
                  ]}
                />
              </div>
            )}
            {!xs && (
              <>
                <H5 style={{ textAlign: 'unset', marginBottom: 16 }}>
                  {productDetail?.seatInfo}
                </H5>
                {productDetail?.adjoiningSeats && <Label />}
                <div className="container-instant-price">
                  <Typography>{t('buyTicket.instantSalePrice')}</Typography>
                  <Typography className="price">
                    {formatNumberWithCommas(productDetail?.totalPrice)} 원
                  </Typography>
                </div>
              </>
            )}
            <S.ButtonSubmitFormBuyTicket>
              {isCancelBtn ? (
                <BtnCancel
                  className="btn-pay"
                  onClick={() => {
                    setCancelListingModel(!!id);
                  }}
                >
                  {t('user.cancelListing')}
                </BtnCancel>
              ) : (
                <button
                  type="button"
                  className="btn-payment"
                  onClick={handleSubmitPayment}
                >
                  <span> {t('buyTicket.buyNow')}</span>
                </button>
              )}
            </S.ButtonSubmitFormBuyTicket>
          </Col>
        </Row>
      </S.Wrapper>

      {id && (
        <ModalCancelListing
          open={cancelListingModal}
          ticketNumber={id}
          onHideCancelListing={onHideCancelListing}
        />
      )}
    </Container>
  );
}

export default ProductDetail;
