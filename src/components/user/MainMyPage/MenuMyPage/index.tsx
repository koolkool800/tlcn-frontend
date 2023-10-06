import { ArrowRight2 } from 'iconsax-react';
import { useTranslation } from 'react-i18next';
import { H6 } from '../../../../style/DefaultStyled';
import CustomLink from '../../../common/CustomLink';
import * as S from './style';

export type TabMyPage = {
  icon: React.ReactElement;
  value: string;
  path: string;
  tabCurrent?: string;
};
type Props = {
  title: string;
  menus: Array<TabMyPage>;
};
const MenuMyPage = ({ title, menus = [] }: Props) => {
  const { t } = useTranslation();
  return (
    <S.Wrapper>
      <H6>{title}</H6>
      <S.ListMenu>
        {menus.map((item) => (
          <CustomLink
            key={item.value}
            to={{
              pathname: item.path,
            }}
            state={{
              tabMyPage: item.tabCurrent,
            }}
          >
            <S.MenuItem key={item.value}>
              <div className="left">
                {item.icon}
                <p>{t(item.value)}</p>
              </div>
              <ArrowRight2 size="12" style={{ flexShrink: 0 }} />
            </S.MenuItem>
          </CustomLink>
        ))}
      </S.ListMenu>
    </S.Wrapper>
  );
};

export default MenuMyPage;
