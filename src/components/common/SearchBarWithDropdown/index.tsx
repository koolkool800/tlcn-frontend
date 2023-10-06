import { EventCategoryTypeSearch, IdQuery } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import useDebounce from '@hooks/useDebounce';
import eventService from '@services/eventService';
import { Typography } from '@style/DefaultStyled';
import { dateTimeFormatString } from '@utils/format';
import { AutoComplete, Grid, InputRef } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { SearchNormal1 } from 'iconsax-react';
import { EventFilterCustom, EventSearchResponseType } from 'interface/event';
import React, { ChangeEvent, createRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Input from '../Input';
import * as S from './style';

type Props = {
  isFocusInput?: boolean;
  onClose?: () => void;
};
const SearchBarWithDropdown = ({ isFocusInput, onClose }: Props) => {
  const inputRef = createRef<InputRef>();
  const { t } = useTranslation();
  const { xs } = Grid.useBreakpoint();
  const debounce = useDebounce();

  const [keyword, setKeyword] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [events, setEvents] = useState<EventSearchResponseType>({
    art: [],
    concert: [],
    outsideTicket: [],
    sport: [],
  });

  const getData = async (model?: Omit<EventFilterCustom, 'eventTypes'>) => {
    const res = await eventService.searchEventBy({
      keyword: model?.keyword,
    });
    setEvents(res.data);
    setOpenDrawer(
      res.data.art.length > 0 ||
        res.data.concert.length > 0 ||
        res.data.sport.length > 0 ||
        res.data.outsideTicket.length > 0
    );
  };

  const onChange = (value: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setKeyword(value.target.value);
      getData({ keyword: value.target.value });
    });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isFocusInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocusInput]);
  const convertEvents = Object.entries(events).map(([key, value]) => ({
    type: key,
    value,
  }));

  const highLightedText = ({
    text,
    wordToHighlight,
  }: {
    text: string;
    wordToHighlight: string;
  }) => {
    if (!wordToHighlight) {
      return text;
    }
    const splitText = text.split(new RegExp(`(${wordToHighlight})`, 'gi'));
    const highlightedText = splitText.map((part) => {
      if (part.toLowerCase() === wordToHighlight.toLowerCase()) {
        return (
          <span key={Math.random()} className="accent">
            {part}
          </span>
        );
      }
      return part;
    });

    return highlightedText;
  };

  const optionsConvert = (): DefaultOptionType[] => {
    return convertEvents
      .filter(({ value }) => value.length > 0)
      .map(({ type, value }) => {
        return {
          label: (
            <div className="title-type" key={type}>
              {type === 'outsideTicket'
                ? t('home.clearance')
                : EventCategoryTypeSearch[
                    type as keyof typeof EventCategoryTypeSearch
                  ]}
            </div>
          ),
          options: value.map((event, index) => {
            return {
              label: (
                <>
                  <Link
                    to={`${ROUTES.EVENT_DETAIL.replace(
                      IdQuery,
                      String(event.id)
                    )}`}
                    className="event-option"
                    key={event.id}
                  >
                    <div className="event-name">
                      <Typography className="title">
                        {highLightedText({
                          text: event.eventName,
                          wordToHighlight: keyword,
                        })}
                      </Typography>
                      <Typography className="stadium">{event.place}</Typography>
                    </div>
                    <div className="event-perform">
                      <Typography className="perform-time">
                        {dateTimeFormatString(event?.performDate)}
                      </Typography>
                    </div>
                  </Link>
                  {index === value.length - 1 && (
                    <S.BreakLine>
                      <div className="mini-line" />
                    </S.BreakLine>
                  )}
                </>
              ),
            };
          }),
        };
      });
  };

  return (
    <S.InputContainer>
      {!xs && (
        <AutoComplete
          popupMatchSelectWidth={500}
          listHeight={524}
          popupClassName="popup-search"
          dropdownRender={(node) => <S.PopupStyle>{node}</S.PopupStyle>}
          options={optionsConvert()}
        >
          <Input
            value={keyword}
            onChange={onChange}
            type="input"
            placeholder={t('home.searchBar.placeHolder')}
            prefix={<SearchNormal1 size="20" color="#FFFFFF" />}
            autoFocus
          />
        </AutoComplete>
      )}
      {xs && (
        <>
          <Input
            onChange={onChange}
            type="input"
            placeholder={t('home.searchBar.placeHolder')}
            prefix={<SearchNormal1 size="20" color="#FFFFFF" />}
            ref={inputRef}
          />
          <div className={`drawer-container ${!openDrawer ? `hide` : ''}`}>
            <div className="drawer-wrap">
              {convertEvents
                .filter(({ value }) => value.length > 0)
                .map(({ type, value }, convertEventsIndex: number) => (
                  <div key={`${type}_${String(convertEventsIndex)}`}>
                    <div className="title-type" key={type}>
                      {
                        EventCategoryTypeSearch[
                          type as keyof typeof EventCategoryTypeSearch
                        ]
                      }
                    </div>
                    {value.map((event, index) => (
                      <div key={event.id}>
                        <Link
                          to={`${ROUTES.EVENT_DETAIL.replace(
                            IdQuery,
                            String(event.id)
                          )}`}
                          className="event-option"
                          onClick={onClose && onClose}
                        >
                          <div className="event-name">
                            <Typography className="title">
                              {highLightedText({
                                text: event.eventName,
                                wordToHighlight: keyword,
                              })}
                            </Typography>
                            <Typography className="stadium">
                              {event.place}
                            </Typography>
                          </div>
                          <div className="event-perform">
                            <Typography className="perform-time">
                              {dateTimeFormatString(
                                event?.performDate,
                                'YYYY.MM.DD'
                              )}
                            </Typography>
                            <Typography className="perform-time">
                              {dateTimeFormatString(
                                event?.performDate,
                                '(ddd) h:mm A'
                              )}
                            </Typography>
                          </div>
                        </Link>
                        {index === value.length - 1 && (
                          <S.BreakLine>
                            <div className="mini-line" />
                          </S.BreakLine>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </S.InputContainer>
  );
};

export default React.memo(SearchBarWithDropdown);
