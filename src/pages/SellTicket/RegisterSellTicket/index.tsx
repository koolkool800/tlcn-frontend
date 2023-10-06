/* eslint-disable import/no-extraneous-dependencies */
import { ROUTES } from '@constants/routes';
import { Form, Spin, Grid, message } from 'antd';
import DetailSeatPotion from '@components/SellTicket/RegisterSellTicket/DetailSeatPosition';
import Quantity from '@components/SellTicket/RegisterSellTicket/Quantity';
import TicketArea from '@components/SellTicket/RegisterSellTicket/TicketArea';
import CheckBoxTransaction from '@components/SellTicket/RegisterSellTicket/CheckBoxTransaction';
import Breadcrumb from '@components/common/Breadcrumb';
import { Container, Typography, H6 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import Map from '@components/common/Map';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventType } from 'interface/event';
import eventService from '@services/eventService';
import { ResponseModel, ResponseListModel } from 'interface';
import Price from '@components/SellTicket/RegisterSellTicket/Price';
import Checkbox, { Options } from '@components/common/Checkbox';
import Select from '@components/common/Select';
import dayjs from 'dayjs';
import ticketService from '@services/ticketService';
import { DELIVERY_METHOD, IdQuery } from '@constants/codeConstants';
import { InsideTicketType } from 'interface/insideTicket';
import { useTranslation } from 'react-i18next';
import { extractDataMap } from '@utils/customList';
import DescriptionTransactionMethod from '@components/common/DescriptionTransactionMethod';
import { getInfoEvent, handleConvertData } from '@utils/helper';
import { getColorAndGroupIdFromArray } from '@utils/handleMap';
import userService from '@services/userService';
import useDebounce from '@hooks/useDebounce';
import { Option } from '@components/common/Select/style';
import UploadRegisterSeller from '@components/registerSeller/UploadRegisterSeller';
import * as S from './style';

type Seat = {
  class: Options[];
  zones: Options[];
  floors: Options[];
  rows: Options[];
};

