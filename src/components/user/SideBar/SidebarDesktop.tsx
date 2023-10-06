import theme from '@style/themes/default';
import { Badge } from 'antd';
import { ArrowRight2 } from 'iconsax-react';
import { ROUTE_USER } from '../../../constants/routes';
import CustomLink from '../../common/CustomLink';
import * as S from './style';
import { SidebarProps } from '.';

type Props = {
  currentTab: string;
  listMyPage1: SidebarProps[];
  listMyPage2: SidebarProps[];
};

const SidebarDesktop = ({
  currentTab = ROUTE_USER.USER_MY_PAGE,
  listMyPage1,
  listMyPage2,
}: Props) => {
  return (
    <S.List>
      <S.ListItem>
        {listMyPage1.map((item) => (
          <CustomLink
            key={item.path}
            to={{
              pathname: item.path,
            }}
            state={item?.state || {}}
          >
            <S.Item className={currentTab.includes(item.path) ? 'active' : ''}>
              <div
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginRight: 8,
                }}
              >
                <p>{item.value}</p>
                {!!item.countNotification && (
                  <Badge
                    count={item.countNotification}
                    style={{ backgroundColor: theme.colors.emphasisLightHigh }}
                  />
                )}
              </div>
              <ArrowRight2 size="12" style={{ flexShrink: 0 }} />
            </S.Item>
          </CustomLink>
        ))}
      </S.ListItem>
      <S.ListItem>
        {listMyPage2.map((item) => (
          <CustomLink
            key={item.path}
            to={{
              pathname: item.path,
            }}
          >
            <S.Item className={currentTab === item.path ? 'active' : ''}>
              <p>{item.value}</p>
              <ArrowRight2 size="12" style={{ flexShrink: 0 }} />
            </S.Item>
          </CustomLink>
        ))}
      </S.ListItem>
    </S.List>
  );
};

export default SidebarDesktop;
