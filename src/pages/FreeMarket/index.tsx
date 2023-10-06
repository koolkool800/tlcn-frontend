import ContainerActions from '@components/eventPage/containerActions';
import ContainerViews from '@components/eventPage/containerViews';
import { Container, H5 } from '@style/DefaultStyled';
import { Form, Grid, Row } from 'antd';
import { useEffect, useState } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';

import TableClearance from '@components/clearance/TableClearance';
import { ROUTES } from '@constants/routes';
import eventService from '@services/eventService';
import { getOffset } from '@utils/table';
import { ResponseListModel, ResponseModel } from 'interface';
import { EventModelFilterType } from 'interface/event';
import { ObjectLiteral } from 'interface/general';
import {
  OutSiteTicketFilterType,
  OutSiteType,
  initOutSiteTicketValue,
} from 'interface/outSiteTicket';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const { useBreakpoint } = Grid;

function FreeMarket() {
  const location = useLocation();
  const params: { [key: string]: string | number } | any = queryString.parse(
    location.search,
    {
      arrayFormat: 'comma',
      parseBooleans: true,
    }
  );

  const screens = useBreakpoint();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const theme = useTheme() as DefaultTheme;
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<OutSiteType[]>([]);
  const [filter, setFilter] = useState<OutSiteTicketFilterType>({
    ...initOutSiteTicketValue,
  });
  const [dropdownFilters, setDropdownFilters] = useState<
    EventModelFilterType[]
  >([]);

  const [cancelListing, setCancelListing] = useState<boolean>(false);

  const loadDropdownFilter = async () => {
    try {
      const response: ResponseModel<EventModelFilterType[]> =
        await eventService.getClearanceFilter();
      setDropdownFilters(response.data);
    } catch (err) {
      /* empty */
    }
  };

  const loadData = async (
    paramsFilter: OutSiteTicketFilterType,
    hasParamFilter = false
  ) => {
    try {
      const response: ResponseListModel<OutSiteType> =
        await eventService.getOutSiteTicket(paramsFilter);
      setDataSource(response?.data?.data || []);

      setFilter({
        ...(hasParamFilter ? paramsFilter : filter),
        totalElement: response.data?.length || 0,
      });
    } catch (err) {
      /* empty */
    }
  };

  /** * Load list filter and set params on url */
  useEffect(() => {
    const page = Number(params?.page) || 1;
    let offset = 0;
    if (page) {
      offset = getOffset(page, filter.limit);
    }

    setFilter(() => ({
      ...filter,
      ...params,
      offset,
      page,
    }));

    loadDropdownFilter();

    setLoaded(true);

    form.setFieldsValue(params);
  }, []);

  /** * Load list data after get url */
  useEffect(() => {
    if (loaded) {
      loadData(filter);
    }
    if (cancelListing) {
      loadData(filter);
    }
  }, [filter.offset, loaded, cancelListing]);

  /** * handle on change search, obstruction of vision, filter */
  const onValuesChange = (
    changedValues: ObjectLiteral,
    allValues: ObjectLiteral
  ) => {
    setFilter((pre) => ({
      ...pre,
      ...changedValues,
    }));

    navigate({
      pathname: '',
      search: queryString.stringify(
        { ...params, ...changedValues },
        { arrayFormat: 'comma' }
      ),
    });

    loadData(
      {
        ...filter,
        ...changedValues,
      },
      true
    );
  };

  /** * handle change paginate */
  const handleChangePage = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    const offset = getOffset(page, pageSize);
    setFilter({
      ...filter,
      offset,
      page,
    });
  };

  return (
    <Container>
      <S.Wrapper>
        <Form.Provider>
          <Form
            form={form}
            className="container-content"
            onValuesChange={onValuesChange}
          >
            {!screens.xs && (
              <S.Header>
                <H5>{t('home.clearance')}</H5>
                <S.ButtonCustom
                  onClick={() => {
                    navigate(ROUTES.REGISTER_TO_SELL);
                  }}
                >
                  {t('user.sell')}
                </S.ButtonCustom>
              </S.Header>
            )}
            <Row className="row-action">
              <ContainerActions
                isShown={isShown}
                setIsShown={setIsShown}
                totalElement={filter.totalElement}
                defaultValue={params}
              />
            </Row>

            {screens.xs && (
              <S.Header>
                <H5>{t('home.clearance')}</H5>
                <S.ButtonCustom
                  onClick={() => {
                    navigate(ROUTES.REGISTER_TO_SELL);
                  }}
                >
                  {t('user.sell')}
                </S.ButtonCustom>
              </S.Header>
            )}

            <S.WrapperTable isShown={isShown}>
              <ContainerViews
                onValuesChange={onValuesChange}
                dropdowns={dropdownFilters}
                isShown={isShown}
                defaultValue={params}
                setIsShown={setIsShown}
                content={
                  <TableClearance
                    dataSource={dataSource}
                    filter={filter}
                    setCancelListing={setCancelListing}
                    handleChangePage={handleChangePage}
                  />
                }
              />
            </S.WrapperTable>
          </Form>
        </Form.Provider>
      </S.Wrapper>
    </Container>
  );
}

export default FreeMarket;
