import { useTranslation } from 'react-i18next';
import { ROUTE_USER } from '@constants/routes';
import CustomLink from '../../../common/CustomLink';
import * as S from './style';

export const TAB_NUMBER_BOX = {
  received: 'pinReceived',
  sent: 'pinSent',
};
const listMenu = [
  {
    value: 'user.pinReceived',
    path: ROUTE_USER.USER_PIN_NUMBER_BOX,
    tabCurrent: TAB_NUMBER_BOX.received,
  },
  {
    value: 'user.pinSent',
    path: ROUTE_USER.USER_PIN_NUMBER_BOX,
    tabCurrent: TAB_NUMBER_BOX.sent,
  },
];
type Props = {
  tabCurrent: string;
  setCurrentTab: (newTab: string) => void;
};
const TabNumberBox = ({
  tabCurrent = TAB_NUMBER_BOX.received,
  setCurrentTab,
}: Props) => {
  const { t } = useTranslation();
  return (
    <S.Tabs>
      {listMenu.map((menu) => {
        return (
          <CustomLink
            onClick={() => setCurrentTab(menu.tabCurrent)}
            key={menu.value}
            to={{
              pathname: menu.path,
            }}
            state={{
              currentTab: menu.tabCurrent,
            }}
            style={{ width: 'auto' }}
          >
            <S.Tab
              key={menu.value}
              className={tabCurrent === menu.tabCurrent ? 'active' : ''}
            >
              <span className="content">{t(menu.value)}</span>
            </S.Tab>
          </CustomLink>
        );
      })}
    </S.Tabs>
  );
};

export default TabNumberBox;