const SellTicket = () => {
  const [form] = Form.useForm();
  const { xs } = Grid.useBreakpoint();
  const { t } = useTranslation();
  const debounce = useDebounce(300);
  const { eventId = '' } = useParams();
  const [data, setData] = useState<EventType>();
  const dataForm = Form.useWatch([], form);
  const navigate = useNavigate();
  const [colors, setColors] = useState<any>();
  const [seat, setSeat] = useState<Seat>({
    class: [],
    zones: [],
    floors: [],
    rows: [],
  });
  const [vouchers, setVouchers] = useState<any>([]);
  const [emptyError, setIsEmptyTransaction] = useState({
    state: false,
    message: '',
  });
  const [loadingVoucher, setLoadingVoucher] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableTransactions, setAvailableTransactions] = useState<string[]>(
    []
  );

  const handleFormValuesChange = (changedValues: any, values: any) => {
    if (changedValues['pin-transaction'] || changedValues['seller-shipment']) {
      setIsEmptyTransaction({ state: false, message: '' });
    }
    if (changedValues.section) {
      form.setFieldsValue({
        ...form.getFieldsValue,
        floor: null,
        row: null,
      });
    } else if (changedValues.floor) {
      form.setFieldsValue({
        ...form.getFieldsValue,
        row: null,
      });
    }
  };
  const onFinish = async (values: any) => {
    if (!values['pin-transaction'] && !values['seller-shipment']) {
      setIsEmptyTransaction({
        state: true,
        message: 'Select at least 1 transaction method',
      });
      return;
    }
    const deliveryMethod = [];
    const seats = [];

    if (values['pin-transaction']) {
      deliveryMethod.push(DELIVERY_METHOD.PIN_TRANSACTION);
    }
    if (values['seller-shipment']) {
      deliveryMethod.push(DELIVERY_METHOD.SELLER_SHIPMENT);
    }
    if (values.seat1) {
      seats.push(values.seat1);
    }
    if (values.seat2) {
      seats.push(values.seat2);
    }
    const convertData: InsideTicketType = {
      deliveryMethod,
      eventId: data?.id,
      groupId: dataForm?.area?.id,
      sectionId: dataForm.section,
      floorId: dataForm?.floor,
      rowId: dataForm?.row,
      seatQuantity: dataForm?.quantity,
      voucherId: dataForm?.coupon,
      isAdjacentSeats: dataForm?.seatAdjacent,
      unitPrice: dataForm.price,
      seats,
    };
    try {
      const res = await ticketService.preConfirmInsideTicket(convertData);
      navigate(ROUTES.CONFIRM_TICKET, {
        state: {
          ...res.data,
          coverImage: data?.coverImage,
          title: data?.title,
          performanceDate: data?.performanceDate,
          place: data?.place,
          performer: data?.performer,
          salePrice: dataForm.price * dataForm.quantity,
          data: convertData,
          pictureOfProof: dataForm.pictureOfProof,
        },
      });
    } catch (err: any) {
      if (err.errorCode === t('HTTP_STATUS.UNAUTHORIZED')) {
        navigate(ROUTES.LOGIN);
      }
      message.error(err.message);
    }
  };
  const onFinishFailed = (errors: any) => {
    console.log('errors', errors);
  };

  /** * Load  event */
  const loadTopEvent = async () => {
    try {
      setLoading(true);
      const response: ResponseModel<EventType> = await eventService.getDetail(
        eventId
      );
      setAvailableTransactions(response.data.availableDeliveryMethods);
      setColors(getColorAndGroupIdFromArray(response.data.groups));
      const dataSeat = extractDataMap(response.data.groups);
      setData(response.data);
      setSeat((pre) => ({
        ...pre,
        ...dataSeat,
      }));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      /* empty */
    }
  };

  const loadVoucher = async (totalPrice: number) => {
    setLoadingVoucher(true);
    const requestVoucher = {
      totalPrice,
      applySeller: 'seller',
    };
    const voucher: ResponseListModel<any> = await userService.getVoucherOrder(
      requestVoucher
    );
    const newData = voucher.data;
    setVouchers(newData);
    setLoadingVoucher(false);
  };
  function handleRender() {
    /** filter base on parent  */
    const flatZoneWithFilter = data?.groups
      ?.filter((item) => item.groupId === dataForm?.area?.groupId)
      .flatMap((item) => item.sections);
    const flatFloorWithFilter = flatZoneWithFilter
      ?.filter((item) => item.id === dataForm?.section)
      ?.flatMap((item) => item.floors);
    const flatRowWithFilter = flatFloorWithFilter
      ?.filter((item) => item.id === dataForm?.floor)
      ?.flatMap((item) => item.rows);
    setSeat((prev: any) => ({
      ...prev,
      zones: flatZoneWithFilter,
      floors: flatFloorWithFilter,
      rows: flatRowWithFilter,
    }));
  }

  /** load event and put it into form */
  useEffect(() => {
    loadTopEvent();
  }, [eventId]);

  /** handle render data for detail seats position */
  useEffect(() => {
    handleRender();
  }, [dataForm, data]);

  /** load voucher */
  useEffect(() => {
    if (form.getFieldValue('price') && form.getFieldValue('quantity')) {
      debounce(() => {
        loadVoucher(
          form.getFieldValue('price') * form.getFieldValue('quantity')
        );
      });
    }
  }, [form.getFieldValue('price'), form.getFieldValue('quantity')]);
  return (
    <>
      <S.ContainerRegisterSellTicket>
        <S.Container>
          <div className="breadcrumb-wrap">
            {!xs && (
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
                    title: data?.title || '',
                    href: `${ROUTES.EVENT_DETAIL.replace(
                      IdQuery,
                      JSON.stringify(data?.id)
                    )}`,
                  },
                  {
                    title: t('registerSellTicket.registerTitle'),
                  },
                ]}
              />
            )}
          </div>
          <S.Header>{t('registerSellTicket.registerTitle')}</S.Header>

          {loading ? (
            <div className="container-loading">
              <Spin />
            </div>
          ) : (
            <div className="content">
              <div className="left">
                <div className="image-wrap">
                  <Map
                    isSeller
                    stadiumMap={data?.stageMap}
                    selectedArea={dataForm?.area}
                    onClick={(value: any) => {}}
                  />
                </div>
              </div>
              <div className="right">
                <Form
                  name="form-register-sell-ticket"
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  onValuesChange={handleFormValuesChange}
                >
                  <section className="transaction-section">
                    <TicketArea
                      area={data?.groups}
                      onClick={(areaSelected: any) => {
                        form.setFieldsValue({
                          ...form.getFieldsValue(true),
                          area: areaSelected,
                          floor: null,
                          section: null,
                          row: null,
                          price: null,
                        });
                      }}
                    />
                    <DetailSeatPotion
                      dataForm={dataForm}
                      classes={dataForm?.area}
                      zones={seat.zones}
                      floors={seat.floors}
                      rows={seat.rows}
                    />
                    <Quantity />
                    <div>
                      <Price minPrice={form.getFieldValue('area')?.minPrice} />
                      {dataForm?.quantity > 1 && (
                        <Form.Item
                          name="seatAdjacent"
                          valuePropName="checked"
                          style={{ marginTop: 6, marginBottom: 10 }}
                        >
                          <Checkbox>
                            {t('registerSellTicket.theSeatsAdjacent')}
                          </Checkbox>
                        </Form.Item>
                      )}
                    </div>
                    <CheckBoxTransaction
                      emptyError={emptyError}
                      availableTransactions={availableTransactions}
                    />
                    <div className="container-method-description">
                      {dataForm && dataForm['pin-transaction'] && (
                        <DescriptionTransactionMethod
                          title={<H6>{t('onsiteTicket.pinTransaction')}</H6>}
                          content={
                            <Typography>
                              {t('registerSellTicket.pinTransactionDesc1')}
                              <br />
                              {t('registerSellTicket.pinTransactionDesc2')}
                            </Typography>
                          }
                        />
                      )}
                      {dataForm && dataForm['seller-shipment'] && (
                        <DescriptionTransactionMethod
                          title={
                            <H6>{t('registerSellTicket.sellerShipInfo')}</H6>
                          }
                          content={
                            <Typography>
                              {t('registerSellTicket.sellerShipInfoDesc1')}
                            </Typography>
                          }
                        />
                      )}
                    </div>
                    <Form.Item
                      name="coupon"
                      label={t('registerSellTicket.couponLabel')}
                      style={{ marginBottom: 0 }}
                    >
                      <Select
                        disabled={
                          !form.getFieldValue('price') ||
                          !form.getFieldValue('quantity')
                        }
                        loadingVoucher={loadingVoucher}
                        placeholder={t('registerSellTicket.couponPlaceholder')}
                        dropdownRender={(menu) => {
                          return <S.ContainerMenu>{menu}</S.ContainerMenu>;
                        }}
                        allowClear
                        optionLabelProp="label"
                      >
                        {handleConvertData(vouchers).map((option: any) => (
                          <Option
                            key={option.voucher.id}
                            value={option.voucher.id}
                            label={option.voucher.name}
                          >
                            <S.ContainerLabel>
                              <div className="container-info-coupon">
                                <div>{option.voucher.name}</div>
                                <div>
                                  <Typography>
                                    {option.voucher.description}
                                  </Typography>
                                </div>
                              </div>
                              <S.ContainerExpiredDate>
                                {t('registerSellTicket.expiredDate')}:{' '}
                                {dayjs(option.voucher.expiredDate).format(
                                  'YYYY.MM-DD'
                                )}
                              </S.ContainerExpiredDate>
                            </S.ContainerLabel>
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <div className="container-pop">
                      <UploadRegisterSeller
                        name="pictureOfProof"
                        label={t('onsiteTicket.proofOfOwnerTicket')}
                        placeholder={t('registerSellTicket.uploadCertificate')}
                        rules={[
                          {
                            required: true,
                            message: t(
                              'registerSellTicket.uploadCertificatePlaceholder'
                            ),
                          },
                        ]}
                        width={343}
                        height={86}
                      />
                    </div>
                    <S.BtnNext
                      htmlType="submit"
                      size="large"
                      bgcolor={theme.colors.primary500}
                      disabled={
                        !(
                          dataForm?.area &&
                          dataForm?.floor &&
                          dataForm?.price &&
                          dataForm?.quantity &&
                          dataForm?.section &&
                          dataForm?.pictureOfProof
                        )
                      }
                    >
                      {t('registerSellTicket.nextButton')}
                    </S.BtnNext>
                  </section>
                </Form>
              </div>
            </div>
          )}
        </S.Container>
      </S.ContainerRegisterSellTicket>
    </>
  );
};
export default SellTicket;
