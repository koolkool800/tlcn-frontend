import Modal from '@components/common/ModalConfirm';
import ModalCancelListing from '@components/user/MyTicketSales/ModalCancelListing';
import { ROUTES } from '@constants/routes';
import useAuth from '@hooks/useAuth';
import { Desc } from '@pages/EventDetail/styles';
import paymentService from '@services/paymentService';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import { currencyFormat } from '@utils/currency';
import { paymentEximbay } from '@utils/eximbay';
import { ResponseModel } from 'interface';
import { OutSiteTicketFilterType, OutSiteType } from 'interface/outSiteTicket';
import { UserType } from 'interface/user';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import Button from '../../common/Button';
import DataTable from '../../common/DataTable';
import * as S from './styles';

type Props = {
  isPaginate?: boolean;
  dataSource: any[];
  filter: OutSiteTicketFilterType | any;
  setCancelListing?: (arg0: boolean) => void;
  handleChangePage: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
};

const TableClearance = ({
  isPaginate,
  dataSource,
  filter,
  setCancelListing,
  handleChangePage,
}: Props) => {
  const user = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme() as DefaultTheme;
  const [openModal, setOpenModal] = useState(false);
  const [userProfile, setUserProfile] = useState<UserType | null>(null);
  const [cancelListingModal, setCancelListingModel] = useState<boolean>(false);

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
    if (user.accessToken) {
      loadUserProfile();
    }
  }, []);

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
   * func get fgkey user
   * @returns {Promise<any>}
   */
  const getFgkeyUser = async (): Promise<any> => {
    try {
      const res: ResponseModel<any> = await paymentService.getFgkey();

      return res.data;
    } catch (err: any) {
      return err;
    }
  };

  const handlePayment = async () => {
    try {
      const dataOrder: ResponseModel<any> = await getFgkeyUser();
      await paymentEximbay(dataOrder);
    } catch (err: any) {
      // return err;
    }
  };
  /** * * Onclick buy ticket button */
  const onBuy = (item: OutSiteType) => {
    if (userProfile) {
      if (userProfile?.totalBalance < 0) {
        handleOpenModal();
        return;
      }
      if (item?.ticket?.deliveryMethod?.length > 1) {
        navigate(`${ROUTES.TICKET_SELECT_TRANSACTION}/${item.id}`);
        return;
      }
      const method = item?.ticket?.deliveryMethod?.join() as string;
      navigate(ROUTES.ORDER_TICKET(String(item.id) as string, method));
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  const columns = [
    {
      title: <span className="heading">{t('home.event')}</span>,
      dataIndex: 'eventName',
      key: 'eventName',
      render: (value: string) => <div style={{ width: 180 }}>{value}</div>,
    },
    {
      title: <span className="heading">{t('home.performer')}</span>,
      dataIndex: 'performer',
      key: 'performer',
    },
    {
      title: <span className="heading">{t('home.place')}</span>,
      dataIndex: 'place',
      key: 'place',
      render: (value: string) => <div style={{ width: 120 }}>{value}</div>,
    },
    {
      title: <span className="heading">{t('home.useDate')}</span>,
      dataIndex: 'performanceDate',
      key: 'performanceDate',
      render: (value: string) => <div style={{ width: 120 }}>{value}</div>,
    },
    {
      title: <span className="heading">{t('home.seatPosition')}</span>,
      dataIndex: 'seatInformation',
      key: 'seatInformation',
      render: (value: string) => <div style={{ width: 120 }}>{value}</div>,
    },
    {
      title: <span className="heading">{t('home.deliveryMethod')}</span>,
      dataIndex: 'ticket',
      key: 'ticket',
      render: (_: string, item: OutSiteType) => (
        <div style={{ width: 120 }}>
          {item?.ticket?.deliveryMethod.map((deliveryMethod: string) => {
            return (
              <span
                key={deliveryMethod}
                className={`shipping-type-tag ${
                  deliveryMethod === 'PIN_TRANSACTION'
                    ? 'pin-transaction'
                    : 'seller-shipment'
                }`}
              >
                {t(`common.${deliveryMethod}`)}
              </span>
            );
          })}
        </div>
      ),
    },
    {
      title: <span className="heading">{t('home.price')}</span>,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (_: string, item: OutSiteType) =>
        currencyFormat(Number(item.totalPrice || 0)),
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (_: string, _record: OutSiteType) => {
        const isCancelList = Number(_record?.authorId) === userProfile?.id;

        return (
          <div className="btn-action">
            {isCancelList ? (
              <Button
                color={theme.colors.lightGrey}
                bgcolor={theme.colors.feedbackError600}
                onClick={() => {
                  setCancelListingModel(true);
                }}
              >
                {t('home.cancelList')}
              </Button>
            ) : (
              <Button
                color={theme.colors.black}
                bgcolor={theme.colors.purple200}
                onClick={() => onBuy(_record)}
              >
                {t('home.buy')}
              </Button>
            )}

            {isCancelList && (
              <ModalCancelListing
                open={cancelListingModal}
                ticketNumber={_record?.id}
                onHideCancelListing={() => {
                  setCancelListingModel(false);
                  setCancelListing?.(true);
                }}
              />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <S.WrapperTable>
      <DataTable
        columns={columns}
        data={dataSource}
        pageTable={{
          totalElement: filter?.totalElement,
          current: filter?.page,
          pageSize: filter?.limit,
        }}
        handleChangePage={handleChangePage}
      />

      <Modal isOpen={openModal} hiddenIcon={false} onCancel={handleCloseModal}>
        <>
          <div className="content-modal">
            <H5>{t('payment.title')}</H5>
            <Desc>
              {t('payment.description', {
                totalBalance:
                  userProfile && currencyFormat(userProfile.totalBalance * -1),
              })}
            </Desc>
          </div>

          <Button
            size="large"
            maxwidth="384"
            color={theme.colors.black}
            bgcolor={theme.colors.primary500}
            onClick={handlePayment}
          >
            {t('payment.pay')}
          </Button>
        </>
      </Modal>
    </S.WrapperTable>
  );
};

export default React.memo(TableClearance);
