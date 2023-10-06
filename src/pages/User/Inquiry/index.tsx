import BackButton from '@components/common/BackButton';
import TableInquiry from '@components/user/Inquiry/TableInquiry';
import { ROUTE_USER } from '@constants/routes';
import useDimensions from '@hooks/useDimensions';
import { H5 } from '@style/DefaultStyled';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const Inquiry = () => {
  const { isMobile } = useDimensions();
  const { t } = useTranslation();
  return (
    <S.Container>
      {isMobile && (
        <BackButton
          link={ROUTE_USER.USER_MY_PAGE}
          label={t('user.supportCustomerCenter')}
        />
      )}
      <H5>{t('user.inquiry')}</H5>
      <S.Description>{t('user.inquiryDesc')}</S.Description>
      {/* <FormFilterInquiry /> */}
      <TableInquiry />
    </S.Container>
  );
};

export default Inquiry;
