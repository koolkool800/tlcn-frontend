import CustomLink from '@components/common/CustomLink';
import { BtnEdit } from '@components/user/MainMyPage/MyInformation/style';
import { ROUTE_USER } from '@constants/routes';
import userService from '@services/userService';
import { Typography } from '@style/DefaultStyled';
import { currencyFormat } from '@utils/currency';
import { dateTimeFormatString } from '@utils/format';
import { camelCaseToLabel, snakeCaseToLabel } from '@utils/helper';
import { ArrowLeft2 } from 'iconsax-react';
import { NotificationDataType } from 'interface/user';
import lodash from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as S from './style';

const NotifiCationDetail = () => {
  const params = useParams();
  const { t } = useTranslation();
  const [model, setModel] = useState<NotificationDataType | null>(null);
  const fetchData = async () => {
    try {
      const res = await userService.getNotificationDetail(String(params?.id));
      setModel(res?.data || null);
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    fetchData();
  }, [params?.id]);

  return (
    <>
      <S.Container>
        <CustomLink to={ROUTE_USER.USER_NOTIFICATION}>
          <BtnEdit>
            <ArrowLeft2 size="16" />
            {t('user.notification')}
          </BtnEdit>
        </CustomLink>
        <S.TypographyCustom>{model?.title}</S.TypographyCustom>

        {model?.contentTop && (
          <>
            {model?.contentTop?.map((content, index) => (
              <S.Description key={`${content}-${index.toString()}`}>
                {content}
              </S.Description>
            ))}
          </>
        )}
        {model?.data && (
          <S.WrapperDetail>
            {Object.entries(model?.data || {}).map(([key, value]: any) => {
              if (Number(value)) {
                value = currencyFormat(Number(value));
              } else if (['useDate'].includes(key)) {
                value = dateTimeFormatString(value);
              } else if (Array.isArray(value)) {
                value = value
                  ?.map((item) => lodash.capitalize(snakeCaseToLabel(item)))
                  ?.join(', ');
              }
              return (
                <div key={key}>
                  <div className="item">
                    <div className="left">
                      <Typography>
                        {lodash.capitalize(camelCaseToLabel(key))}
                      </Typography>
                    </div>
                    <div className="right">
                      <Typography>{value}</Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </S.WrapperDetail>
        )}
        {model?.contentBot && (
          <>
            {model?.contentBot?.map((content, index) => (
              <S.Description key={`${content}-${index.toString()}`}>
                {content}
              </S.Description>
            ))}
          </>
        )}
      </S.Container>
    </>
  );
};

export default NotifiCationDetail;
