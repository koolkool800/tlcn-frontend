import { H6, Typography } from '../../../../style/DefaultStyled';
import DataTable from '../../../common/DataTable';
import * as S from './style';

// TODO:
const columns = [
  {
    title: 'Order number',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
  },
  {
    title: 'Order date',
    dataIndex: 'orderDate',
    key: 'orderDate',
  },
  {
    title: 'Product information',
    dataIndex: 'productInformation',
    key: 'productInformation',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Transaction method',
    dataIndex: 'transactionMethod',
    key: 'transactionMethod',
  },
  {
    title: 'Transaction status',
    dataIndex: 'transactionStatus',
    key: 'transactionStatus',
  },
  {
    title: '',
    dataIndex: '',
    key: 'action',
    render: (_: any, _record: any) => {
      return (
        <>
          {_record?.transactionStatus === 'confirm' && (
            <S.Btn
              onClick={() => {
                console.log('hihi', _record);
              }}
            >
              Confirm
            </S.Btn>
          )}
        </>
      );
    },
  },
];
const dataSource = [
  {
    key: '1',
    orderNumber: '2520777',
    orderDate: '2023.05.23',
    productInformation: 'Taeyeon 2023 -Seoul The odd of love',
    amount: '1',
    transactionMethod: 'PIN transaction',
    transactionStatus: 'Delivery completed',
  },
  {
    key: '2',
    orderNumber: '2520777',
    orderDate: '2023.05.23',
    productInformation: 'Taeyeon 2023 -Seoul The odd of love',
    amount: '1',
    transactionMethod: 'PIN transaction',
    transactionStatus: 'confirm',
  },
  {
    key: '3',
    orderNumber: '2520777',
    orderDate: '2023.05.23',
    productInformation: 'Taeyeon 2023 -Seoul The odd of love',
    amount: '1',
    transactionMethod: 'PIN transaction',
    transactionStatus: 'Delivery completed',
  },
];
const TablePurchases = () => {
  const handleChangePage = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    console.log({
      page,
      pageSize,
    });
  };
  return (
    <div>
      <div style={{ display: 'flex', gap: 32 }}>
        <H6>Recently product sold</H6>
        <Typography>last 6 month</Typography>
      </div>
      <DataTable
        columns={columns}
        data={dataSource}
        pageTable={{
          totalElement: 4,
          current: 1,
          pageSize: 2,
        }}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default TablePurchases;
