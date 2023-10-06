import Input from '@components/common/Input';
import Pagination, { PaginationTable } from '@components/common/Pagination';
import Tabs from '@components/user/FAQ/Tabs';
import CardOrder from '@components/user/MyTicketSales/CardOrder';
import ModalCancelListing from '@components/user/MyTicketSales/ModalCancelListing';
import ModalDeliveryInfo from '@components/user/MyTicketSales/ModalDeliveryInfo';
import ModalSendPin from '@components/user/MyTicketSales/ModalSendPin';
import { TicketSaleStatus } from '@constants/codeConstants';
import useAddParams from '@hooks/useAddParams';
import useDebounce from '@hooks/useDebounce';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import { getOffset } from '@utils/table';
import { SearchNormal1 } from 'iconsax-react';
import { OrderSaleType } from 'interface/user';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const tabs = [
  {
    title: 'user.sellTicketTab.all',
    key: TicketSaleStatus.ALL,
  },
  {
    title: 'user.sellTicketTab.pending',
    key: TicketSaleStatus.PENDING,
  },
  {
    title: 'user.sellTicketTab.listing',
    key: TicketSaleStatus.IS_LISTING,
  },
  {
    title: 'user.sellTicketTab.paymentCompleted',
    key: TicketSaleStatus.PAYMENT_COMPLETED,
  },
  {
    title: 'user.sellTicketTab.onShipping',
    key: TicketSaleStatus.ON_SHIPPING,
  },
  {
    title: 'user.sellTicketTab.completed',
    key: TicketSaleStatus.TRANSACTION_COMPLETED,
  },
  {
    title: 'user.sellTicketTab.expired',
    key: TicketSaleStatus.EXPIRED,
  },

  {
    title: 'user.sellTicketTab.cancelled',
    key: TicketSaleStatus.CANCEL,
  },
];
type UrlParamsFilter = {
  keyword: string;
  page: string;
  statuses: keyof typeof TicketSaleStatus;
};
const MyTicketSales = () => {
  /** * use hook */
  const { addParamsUrl, getParamUrl } = useAddParams();
  const { t } = useTranslation();
  const debounce = useDebounce();
  const params = getParamUrl<UrlParamsFilter>();

  /** * use state */
  const [tabActive, setTabActive] = useState<string>(
    String(params?.statuses || TicketSaleStatus.ALL)
  );
  const [orders, setOrders] = useState<OrderSaleType[]>([]);
  const [keyword, setKeyword] = useState(String(params?.keyword || ''));
  const [search, setSearch] = useState(String(params?.keyword || ''));
  const [paginate, setPaginate] = useState<PaginationTable>({
    current: Number(params?.page || 1),
    pageSize: 10,
    totalElement: 0,
  });
  const [cancelListingModel, setCancelListingModel] =
    useState<OrderSaleType | null>(null);
  const [sendPinModel, setSendPinModel] = useState<OrderSaleType | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<OrderSaleType | null>(null);

  const handleOnTabsChange = (activeKey: string) => {
    setTabActive(activeKey);
    setPaginate({
      ...paginate,
      current: 1,
    });
    addParamsUrl({ statuses: activeKey, page: 1 });
  };

  /** * on search input change */
  const handleInputOnChange = async (v: ChangeEvent<HTMLInputElement>) => {
    setSearch(v.target.value);
    setPaginate({
      ...paginate,
      current: 1,
    });
    debounce(() => {
      setKeyword(v.target.value);
      addParamsUrl({
        keyword: v.target.value,
        statuses: params?.statuses || '',
        page: 1,
      });
    });
  };

  /** * * Fetching data */
  const fetchOrders = async () => {
    try {
      const res = await userService.getTicketSales({
        keyword,
        statuses: tabActive,
        offset: getOffset(paginate.current, paginate.pageSize),
        limit: paginate.pageSize,
      });

      setOrders(res.data.data);
      setPaginate({
        ...paginate,
        totalElement: res?.data?.length || 0,
      });
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [keyword, tabActive, paginate.current]);

  const onShowCancelListing = (item: OrderSaleType) => {
    setCancelListingModel(item);
  };

  const onShowSendPin = (item: OrderSaleType) => {
    setSendPinModel(item);
  };

  const onShowSendTicket = (item: OrderSaleType) => {
    setDeliveryInfo(item);
  };

  /**
   * Handle set open/hide modal cancel listing
   * isReload = true : Reload data when canceling listing success.
   * @param isReload boolean
   */
  const onHideCancelListing = (isReload = false) => {
    setCancelListingModel(null);

    if (isReload) {
      fetchOrders();
    }
  };

  /**
   * Handle set open/hide modal send pin
   * isReload = true : Reload data when send pin success.
   * @param isReload boolean
   */
  const onHideSendPin = (isReload = false) => {
    setSendPinModel(null);

    if (isReload) {
      fetchOrders();
    }
  };

  /**
   * Handle set open/hide modal delivery info
   * isReload = true : Reload data when send delivery info success.
   * @param isReload boolean
   */
  const onHideDeliveryInfo = (isReload = false) => {
    setDeliveryInfo(null);

    if (isReload) {
      fetchOrders();
    }
  };

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

  return (
    <S.Container>
      <H5>{t('user.myTicketSales')}</H5>
      <S.OrderContainer>
        <Tabs
          onChange={handleOnTabsChange}
          defaultActiveKey={tabActive}
          items={tabs.map((tab: { title: string; key: string }) => ({
            label: t(tab.title),
            key: tab.key,
            children: (
              <S.TabContent>
                <Input
                  value={search}
                  allowClear
                  placeholder={t('user.placeholderSearchOrder')}
                  prefix={<SearchNormal1 size="20" color="#FFFFFF" />}
                  onChange={handleInputOnChange}
                />
                <div className="orders-container">
                  {orders.map((order: OrderSaleType, index: number) => (
                    <CardOrder
                      key={`${order.orderNumber}_${String(index)}`}
                      item={order}
                      onShowCancelListing={onShowCancelListing}
                      onShowSendPin={onShowSendPin}
                      onShowSendTicket={onShowSendTicket}
                    />
                  ))}
                  <Pagination
                    onChangePage={onChangePage}
                    paginationTable={{
                      totalElement: paginate.totalElement,
                      current: paginate.current,
                      pageSize: paginate.pageSize,
                    }}
                  />
                </div>
              </S.TabContent>
            ),
          }))}
        />
        {cancelListingModel && (
          <ModalCancelListing
            open={cancelListingModel !== null}
            ticketNumber={cancelListingModel.ticketNumber}
            onHideCancelListing={onHideCancelListing}
          />
        )}
        {sendPinModel && (
          <ModalSendPin
            open={sendPinModel !== null}
            onHideSendPin={onHideSendPin}
            item={sendPinModel as OrderSaleType}
          />
        )}

        {deliveryInfo && (
          <ModalDeliveryInfo
            open={deliveryInfo !== null}
            onHideDeliveryInfo={onHideDeliveryInfo}
            item={deliveryInfo as OrderSaleType}
          />
        )}
      </S.OrderContainer>
    </S.Container>
  );
};

export default MyTicketSales;
