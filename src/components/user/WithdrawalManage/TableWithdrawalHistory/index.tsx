import DataTable from '@components/common/DataTable';
import { currencyFormat } from '@utils/currency';
import { getOffset, getPage } from '@utils/table';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { ObjectLiteral } from 'interface/general';
import { WithdrawDetail, WithdrawHistory } from 'interface/withdraw';
import lodash from 'lodash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

type Props = {
  resources: WithdrawHistory[];
  paginate: ObjectLiteral;
  setPaginate: (paginate: ObjectLiteral) => void;
};

const TableWithdrawalHistory = ({
  resources,
  paginate,
  setPaginate,
}: Props) => {
  const { t } = useTranslation();

  const handleChangePage = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    setPaginate({
      ...paginate,
      offset: getOffset(page, pageSize),
      limit: pageSize,
    });
  };

  const columns: ColumnsType<WithdrawDetail> = useMemo(() => {
    return [
      {
        title: t('user.requestDate'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 140,
        render: (value: string) => (
          <>
            <div>{dayjs(value).format('YYYY-MM-DD')}</div>
            <div>{dayjs(value).format('hh:mm:ss')}</div>
          </>
        ),
      },
      {
        title: t('user.requestAmount'),
        dataIndex: 'amount',
        key: 'amount',
        className: 'detail-cell',
        render: (data: number) => {
          return currencyFormat(data || 0);
        },
      },
      {
        width: 120,
        title: t('user.status'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (data: string) => {
          return (
            <S.Status status={data}>
              <div className="dot" />
              <div>{lodash.capitalize(data)}</div>
            </S.Status>
          );
        },
      },
    ];
  }, []);

  return (
    <DataTable
      columns={columns}
      data={resources}
      pageTable={{
        totalElement: paginate?.length || 0,
        current: getPage(paginate?.offset, paginate?.limit),
        pageSize: paginate?.limit || 10,
      }}
      handleChangePage={handleChangePage}
    />
  );
};

export default TableWithdrawalHistory;
