import BackButton from '@components/common/BackButton';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { message } from 'antd';
import { Add, Edit2 } from 'iconsax-react';
import { BaseResponseErrorType, ResponseListModel } from 'interface';
import { AddressType, FormAddresstype } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ModalAddress from '../ModalAddress';
import { BtnEdit } from '../MyInformation/style';
import * as S from './style';

const MyAddress = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [dataSource, setDataSource] = useState<AddressType[]>([]);
  const [model, setModel] = useState<AddressType | null>(null);
  const loadAddress = async () => {
    try {
      const res: ResponseListModel<AddressType> =
        await userService.getAddress();
      setDataSource(res.data?.data || []);
      // setDataSource([]);
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    loadAddress();
  }, []);

  const handleCloseModal = (): void => {
    setOpenModal(false);
    setModel(null);
  };

  const handleOpenModal = async (item: AddressType) => {
    await setModel(item);
    await setOpenModal(true);
  };

  const onFinish = async (values: FormAddresstype) => {
    try {
      if (model) {
        await userService.updateAddress(Number(model?.id), values);
      } else {
        await userService.createAddress(values);
      }
    } catch (err) {
      const error = err as BaseResponseErrorType<null>;
      message.error(error?.response?.data?.message);
    }
    await setModel(null);
    await handleCloseModal();
    await loadAddress();
  };

  return (
    <>
      <BackButton link={location.pathname} label={t('user.myPage')} />
      <S.Container>
        <H5>{t('user.address')}</H5>
        <S.Wrapper>
          {dataSource.map((item: AddressType) => (
            <S.Address key={item.id}>
              <S.Content>
                <S.Text color={theme.colors.surfaceHight}>
                  {item.name} | {item.phone}
                </S.Text>
                <S.Text color={theme.colors.surfaceMedium}>
                  {item.address}
                </S.Text>
                {item.isDefault && <S.Default>Default</S.Default>}
              </S.Content>
              <BtnEdit
                bg={theme.colors.surfaceDark}
                onClick={() => handleOpenModal(item)}
              >
                <Edit2 size="16" />
              </BtnEdit>
            </S.Address>
          ))}
        </S.Wrapper>
        <S.Btn border="1" onClick={() => setOpenModal(true)}>
          {t('user.addNewAddress')} <Add size="16" variant="Outline" />
        </S.Btn>

        {openModal && (
          <ModalAddress
            title={openModal ? t('user.editAddress') : t('user.addNewAddress')}
            open={openModal}
            initialValues={model}
            onCancel={handleCloseModal}
            onSubmit={onFinish}
          />
        )}
      </S.Container>
    </>
  );
};

export default MyAddress;
