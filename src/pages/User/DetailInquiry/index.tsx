import CustomLink from '@components/common/CustomLink';
import Form from '@components/user/CreateInquiry';
import { BtnEdit } from '@components/user/MainMyPage/ChangeLanguage/style';
import { ROUTE_USER } from '@constants/routes';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import { ArrowLeft2 } from 'iconsax-react';
import { InquiryType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BackButton from '@components/common/BackButton';
import * as S from '../InquiryCreate/style';

const DetailInquiry = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [model, setModel] = useState<InquiryType | null>(null);

  const fetchData = async () => {
    try {
      const res = await userService.getInquiryDetail(String(params?.id));
      setModel(res?.data);
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  return (
    <S.Container>
      <BackButton link={ROUTE_USER.USER_INQUIRY} label={t('user.inquiry')} />

      <H5>{t('user.detailInquiry')}</H5>
      <S.Description>{t('user.inquiryDesc')}</S.Description>
      <Form disabled data={model as InquiryType} />
    </S.Container>
  );
};

export default DetailInquiry;
