import Input from '@components/common/Input';
import Pagination, { PaginationTable } from '@components/common/Pagination';
import SpinLoading from '@components/common/SpinLoading/SpinLoading';
import Tabs from '@components/user/FAQ/Tabs';
import CardOrder, {
  CardOrderTypeProps,
} from '@components/user/MyPurchases/CardOrder';
import PopupReport, {
  OrderReport,
  PopUpNotification,
} from '@components/user/MyPurchases/PopupReport';
import { OrderStatus } from '@constants/codeConstants';
import useAddParams from '@hooks/useAddParams';
import useDebounce from '@hooks/useDebounce';
import fileServices from '@services/file';
import orderService from '@services/orderService';
import paymentService from '@services/paymentService';
import { H5 } from '@style/DefaultStyled';
import { paymentEximbay } from '@utils/eximbay';
import { dateTimeFormatString } from '@utils/format';
import { formatSeatPosition } from '@utils/formatSeatPosition';
import { getOffset } from '@utils/table';
import { message } from 'antd';
import { RcFile, UploadFile } from 'antd/es/upload';
import dayjs from 'dayjs';
import { SearchNormal1 } from 'iconsax-react';
import { ResponseModel } from 'interface';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const STATUS_TAB = {
  ALL: 'ALL',
  PAYMENT_COMPLETED: OrderStatus.PAYMENT_COMPLETED,
  ON_SHIPPING: `${OrderStatus.SENT_DELIVERY_UNIT},${OrderStatus.DELIVERY_UNIT_RECEIVED},${OrderStatus.DELIVERY_UNIT_COMPLETED_CHECKING},${OrderStatus.DELIVERY_COMPLETED},${OrderStatus.SENT_PIN}`,
  COMPLETED: OrderStatus.TRANSACTION_COMPLETED,
  PAYMENT_PENDING: OrderStatus.PAYMENT_PENDING,
  CANCELLED: OrderStatus.CANCEL,
};
type UrlParamsFilter = {
  keyword: string;
  page: string;
  statuses: keyof typeof STATUS_TAB;
};

