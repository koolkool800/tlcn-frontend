import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, useTheme } from 'styled-components';
import Button from '../Button';
import Input from '../Input';
import Modal from '../ModalConfirm';
import Select from '../Select';
import * as S from './styles';

type Props = {
  open: boolean;
  setOpen: () => void;
  callbackSuccess?: () => void;
};

function ModalAddBankAccount({ open, setOpen, callbackSuccess }: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const theme = useTheme() as DefaultTheme;
  const [loading, setLoading] = useState(false);
  const [bankSystem, setBankSystem] = useState<
    { bankCode: string; bankName: string; id: number }[]
  >([]);
  const fetchData = async () => {
    try {
      const res = await userService.getBankAccountSystem();
      setBankSystem(res?.data || []);
    } catch (er) {
      /* empty */
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const onSubmit = async (values: {
    availableBankId: number;
    accountNumber: string;
    name: string;
  }) => {
    setLoading(true);
    try {
      const res = await userService.addBankAccount({
        ...values,
      });
      if (res?.result) {
        message.success(t('user.addBankAccountSuccess'));

        if (callbackSuccess) {
          callbackSuccess();
        }
        setOpen();
      }
    } catch (error: any) {
      message.error(error.response?.data.message);
    }

    setLoading(false);
  };

  return (
    <Modal isOpen={open} onCancel={setOpen} hiddenIcon={false}>
      <S.Wrapper>
        <H5>{t('user.changeWithdrawAccount')}</H5>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="availableBankId"
            label={t('user.selectBank')}
            rules={[{ required: true, message: t('user.selectBankRequired') }]}
          >
            <Select
              placeholder={t('user.chooseBank')}
              options={bankSystem}
              fieldNames={{ label: 'bankName', value: 'id' }}
            />
          </Form.Item>
          <Form.Item
            label={t('user.accountNumber')}
            name="accountNumber"
            rules={[
              { required: true, message: t('user.accountNumberRequired') },
            ]}
          >
            <Input placeholder={t('user.accountNumberPlaceholder')} />
          </Form.Item>
          <Form.Item
            label={t('user.bankCode')}
            name="name"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: t('user.bankCodeRequired') }]}
          >
            <Input placeholder={t('user.bankCodePlaceholder')} />
          </Form.Item>
        </Form>
        <Button
          loading={loading}
          bgcolor={theme.colors.primary500}
          color={theme.colors.black}
          onClick={() => form.submit()}
        >
          {t('user.add')}
        </Button>
      </S.Wrapper>
    </Modal>
  );
}

export default ModalAddBankAccount;
