import Pagination, { PaginationTable } from '@components/common/Pagination';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { WithdrawHistory } from 'interface/withdraw';
import { currencyFormat } from '@utils/currency';
import lodash from 'lodash';
import * as S from './style';

type Props = {
  data: WithdrawHistory[];
  pageTable: PaginationTable;
  handleChangePage: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
};

const DepositWithdrawHistoryTableMobile = (props: Props) => {
  const { t } = useTranslation();
  const { data, pageTable, handleChangePage } = props;
  return (
    <S.WrapperMobile>
      {data?.map((item) => (
        <S.WrapperMobileItem key={item?.id}>
          <div className="item">
            <div>{t('user.date')}</div>
            <div>{dayjs(item?.createdAt).format('YYYY.MM.DD HH:mm:ss')}</div>
          </div>
          <div className="item">
            <div>{t('user.requestAmount')}</div>
            <div>{currencyFormat(item?.amount || 0)}</div>
          </div>

          <div className="item">
            <div>{t('user.status')}</div>
            <div>
              <S.Status status={item?.status}>
                <div className="dot" />
                <div>{lodash.capitalize(item?.status)}</div>
              </S.Status>
            </div>
          </div>
        </S.WrapperMobileItem>
      ))}
      <Pagination paginationTable={pageTable} onChangePage={handleChangePage} />
    </S.WrapperMobile>
  );
};

export default DepositWithdrawHistoryTableMobile;
