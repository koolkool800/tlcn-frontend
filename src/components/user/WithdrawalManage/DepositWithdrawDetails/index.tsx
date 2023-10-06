import Tabs from '@components/user/FAQ/Tabs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DepositWithdrawDetailsTable from '../DepositWithdrawDetailsTable';
import WithdrawRequestHistory from '../WithdrawRequestHistory';
import * as S from './style';

const TAB_LIST = {
  withdrawDetail: 'withdrawDetail',
  withdrawHistory: 'withdrawHistory',
};

const DepositWithdrawDetails = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(TAB_LIST.withdrawDetail);
  const totalBalance = useSelector(
    (state: { withDraw: { totalBalance: number } }) =>
      state.withDraw.totalBalance
  );
  return (
    <div>
      <S.Wrapper>
        <S.TabWrapper>
          <Tabs
            onChange={(activeKey: string) => {
              setActiveTab(activeKey);
            }}
            items={[
              {
                label: t('user.depositWithdrawDetails'),
                key: TAB_LIST.withdrawDetail,
              },
              {
                label: t('user.withdrawHistory'),
                key: TAB_LIST.withdrawHistory,
              },
            ]}
          />
        </S.TabWrapper>
      </S.Wrapper>
      {TAB_LIST.withdrawDetail === activeTab && (
        <DepositWithdrawDetailsTable totalBalance={totalBalance} />
      )}
      {TAB_LIST.withdrawHistory === activeTab && (
        <WithdrawRequestHistory totalBalance={totalBalance} />
      )}
    </div>
  );
};

export default DepositWithdrawDetails;
