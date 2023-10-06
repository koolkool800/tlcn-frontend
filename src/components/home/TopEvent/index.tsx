import CustomLink from '@components/common/CustomLink';
import { IdQuery } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import eventService from '@services/eventService';
import {
  ContainerSection,
  H5,
  TitleSectionHompage,
  Typography,
} from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { Col, Grid, Row, Empty } from 'antd';
import { ArrowDown2 } from 'iconsax-react';
import { ResponseListModel } from 'interface';
import { EventFilterCustom, EventType } from 'interface/event';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import expireTicket from '@assets/images/icon-park-solid_ticket.png';
import CardTicket from '../CardTicket';
import * as S from './styles';

export type EventTypeProps = {
  title?: string;
  filter: EventFilterCustom;
  expandBanner?: React.ReactNode;
};

function TopEvent({ filter, title, expandBanner }: EventTypeProps) {
  const { t } = useTranslation();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { xs } = Grid.useBreakpoint();
  /** * Load list event */
  const loadTopEvent = async () => {
    setLoading(true);
    try {
      if (title) {
        const response: ResponseListModel<EventType> = await eventService.get(
          filter
        );
        setEvents(response.data.data || []);
      } else {
        const response: ResponseListModel<EventType> =
          await eventService.getTopEvent();
        setEvents(response.data.data || []);
      }
    } catch (err) {
      /* empty */
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTopEvent();
  }, []);

  const render = useMemo(() => {
    return events.map((event: EventType) => (
      <Col span={!xs ? 6 : undefined} key={event.id}>
        <CustomLink
          to={`${ROUTES.EVENT_DETAIL.replace(IdQuery, String(event.id))}`}
        >
          <CardTicket
            poster={event.coverImage}
            title={`${event.title} - ${event.performer}`}
            location={event.place}
            price={`${formatNumberWithCommas(
              event.minPrice
            )}원 ~ ${formatNumberWithCommas(event.maxPrice)}원`}
          />
        </CustomLink>
      </Col>
    ));
  }, [events]);

  const renderLoading = useMemo(() => {
    return Array(filter.limit)
      .fill(undefined)
      .map((_, index: number) => (
        <Col key={`${_}_${String(index)}`}>
          <CardTicket poster="" title="" location="" price="" />
        </Col>
      ));
  }, [filter.limit]);

  return (
    <div>
      {events.length > 0 ? (
        <ContainerSection>
          <S.TopEventSection>
            <S.Header>
              <TitleSectionHompage>
                {title || t('home.topEvent.topEventTitle')}
              </TitleSectionHompage>
              {title && (
                <S.SeeMore>
                  <Link
                    to={{
                      pathname: ROUTES.EVENT_PAGES,
                      search: queryString.stringify({ ...filter, title }),
                    }}
                  >
                    <span aria-hidden="true">{t('home.seeMore')}</span>
                    <ArrowDown2 />
                  </Link>
                </S.SeeMore>
              )}
            </S.Header>
            <Row
              className="event-container"
              wrap={!xs}
              justify={{ xs: 'start', sm: 'start' }}
              gutter={[
                { lg: theme.paddingGrid.lg, xs: theme.paddingGrid.xs },
                { lg: theme.paddingGrid.xxxl, xs: theme.paddingGrid.xl },
              ]}
            >
              {loading ? renderLoading : render}
            </Row>
          </S.TopEventSection>
        </ContainerSection>
      ) : (
        <ContainerSection>
          <S.TopEventSection>
            <S.Header>
              <TitleSectionHompage>
                {title || t('home.topEvent.topEventTitle')}
              </TitleSectionHompage>
              {title && (
                <S.SeeMore>
                  <Link
                    to={{
                      pathname: ROUTES.EVENT_PAGES,
                      search: queryString.stringify({ ...filter, title }),
                    }}
                  >
                    <span aria-hidden="true">{t('home.seeMore')}</span>
                    <ArrowDown2 />
                  </Link>
                </S.SeeMore>
              )}
            </S.Header>
            <Row
              className="event-container"
              wrap={!xs}
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0,
              }}
              justify={{ xs: 'start', sm: 'start' }}
              gutter={[
                { lg: theme.paddingGrid.lg, xs: theme.paddingGrid.xs },
                { lg: theme.paddingGrid.xxxl, xs: theme.paddingGrid.xl },
              ]}
            >
              <img
                src={expireTicket}
                alt={expireTicket}
                style={{ objectFit: 'contain' }}
              />
              <Typography>{t('common.emptyEvent')}</Typography>
            </Row>
          </S.TopEventSection>
        </ContainerSection>
      )}
    </div>
  );
}

export default React.memo(TopEvent);