const MyPurchases = () => {
  const { addParamsUrl, getParamUrl } = useAddParams();
  const { t } = useTranslation();
  const debounce = useDebounce();
  const urlParams = getParamUrl<UrlParamsFilter>();
  const [orders, setOrders] = useState<CardOrderTypeProps[]>([]);
  const [keyword, setKeyword] = useState(urlParams.keyword);
  const [paginate, setPaginate] = useState<PaginationTable>({
    current: Number(urlParams?.page || 1),
    pageSize: 10,
    totalElement: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isReporting, setIsReporting] = useState<OrderReport>();
  const [notification, setNotification] = useState(false);
  const fetchData = async (params?: { status?: string; keyword?: string }) => {
    setLoading(true);
    try {
      const response = await orderService.getAllPurchase({
        statuses: params?.status === STATUS_TAB.ALL ? '' : params?.status,
        keyword: params?.keyword,
        limit: paginate.pageSize,
        offset: getOffset(Number(urlParams?.page || 1), paginate.pageSize),
      });
      setOrders(
        response.data.data.map((order: any) => {
          const ticketInfo =
            order.ticket.type === 'OUTSIDE'
              ? order?.ticket?.outsideTicket
              : order.ticket.insideTicket;
          return {
            insideTicket: order.ticket?.insideTicket,
            author:
              order.ticket.type === 'INSIDE'
                ? ticketInfo?.event?.performer
                : ticketInfo.performer,
            title: ticketInfo?.event?.title,
            stadium:
              order.ticket.type === 'INSIDE'
                ? ticketInfo?.event?.place
                : ticketInfo?.place,
            useDate: dateTimeFormatString(
              order.ticket.type === 'INSIDE'
                ? ticketInfo?.event?.performanceDate
                : ticketInfo?.performanceDate
            ),
            img:
              order.ticket.type === 'INSIDE'
                ? ticketInfo?.event?.coverImage
                : '',
            orderDate: dayjs(order?.createdAt).format('DD.MM.YYYY'),
            orderNumber: order?.id,
            seatPosition: order?.ticket?.seats,
            quantity: order?.ticket?.seatQuantity,
            totalPay: order?.totalPrice,
            orderTotal: order?.totalPayment,
            transactionType: order?.deliveryMethod,
            status: order?.status,
            id: order?.id,
          } as CardOrderTypeProps;
        })
      );
      setPaginate({
        ...paginate,
        totalElement: response?.data?.length || 0,
      });
    } catch (error) {
      /** error */
    }
    setLoading(false);
  };

  /**
   * Handle on tab change
   * @param activeKey active Tab
   */
  const handleOnTabsChange = (activeKey: string) => {
    addParamsUrl({ statuses: activeKey, page: 1 });
  };

  /**
   * Handle on input search
   * @param v
   */
  const handleInputOnChange = async (v: ChangeEvent<HTMLInputElement>) => {
    setKeyword(v.target.value);
    debounce(() => {
      addParamsUrl({
        keyword: v.target.value,
        statuses: urlParams?.statuses || '',
        page: 1,
      });
    });
  };

  /**
   * Show pop up success
   * @param duration
   */
  const showNotification = (duration = 2000) => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, duration);
  };

  useEffect(() => {
    fetchData({
      status: urlParams.statuses && STATUS_TAB[urlParams.statuses],
      keyword: urlParams.keyword,
    });
  }, [JSON.stringify(urlParams)]);

  /**
   * handle onchange pagination
   * @param param0
   */
  const onChangePage = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }): void => {
    setPaginate((pre) => ({
      ...pre,
      current: page,
      pageSize,
    }));
  };

  /**
   *  Start report to open pop up report
   * @param order
   */
  const startReport = (order: any) => {
    setIsReporting(order);
  };

  /**
   * Cancel report
   */
  const onCancelReport = () => {
    setIsReporting(undefined);
  };

  /**
   * Handle submit report
   * @param orderId
   * @param values
   */
  const onSubmitReport = async (orderId: string, values: any) => {
    setLoading(true);
    const formData = new FormData();

    values.proof?.forEach((item: UploadFile) => {
      formData.append('files', item.originFileObj as RcFile);
    });

    const uploadResponse = await fileServices.uploadMultiple(formData);
    const urlProofImg: string[] = uploadResponse.urls || [];
    try {
      const response = await orderService.createReportOrder({
        detailReport: values.detail,
        orderId,
        proofs: urlProofImg,
      });
      // message.success(response.message);
      setIsReporting(undefined);

      showNotification();
    } catch (error: any) {
      message.error(error.message);
    }

    setLoading(false);
  };

  /**
   * Handle submit change state of Order
   * @param orderId
   */
  const paymentToSellerSubmit = async (orderId: string) => {
    try {
      const response = await orderService.paymentToSeller({
        orderId,
      });
      message.success(response.message);
      fetchData({ status: urlParams.statuses, keyword: urlParams.keyword });
    } catch (error: any) {
      message.error(error.message);
    }
  };

  /**
   * Handle submit make payment when order'status PAYMENT_PENDING with EXIMPAY
   * @param orderId
   */
  const makePayment = async (orderId: string) => {
    setLoading(true);
    const res: ResponseModel<any> = await paymentService.getOrderPayment(
      orderId
    );
    const dataOrder = res.data;
    await paymentEximbay(dataOrder);
    setLoading(false);
  };

  /**
   * Render Order
   * @returns
   */
  const renderOrderData = () => {
    return orders.map((order) => (
      <CardOrder
        key={order.orderNumber}
        {...order}
        actionReport={startReport}
        actionPayment={paymentToSellerSubmit}
        makePayment={makePayment}
      />
    ));
  };
  return (
    <SpinLoading spinning={loading} size="large">
      <S.Container>
        <H5>{t('user.myPurchase')}</H5>
        <S.OrderContainer>
          <Tabs
            activeKey={urlParams.statuses || 'ALL'}
            onChange={handleOnTabsChange}
            items={[
              {
                label: t('myPurchase.tab.all'),
                key: 'ALL',
              },
              {
                label: t('myPurchase.status.paymentPending'),
                key: 'PAYMENT_PENDING',
              },
              {
                label: t('myPurchase.tab.paymentCompleted'),
                key: `PAYMENT_COMPLETED`,
              },
              {
                label: t('myPurchase.tab.onShipping'),
                key: 'ON_SHIPPING',
              },
              {
                label: t('myPurchase.tab.completed'),
                key: 'COMPLETED',
              },

              {
                label: t('myPurchase.tab.cancelled'),
                key: `CANCELLED`,
              },
            ]}
          />
          <div className="input-wrap">
            <Input
              allowClear
              placeholder={t('myPurchase.input.placeHold')}
              prefix={<SearchNormal1 size="20" color="#FFFFFF" />}
              onChange={handleInputOnChange}
              value={keyword}
            />
          </div>
          <div className="orders-container">{renderOrderData()}</div>
          <div className="pagination-container">
            {paginate.totalElement > 0 && (
              <Pagination
                onChangePage={onChangePage}
                paginationTable={{
                  totalElement: paginate.totalElement,
                  current: Number(urlParams?.page || 1),
                  pageSize: paginate.pageSize,
                }}
              />
            )}
          </div>
        </S.OrderContainer>
        <PopupReport
          loading={loading}
          order={isReporting}
          open={Boolean(isReporting)}
          onCancel={onCancelReport}
          onSubmitReport={onSubmitReport}
        />
        <PopUpNotification
          type="success"
          open={notification}
          footer={null}
          onCancel={() => setNotification(false)}
        />{' '}
      </S.Container>
    </SpinLoading>
  );
};

export default MyPurchases;
