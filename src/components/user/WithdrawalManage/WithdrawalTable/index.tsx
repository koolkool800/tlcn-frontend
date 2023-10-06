import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from '@components/common/DataTable';
import theme from '@style/themes/default';
import { ColumnsType } from 'antd/es/table';
import { WithdrawDetail } from 'interface/withdraw';
import { ObjectLiteral } from 'interface/general';
import dayjs from 'dayjs';
import { currencyFormat } from '@utils/currency';
import { getOffset, getPage } from '@utils/table';

type Props = {
  resources: WithdrawDetail[];
  paginate: ObjectLiteral;
  setPaginate: (paginate: ObjectLiteral) => void;
};

const TableWithdrawal = ({ resources, paginate, setPaginate }: Props) => {
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
        title: t('user.date'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 83,
        render: (value: string) => (
          <div style={{ width: 100 }}>
            <div>{dayjs(value).format('YYYY-MM-DD')}</div>
            <div>{dayjs(value).format('hh:mm:ss')}</div>
          </div>
        ),
      },
      {
        title: t('user.details'),
        dataIndex: 'details',
        key: 'details',
        className: 'detail-cell',
      },
      {
        title: t('user.accumulate'),
        dataIndex: 'accumulate',
        key: 'accumulate',
        render: (data: number) => {
          return (
            <div style={{ color: theme.colors.primary500 }}>
              {data > 0
                ? `+ ${currencyFormat(data || 0)}`
                : currencyFormat(data || 0)}
            </div>
          );
        },
      },
      {
        title: t('user.withdrawUse'),
        dataIndex: 'withdraw',
        key: 'withdraw',
        render: (data: number) => {
          return (
            <div style={{ color: theme.colors.lightRed }}>
              {data > 0
                ? `- ${currencyFormat(data || 0)}`
                : currencyFormat(data || 0)}
            </div>
          );
        },
      },
      {
        title: t('user.balance'),
        dataIndex: 'balance',
        key: 'balance',
        align: 'right',
        render: (data: number) => currencyFormat(data || 0),
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

export default TableWithdrawal;
