import CheckedIcon from '@assets/images/icon/icon-checked.svg';
import { ROUTES } from '@constants/routes';
import useProfile from '@hooks/useProfile';
import { avatarGenerator } from '@utils/avatarGenerator';
import { ArrowRight2 } from 'iconsax-react';
import { UserType } from 'interface/user';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type Props = {
  showRoleLevel?: boolean;
};

const AvatarMyPage = ({ showRoleLevel }: Props) => {
  const navigate = useNavigate();
  const profile: UserType | null = useProfile();
  const theme = useTheme() as DefaultTheme;
  const { t } = useTranslation();
  return (
    <S.Wrapper>
      <S.Avatar>
        <div>
          <S.Name color={avatarGenerator(String(profile?.name || ''))}>
            <div>{profile?.name?.charAt(0)}</div>
          </S.Name>
        </div>
        <S.TextAvatar>
          <h5>{profile?.name}</h5>
          <span className="level">
            {t('user.level')} {profile?.level || 1}
          </span>
          <span>ID: {profile?.id}</span>
        </S.TextAvatar>
      </S.Avatar>
      {profile && Number(profile?.level || 1) < 2 && (
        <S.ButtonUpgrade
          color={theme?.colors?.black}
          bgcolor={theme?.colors?.primary500}
          onClick={() => navigate(ROUTES.REGISTRATION_SELLER)}
        >
          <span>{t('user.upgradeToLevel2')}</span>
          <ArrowRight2 size={16} />
        </S.ButtonUpgrade>
      )}

      {showRoleLevel && (
        <S.WrapperUserRole>
          <S.UserRole>
            <div className="item">
              <div className="title active">
                <span>{t('user.purchase')}</span>{' '}
                <img src={CheckedIcon} alt="Purchase" />
              </div>
            </div>

            <div className="item">
              <div className={`title ${profile?.level === 2 ? 'active' : ''}`}>
                <span>{t('user.sell')}</span>{' '}
                {profile?.level === 2 && <img src={CheckedIcon} alt="Sell" />}
              </div>
            </div>

            <div className="item">
              <div className={`title ${profile?.level === 2 ? 'active' : ''}`}>
                <span>{t('user.withdraw')}</span>
                {profile?.level === 2 && <img src={CheckedIcon} alt="Sell" />}
              </div>
            </div>
          </S.UserRole>
          <S.UserRole>
            <div className="desc">{t('user.youCanPurchase')}</div>
            {profile?.level === 2 ? (
              <div className="desc">{t('user.youCanSell')}</div>
            ) : (
              <div />
            )}
            {profile?.level === 2 ? (
              <div className="desc">{t('user.youCanWithdraw')}</div>
            ) : (
              <div />
            )}
          </S.UserRole>
        </S.WrapperUserRole>
      )}
    </S.Wrapper>
  );
};

export default AvatarMyPage;
