import DataTable from '@components/common/DataTable';
import { PaginationTable } from '@components/common/Pagination';
import { ROUTE_USER } from '@constants/routes';
import useDimensions from '@hooks/useDimensions';
import userService from '@services/userService';
import { dateTimeFormatString } from '@utils/format';
import { getOffset } from '@utils/table';
import { ColumnsType } from 'antd/es/table';
import { InquiryType } from 'interface/user';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from '../../../../i18n';
import FormFilterInquiry from '../FormInquiryFilter';
import MobileTableInquiry from './MobileTableInquiry';
import * as S from './style';

export const STATUS: any = {
  PENDING: 'Pending',
  REPLIED: 'Replied',
};

const TableInquiry = () => {
  const { isMobile } = useDimensions();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const params = queryString.parse(location.search);

  const [resources, setResources] = useState<InquiryType[]>([]);
  const [paginate, setPaginate] = useState<PaginationTable>({
    current: Number(params?.page || 1),
    pageSize: 10,
    totalElement: 0,
  });
  const [search, setSearch] = useState<string>(String(params?.keyword || ''));
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(false);
    try {
      const res = await userService.getInquiry({
        offset: getOffset(paginate.current, paginate.pageSize),
        limit: paginate.pageSize,
        keyword: search,
      });

      setResources(res?.data?.data || []);
      setPaginate({
        ...paginate,
        totalElement: res?.data?.length || 0,
      });
    } catch (err) {
      /* empty */
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginate.current, paginate.pageSize, search]);

  const handleChangePage = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    setPaginate({
      ...paginate,
      current: page,
      pageSize,
    });
  };

  /** * * Go to page detail */
  const onDetail = (id: string) => {
    navigate(`${ROUTE_USER.USER_INQUIRY}/${id}`);
  };

  const columns: ColumnsType<InquiryType> = [
    {
      title: i18n.t('user.createdDate'),
      dataIndex: 'createdAt',
      width: 200,
      render: (_: number, record: InquiryType) => {
        return (
          <div>
            <p>{dateTimeFormatString(record.createdAt, 'YYYY.MM.DD')}</p>
            <p>{dateTimeFormatString(record.createdAt, 'HH:mm:ss')}</p>
          </div>
        );
      },
    },

    {
      title: i18n.t('user.title'),
      dataIndex: 'title',
    },
    {
      title: i18n.t('user.status'),
      dataIndex: 'status',
      align: 'center',
      render: (_: number, record: InquiryType) => {
        return (
          <S.Status>
            <div className={`${record.status} status`}>
              {STATUS[record.status]}
            </div>
          </S.Status>
        );
      },
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'action',
      width: '100px',
      render: (_: number, _record: InquiryType) => {
        return (
          <>
            <S.Btn
              onClick={() => {
                onDetail(String(_record?.id || ''));
              }}
            >
              {i18n.t('user.detail')}
            </S.Btn>
          </>
        );
      },
    },
  ];

  return (
    <>
      <FormFilterInquiry search={search} setSearchValue={setSearch} />

      <S.Wrapper>
        {isMobile ? (
          <MobileTableInquiry
            loading={loading}
            data={resources}
            pageTable={{
              totalElement: paginate.totalElement,
              current: paginate.current,
              pageSize: paginate.pageSize,
            }}
            handleChangePage={handleChangePage}
            onDetail={onDetail}
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
      </S.Wrapper>
    </>
  );
};

export default TableInquiry;
