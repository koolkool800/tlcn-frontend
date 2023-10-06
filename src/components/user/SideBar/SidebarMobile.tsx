import theme from '@style/themes/default';
import { Badge } from 'antd';
import { useLocation } from 'react-router-dom';
import { SidebarProps } from '.';
import { ROUTE_USER } from '../../../constants/routes';
import CustomLink from '../../common/CustomLink';
import * as S from './style';

type Props = {
  currentTab: string;
  listMyPage: SidebarProps[];
};

const SidebarMobile = ({
  currentTab = ROUTE_USER.USER_MY_PAGE,
  listMyPage,
}: Props) => {
  const location = useLocation();

  return !location?.state?.tabMyPage ? (
    <S.ListMobile>
      <S.ListItemMobile>
        {listMyPage.map((item) => (
          <CustomLink
            key={item.path}
            to={{
              pathname: item.path,
            }}
            state={item?.state || {}}
          >
            <S.ItemMobile
              className={currentTab.includes(item.path) ? 'active' : ''}
            >
              <div className="item">
                <p>{item.value}</p>
                {!!item.countNotification && (
                  <Badge
                    count={item.countNotification}
                    style={{ backgroundColor: theme.colors.emphasisLightHigh }}
                  />
                )}
              </div>
            </S.ItemMobile>
          </CustomLink>
        ))}
      </S.ListItemMobile>
    </S.ListMobile>
  ) : (
    <></>
  );
};

export default SidebarMobile;
