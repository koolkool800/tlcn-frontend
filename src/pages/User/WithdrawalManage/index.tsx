import DepositWithdrawDetails from '@components/user/WithdrawalManage/DepositWithdrawDetails';
import WithdrawalContent from '@components/user/WithdrawalManage/WithdrawalContent';
import { H5 } from '@style/DefaultStyled';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const WithdrawalManage = () => {
  const { t } = useTranslation();
  return (
    <S.Container>
      <H5>{t('user.withdrawalManage')}</H5>
      <WithdrawalContent />
      <DepositWithdrawDetails />
    </S.Container>
  );
};

export default WithdrawalManage;
