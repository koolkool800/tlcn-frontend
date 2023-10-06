import { PaginationTable } from '@components/common/Pagination';
import useDimensions from '@hooks/useDimensions';
import userService from '@services/userService';
import { getOffset } from '@utils/table';
import dayjs from 'dayjs';
import { Eye } from 'iconsax-react';
import { ResponseListModel } from 'interface';
import { PinReceivedType } from 'interface/user';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../../common/DataTable';
import ModalViewPin from '../ModalViewPin';
import * as S from './style';
import MobileTablePinReceived from './MobileTablePinReceived';

const TablePinReceived = () => {
  const { isMobile } = useDimensions();
  const { t } = useTranslation();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [viewPin, setViewPin] = useState<string[] | null>(null);
  const [resources, setResource] = useState<PinReceivedType[]>([]);
  const [paginate, setPaginate] = useState<PaginationTable>({
    current: Number(params?.page || 1),
    pageSize: 10,
    totalElement: 0,
  });

  /** * push params to browser */
  const pushParams = () => {
    navigate({
      pathname: '',
      search: queryString.stringify(
        { page: paginate.current },
        { arrayFormat: 'comma' }
      ),
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res: ResponseListModel<PinReceivedType> =
        await userService.getPinReceived({
          offset: getOffset(paginate.current, paginate.pageSize),
          limit: paginate.pageSize,
        });
      setResource(res?.data.data || []);
      setPaginate({
        ...paginate,
        totalElement: res?.data?.length || 0,
      });

      pushParams();
    } catch (err) {
      /* empty */
    }
    setLoading(false);
  };

  const fetchPinDetail = async (id: number) => {
    setLoading(true);
    try {
      const resPinDetail = await userService.getPinReceivedDetail(id);
      setViewPin(resPinDetail?.data?.pinNumbers || []);
    } catch (err) {
      /* empty */
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginate?.current, paginate?.pageSize]);

  const handleChangePage = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    setPaginate((pre) => ({
      ...pre,
      current: page,
      pageSize,
    }));
  };

  const columns = useMemo(() => {
    return [
      {
        title: t('user.orderNumber'),
        dataIndex: 'orderNumber',
        key: 'orderNumber',
      },
      {
        title: t('user.orderDate'),
        dataIndex: 'orderDate',
        key: 'orderDate',
        render: (value: string) => {
          return dayjs(value).format('YYYY.MM.DD');
        },
      },
      {
        title: t('user.productInformation'),
        dataIndex: 'productInformation',
        key: 'productInformation',
        render: (_: string, record: PinReceivedType) => {
          return `${record?.productInformation?.title} - ${record?.productInformation?.place}`;
        },
      },
      {
        title: t('user.pinCodeTitle'),
        dataIndex: 'pinCode',
        key: 'pinCode',
        render: () => {
          return '*******';
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'action',
        render: (_: string, _record: PinReceivedType) => {
          return (
            <S.Action>
              <S.Btn onClick={() => fetchPinDetail(_record.ticketId)}>
                <Eye size="16" />
              </S.Btn>
              {/* <S.Btn>
                <Copy size="16" />
              </S.Btn> */}
            </S.Action>
          );
        },
      },
    ];
  }, []);

  return (
    <S.ContainerPinReceived>
      <ModalViewPin
        listPin={viewPin as string[]}
        open={viewPin !== null}
        onCancel={() => setViewPin(null)}
      />
      {isMobile ? (
        <MobileTablePinReceived
          loading={loading}
          data={resources}
          pageTable={{
            totalElement: paginate.totalElement,
            current: paginate.current,
            pageSize: paginate.pageSize,
          }}
          handleChangePage={handleChangePage}
        />
      ) : (
        <DataTable
          loading={loading}
          columns={columns}
          data={resources}
          pageTable={{
            totalElement: paginate.totalElement,
            current: paginate.current,
            pageSize: paginate.pageSize,
          }}
          handleChangePage={handleChangePage}
        />
      )}
    </S.ContainerPinReceived>
  );
};

export default TablePinReceived;
