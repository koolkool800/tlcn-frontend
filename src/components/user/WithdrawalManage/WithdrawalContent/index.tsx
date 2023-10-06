import Button from '@components/common/Button';
import InputNumber from '@components/common/InputNumber';
import ModalAddBankAccount from '@components/common/ModalAddBankAccount';
import userService from '@services/userService';
import { H6 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { currencyFormat } from '@utils/currency';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { Form, message } from 'antd';
import { Add } from 'iconsax-react';
import { ObjectLiteral } from 'interface/general';
import { UserInformationWithdraw } from 'interface/withdraw';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setTotalBalance } from '@redux/reducer/withDraw';
import { useAppDispatch } from '@hooks/useAppDispatch';
import * as S from './style';

const depositList = [
  'user.depositWithdrawGuidelinesDesc1',
  'user.depositWithdrawGuidelinesDesc2',
];
const WithdrawalContent = () => {
  const { t } = useTranslation();
  const [modalAdd, setModalAdd] = useState(false);
  const dispatch = useAppDispatch();
  const [informationWithdraw, setInformationWithdraw] =
    useState<UserInformationWithdraw | null>(null);
  const accountNumber = informationWithdraw?.bankAccount?.accountNumber || '';
  const [loading, setLoading] = useState(false);
  const [canWithdraw, setCanWithdraw] = useState(false);

  const fetchData = async () => {
    try {
      const res = await userService.getUserInformationWithDraw();
      dispatch(setTotalBalance(res.data.totalBalance));
      setInformationWithdraw(res?.data || null);
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values: ObjectLiteral) => {
    setLoading(true);
    try {
      const res = await userService.requestWithdraw({ amount: values?.amount });
      if (res?.result) {
        fetchData();
        // dispatch(setTotalBalance())
        message.success('Withdraw successful');
      }
    } catch (error: any) {
      message.error(error.response?.data.message);
    }
    setLoading(false);
  };
  return (
    <S.Container>
      <S.Left>
        <H6>{t('user.withdrawRequest')}</H6>

        <Form style={{ width: '100%' }} onFinish={onFinish} layout="vertical">
          <S.WithdrawAmount>
            <span>{t('user.totalHolding')}:</span>
            <H6>{currencyFormat(informationWithdraw?.totalBalance || 0)}</H6>
          </S.WithdrawAmount>
          <Form.Item
            label={<S.B1>{t('user.withdrawRequestAmount')}</S.B1>}
            name="amount"
            rules={[
              {
                validator(rule, value, callback) {
                  const numberWithCommas = value;
                  const numberWithNoCommas = numberWithCommas.replace(/,/g, '');
                  const integerValue = parseInt(numberWithNoCommas, 10);
                  if (integerValue <= 0) {
                    setCanWithdraw(false);
                    return Promise.reject(
                      new Error(t('user.withdrawGreater0'))
                    );
                  }
                  if (
                    integerValue >
                    Number(informationWithdraw?.totalBalance || 0)
                  ) {
                    setCanWithdraw(false);
                    return Promise.reject(
                      new Error(t('user.withdrawLessThanTotal'))
                    );
                  }

                  setCanWithdraw(true);
                  return Promise.resolve();
                },
              },
            ]}
            getValueFromEvent={(value) => formatNumberWithCommas(value)}
          >
            <InputNumber
              type="input"
              placeholder={t('user.withdrawRequestAmountPlaceholder')}
            />
          </Form.Item>
          <Form.Item
            label={<S.B1>{t('user.withdrawAccount')}</S.B1>}
            name="paymentAccount"
          >
            {informationWithdraw?.bankAccount?.id ? (
              <S.BankInformation>
                <span>{`${
                  informationWithdraw?.bankAccount?.bankName
                } ****${accountNumber?.substring(
                  4,
                  accountNumber?.length
                )}`}</span>
                <Button onClick={() => setModalAdd(true)}>
                  {t('user.change')}
                </Button>
              </S.BankInformation>
            ) : (
              <S.AddNewBankAccount onClick={() => setModalAdd(true)}>
                <span>{t('user.addNewBankAccount')}</span> <Add />
              </S.AddNewBankAccount>
            )}
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              disabled={!canWithdraw}
              loading={loading}
              htmlType="submit"
              size="large"
              color={theme.colors.black}
              bgcolor={theme.colors.primary500}
            >
              {t('user.requestWithdraw')}
            </Button>
          </Form.Item>
        </Form>
      </S.Left>
      <S.Right>
        <H6>{t('user.depositWithdrawGuidelines')}</H6>
        <S.Ul>
          {depositList.map((value) => (
            <li key={value}>{t(value)}</li>
          ))}
        </S.Ul>
      </S.Right>
      <ModalAddBankAccount
        open={modalAdd}
        setOpen={() => setModalAdd(false)}
        callbackSuccess={fetchData}
      />
    </S.Container>
  );
};

export default WithdrawalContent;
