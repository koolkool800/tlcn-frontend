import Youtube from '@assets/images/icon/youtube.svg';
import Instagram from '@assets/images/icon/instagram.svg';
import Talk from '@assets/images/icon/talk.svg';
import { Divider, Typography } from 'antd';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import ItemInfoCompany from './ItemInfoCompany';
import * as S from './style';

const { Text } = Typography;

const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <S.WrapperFooter>
      <Divider
        className="divider-above"
        style={{
          minWidth: 1200,
          width: 1200,
          background: theme?.colors?.emphasisDarkSurfaceSmall,
        }}
      />
      <S.WrapperActions>
        <div className="container-navigate-left">
          <Text>{t('footer.subFooter.aboutUs')}</Text>
          <Text>{t('footer.subFooter.userAgreement')}</Text>
          <Text>{t('footer.subFooter.privacyPolicy')}</Text>
          <Text>{t('footer.subFooter.partnerShip')}</Text>
        </div>
        <div className="container-navigate-right">
          <img src={Youtube} alt="Youtube" />
          <img src={Instagram} alt="Instagram" />
          <img src={Talk} alt="Talk" />
        </div>
      </S.WrapperActions>
      <Divider
        className="divider-below"
        style={{
          minWidth: 1200,
          width: 1200,
          background: theme?.colors?.emphasisDarkSurfaceSmall,
        }}
      />
      <S.WrapperInfo>
        <ItemInfoCompany
          title={t('footer.company.title')}
          content={
            <div>
              <Text>{t('footer.company.name')}</Text>
              <br />
              <Text>{`${t('footer.company.BRN')}: 625-87-02322`}</Text>
              <br />
              <Text>{`${t('footer.company.onlineSalesRegistration')}`}</Text>
              <br />
              <Text>{t('footer.company.director')}</Text>
              <br />
              <Text>{t('footer.company.address1')}</Text>
              <br />
              <Text>{`${t('footer.company.webHosting')}`}</Text>
            </div>
          }
        />

        <ItemInfoCompany
          title={t('footer.contact.title')}
          content={
            <div>
              <Text>{t('footer.contact.csMail')}</Text>
              <br />
              <Text>{`${t('footer.company.webHosting')}`}</Text>
            </div>
          }
        />
      </S.WrapperInfo>
    </S.WrapperFooter>
  );
};

export default Footer;
