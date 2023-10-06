import TabNumberBox, {
  TAB_NUMBER_BOX,
} from '@components/user/PinNumberBox/TabNumberBox';
import TablePinReceived from '@components/user/PinNumberBox/TablePinReceived';
import TablePinSent from '@components/user/PinNumberBox/TablePinSent';
import { H5 } from '@style/DefaultStyled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import * as S from './style';

const PinNumberBox = () => {
  const { t } = useTranslation();
  const location = useLocation();
  // const currentTab = location.state?.currentTab ?? TAB_NUMBER_BOX.received;
  const [currentTab, setCurrentTab] = useState(
    location.state?.currentTab ?? TAB_NUMBER_BOX.received
  );

  return (
    <S.Container>
      <S.Header>
        <H5 className="desktop">{t('user.pinNumberBox')}</H5>
      </S.Header>
      <TabNumberBox tabCurrent={currentTab} setCurrentTab={setCurrentTab} />
      <S.Header>
        <H5 className="mobile">
          {TAB_NUMBER_BOX.received === currentTab
            ? t('user.pinReceived')
            : t('user.pinSent')}
        </H5>
      </S.Header>
      {currentTab === TAB_NUMBER_BOX.received && <TablePinReceived />}
      {currentTab === TAB_NUMBER_BOX.sent && <TablePinSent />}
    </S.Container>
  );
};

export default PinNumberBox;
