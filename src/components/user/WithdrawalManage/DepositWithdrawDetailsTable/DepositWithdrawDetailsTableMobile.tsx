import Pagination, { PaginationTable } from '@components/common/Pagination';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { WithdrawDetail } from 'interface/withdraw';
import { currencyFormat } from '@utils/currency';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type Props = {
  data: WithdrawDetail[];
  pageTable: PaginationTable;
  handleChangePage: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
};

const DepositWithdrawDetailsTableMobile = (props: Props) => {
  const theme = useTheme() as DefaultTheme;
  const { t } = useTranslation();
  const { data, pageTable, handleChangePage } = props;
  return (
    <S.WrapperMobile>
      {data?.map((item) => (
        <S.WrapperMobileItem key={item?.id}>
          <div className="item">
            <div>{t('user.requestDate')}</div>
            <div>{dayjs(item?.createdAt).format('YYYY.MM.DD HH:mm:ss')}</div>
          </div>
          <div className="item">
            <div>{t('user.details')}</div>
            <div>{item?.details}</div>
          </div>

          <div className="item">
            <div>{t('user.accumulate')}</div>
            <div>
              <div style={{ color: theme.colors.primary500 }}>
                {currencyFormat(item?.accumulate || 0)}
              </div>
            </div>
          </div>

          <div className="item">
            <div>{t('user.withdrawUse')}</div>
            <div style={{ color: theme.colors.lightRed }}>
              {currencyFormat(item?.withdraw || 0)}
            </div>
          </div>
          <div className="item">
            <div>{t('user.balance')}</div>
            <div>{currencyFormat(item?.balance || 0)}</div>
          </div>
        </S.WrapperMobileItem>
      ))}
      <Pagination paginationTable={pageTable} onChangePage={handleChangePage} />
    </S.WrapperMobile>
  );
};

export default DepositWithdrawDetailsTableMobile;
