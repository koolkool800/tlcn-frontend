import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import Pagination, { PaginationTable } from '../Pagination';
import * as S from './style';

interface PropsTable {
  columns: ColumnsType<any>;
  data: any[];
  hiddenPagination?: boolean;
  loading?: boolean;
  pageTable: PaginationTable;
  locale?: any;
  handleChangePage: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
  rowKey?: string;
}

const DataTable = ({
  columns,
  data,
  hiddenPagination = false,
  loading,
  pageTable,
  handleChangePage,
  rowKey = 'id',
  ...restProps
}: PropsTable) => {
  const { t } = useTranslation();
  return (
    <>
      <S.TableAnt
        rowKey={rowKey}
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        locale={{
          emptyText: `${t('common.emptyText')}`,
        }}
        {...restProps}
      />
      {!hiddenPagination && (
        <Pagination
          paginationTable={pageTable}
          onChangePage={handleChangePage}
        />
      )}
    </>
  );
};

export default DataTable;
