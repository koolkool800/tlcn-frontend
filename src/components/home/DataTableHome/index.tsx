import TableClearance from '@components/clearance/TableClearance';
import { ROUTES } from '@constants/routes';
import eventService from '@services/eventService';
import { TitleSectionHompage } from '@style/DefaultStyled';
import { ArrowDown2 } from 'iconsax-react';
import { ResponseListModel } from 'interface';
import {
  OutSiteTicketFilterType,
  OutSiteType,
  initOutSiteTicketValue,
} from 'interface/outSiteTicket';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

const DataTableHome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState<OutSiteType[]>([]);
  const filterValue: OutSiteTicketFilterType = {
    ...initOutSiteTicketValue,
    limit: 5,
  };

  const loadData = async () => {
    try {
      const response: ResponseListModel<OutSiteType> =
        await eventService.getOutSiteTicket(filterValue);
      setDataSource(response.data.data || []);
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onClickSeeMore = () => {
    navigate(ROUTES.CLEARANCE);
  };

  return (
    <S.Container>
      <S.Header>
        <TitleSectionHompage>{t('home.clearance')}</TitleSectionHompage>
        <S.SeeMore>
          <S.ButtonCustom
            onClick={() => {
              navigate(ROUTES.REGISTER_TO_SELL);
            }}
          >
            {t('home.sell')}
          </S.ButtonCustom>
          <button
            className="btn-see-more"
            type="button"
            onClick={onClickSeeMore}
          >
            <span>{t('home.seeMore')}</span>
            <ArrowDown2 />
          </button>
        </S.SeeMore>
      </S.Header>

      <TableClearance
        dataSource={dataSource}
        filter={{
          page: 1,
          limit: 5,
        }}
        handleChangePage={() => {}}
      />
    </S.Container>
  );
};

export default React.memo(DataTableHome);
