import { useAppDispatch } from '@hooks/useAppDispatch';
import { setProfile } from '@redux/reducer/userReducer';
import userService from '@services/userService';
import { Add } from 'iconsax-react';
import { ResponseModel } from 'interface';
import { UserType } from 'interface/user';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import ModalAddBankAccount from '../ModalAddBankAccount';
import * as S from './styles';

type Props = {
  bankName: string | undefined;
  accountNumber: string | undefined;
};

function BankAccountInfo({ bankName, accountNumber }: Props) {
  const dispatch = useAppDispatch();
  const [modalAdd, setModalAdd] = useState(false);
  const { t } = useTranslation();

  const callbackLoadProfile = async () => {
    try {
      /** reload profile after success */
      const resProfile: ResponseModel<UserType> =
        await userService.getProfile();
      dispatch(setProfile(resProfile?.data || null));
    } catch (err) {
      /* empty */
    }
  };
  return (
    <S.Wrapper>
      <S.WrapperHeader>
        <S.Title>{t('user.bankAccount')}</S.Title>
        {bankName && (
          <S.ChangeAction onClick={() => setModalAdd(true)}>
            {t('user.change')}
          </S.ChangeAction>
        )}
      </S.WrapperHeader>
      {bankName ? (
        <>
          <div className="input">
            <Input placeholder="" value={bankName} />
            <Input placeholder="" value={accountNumber} />
          </div>
        </>
      ) : (
        <S.AddNewBankAccount onClick={() => setModalAdd(true)}>
          <span>{t('user.addNewBankAccount')}</span> <Add />
        </S.AddNewBankAccount>
      )}

      <ModalAddBankAccount
        open={modalAdd}
        setOpen={() => setModalAdd(false)}
        callbackSuccess={callbackLoadProfile}
      />
    </S.Wrapper>
  );
}

export default BankAccountInfo;
