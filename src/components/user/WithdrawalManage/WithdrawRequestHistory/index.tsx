import userService from '@services/userService';
import { ObjectLiteral } from 'interface/general';
import { WithdrawDetail, WithdrawHistory } from 'interface/withdraw';
import { useEffect, useState } from 'react';
import useDimensions from '@hooks/useDimensions';
import { PaginationTable } from '@components/common/Pagination';
import FormFilterWithdrawal from '../FormFilterWithdrawal';
import TableWithdrawal from '../WithdrawalTable';
import TableWithdrawalHistory from '../TableWithdrawalHistory';
import DepositWithdrawHistoryTableMobile from '../TableWithdrawalHistory/DepositWithdrawHistoryTableMobile';

const WithdrawRequestHistory = ({ totalBalance }: { totalBalance: number }) => {
  const { isMobile } = useDimensions();
  const [resources, setResources] = useState<WithdrawHistory[]>([]);
  const [filter, setFilter] = useState<ObjectLiteral>({
    offset: 0,
    limit: 10,
    length: 0,
    createdAt: '',
  });
  const fetchData = async () => {
    try {
      const res = await userService.getListWithdrawHistory(filter);
      setResources(res?.data?.data || []);
      setFilter({
        ...filter,
        length: res?.data?.length || 0,
      });
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter.page, filter?.createdAt, totalBalance]);

  return (
    <div>
      <FormFilterWithdrawal
        onChange={(date: string) => {
          setFilter({
            ...filter,
            createdAt: date,
          });
        }}
      />
      {isMobile ? (
        <DepositWithdrawHistoryTableMobile
          data={resources}
          pageTable={filter as PaginationTable}
          handleChangePage={setFilter}
        />
      ) : (
        <TableWithdrawalHistory
          resources={resources}
          paginate={filter}
          setPaginate={setFilter}
        />
      )}
    </div>
  );
};

export default WithdrawRequestHistory;
