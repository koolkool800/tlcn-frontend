import ContainerActions from '@components/eventPage/containerActions';
import ContainerViews from '@components/eventPage/containerViews';
import CardTicket from '@components/home/CardTicket';
import { EventTypeProps } from '@components/home/TopEvent';
import { IdQuery, TITLE_MENU } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import useDebounce from '@hooks/useDebounce';
import useParam from '@hooks/useParam';
import eventService from '@services/eventService';
import { Container, H5, H6, Typography } from '@style/DefaultStyled';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { Col, Form, Row, Grid, Drawer, Checkbox } from 'antd';
import { ResponseListModel, ResponseModel } from 'interface';
import { EventFilter, EventModelFilterType, EventType } from 'interface/event';
import { ObjectLiteral } from 'interface/general';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseCircle } from 'iconsax-react';
import CheckboxCustom from '@components/common/Checkbox';
import { useTranslation } from 'react-i18next';
import theme from '@style/themes/default';
import CustomDropDown from '@components/common/CustomDropDown';
import { titleCase } from '@utils/helper';
import Chip from '@components/common/Chip';
import Button from '@components/common/Button';
import * as S from './style';

function arrayToObj(inputArray: EventModelFilterType[]) {
  const outputObject: ObjectLiteral = {};

  inputArray.forEach((item: EventModelFilterType) => {
    const fieldName = item.field;
    const { data } = item;

    if (data.length > 0) {
      outputObject[fieldName] = data;
    }
  });

  return outputObject;
}

const { useBreakpoint } = Grid;

function EventPage() {
  const params = useParam();
  const { t } = useTranslation();
  const [isShown, setIsShown] = useState(false);
  const [form] = Form.useForm();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<EventFilter[]>([]);
  const navigate = useNavigate();
  const screens = useBreakpoint();
  /** * State get list item checked */
  const [selectedValue, setSelectedValue] = useState<EventModelFilterType[]>(
    []
  );
  const dataForm = Form.useWatch([], form);
  const [selectedFilter, setSelectedFilter] = useState<ObjectLiteral>({
    performers: [],
    places: [],
  });
  const debouncedFormValues = useDebounce(500);
  const event: EventTypeProps = {
    title: params?.title || TITLE_MENU.CONCERT,
    filter: {
      eventTypes: params?.eventTypes,
      navCateId: params?.navCateId,
    },
  };
  /** * Load list event */
  const getDataEvent = async () => {
    try {
      const response: ResponseListModel<EventType> = await eventService.get({
        eventTypes: event?.filter.eventTypes,
        keyword: dataForm?.keyword,
        performers: selectedFilter?.performers,
        places: selectedFilter?.places,
        navCateId: event?.filter?.navCateId,
      });
      setEvents(response.data.data || []);
      setLoading(false);
    } catch (err) {
      /* empty */
      setLoading(false);
    }
  };
  /** Load filter for event */
  const loadFilterEvent = async () => {
    try {
      const response: ResponseModel<EventModelFilterType[]> =
        await eventService.getFilter({
          eventType: event?.filter?.eventTypes,
          navCateId: event?.filter?.navCateId,
        });
      setFilter(response.data || []);
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    loadFilterEvent();
  }, [event?.title]);

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [params?.eventTypes]);

  useEffect(() => {
    setLoading(true);
    debouncedFormValues(() => {
      getDataEvent();
    });
  }, [
    dataForm?.keyword,
    selectedFilter?.performers,
    selectedFilter?.places,
    event?.title,
  ]);
  /**
   *
   * @param data event list
   * @returns {ReactElement[]}
   */
  const renderEvent = (data: EventType[]): ReactElement[] => {
    return data.map((item) => {
      return (
        <Col
          key={item.id}
          style={{
            marginBottom: 40,
            overflow: screens.xs ? 'hidden' : 'unset',
          }}
          lg={!isShown ? 6 : 8}
          md={8}
          sm={12}
          xs={12}
        >
          <CardTicket
            poster={item?.coverImage}
            title={item?.title}
            location={item?.place}
            price={`${formatNumberWithCommas(
              item.minPrice
            )}원 ~ ${formatNumberWithCommas(item.maxPrice)}원`}
            onClick={() =>
              navigate(
                `${ROUTES.EVENT_DETAIL.replace(
                  IdQuery,
                  JSON.stringify(item.id)
                )}`
              )
            }
          />
        </Col>
      );
    });
  };

  /** *
   * Func update new value for Form and selectedValue state
   * @param name // key filter
   * @param valueCurrent // value change
   * @param checked // value check box
   * @returns void
   */
  const handleUpdateFields = (
    name: string,
    valueCurrent: string,
    checked: boolean
  ) => {
    let newData: string[] = [];
    if (!checked) {
      newData = form
        .getFieldValue(name)
        ?.filter((val: string) => val !== valueCurrent);
    } else {
      newData = form.getFieldValue(name) || [];
      if (typeof newData === 'string') {
        newData = [newData];
      }

      newData = [...newData, valueCurrent];
    }
    form.setFieldValue(name, [...newData]);

    setSelectedValue((pre) => {
      const newValueSelected = [...pre];
      const index = newValueSelected.findIndex(
        (v: EventModelFilterType) => v.field === name
      );
      if (index !== -1) {
        newValueSelected[index].data = newData;
      }
      return newValueSelected;
    });
  };
  const handleClearAll = (field: string) => {
    form.setFieldValue(field, []);
  };
  const renderDropdown = useMemo(() => {
    const values: EventModelFilterType[] = [];
    const html: React.ReactNode = filter?.map((item) => {
      let indexValue = values.findIndex((v) => v.field === item.field);
      if (indexValue === -1) {
        values.push({
          field: item.field,
          data: [],
        });

        indexValue = values.length - 1;
      }

      if (
        typeof dataForm === 'object' &&
        Object.prototype.hasOwnProperty.call(dataForm, item.field)
      ) {
        values[indexValue].data = item.data.filter((data: string) =>
          dataForm[item.field]?.includes(data)
        );
      }
      return (
        <div key={item.field}>
          <CustomDropDown
            title={String(t(`home.${item.field}`))}
            filter={
              <Form.Item name={item.field} initialValue={dataForm[item.field]}>
                <Checkbox.Group>
                  {item.data?.map((data: string) => (
                    <CheckboxCustom
                      value={data}
                      key={data}
                      onChange={(e) =>
                        handleUpdateFields(item.field, data, e.target.checked)
                      }
                    >
                      {titleCase(String(data))}
                    </CheckboxCustom>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            }
          />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {dataForm[item.field]?.map((data: string) => (
              <div key={`${item.field}-${data}`}>
                <Chip
                  key={`${item.field}_${item.data}`}
                  onClose={() => handleUpdateFields(item.field, data, false)}
                >
                  {titleCase(data)}
                </Chip>
              </div>
            ))}
            {dataForm[item.field]?.length > 0 && (
              <Chip clearAll onClick={() => handleClearAll(item.field)}>
                Clear all
              </Chip>
            )}
          </div>
        </div>
      );
    });

    return html;
  }, [filter, form.getFieldValue('performers'), form.getFieldValue('places')]);
  return (
    <Container>
      <S.Wrapper>
        {!screens.xs && <H5>{event?.title || ''}</H5>}
        <Form.Provider>
          <Form form={form} className="container-content">
            <Row className="row-action">
              <ContainerActions
                isShown={isShown}
                setIsShown={setIsShown}
                totalElement={events.length}
                defaultValue={dataForm}
              />
            </Row>
            {screens.xs && (
              <div className="container-mobile-title">
                <H5>{event?.title}</H5>
                <Typography>{`${events?.length} ${
                  events?.length > 1 ? 'results' : 'result'
                }`}</Typography>
              </div>
            )}
            <ContainerViews
              isShown={isShown}
              xs={screens.xs}
              content={renderEvent(events)}
              dropdowns={filter}
              defaultValue={dataForm}
              loading={loading}
              onGetSelectedValue={(value: EventModelFilterType[]) => {
                setSelectedFilter(arrayToObj(value));
              }}
            />
            {screens.xs && (
              <Drawer
                title={<H6>Filter</H6>}
                placement="bottom"
                closable={false}
                className="drawer-custom"
                onClose={() => setIsShown(false)}
                open={isShown}
                extra={<CloseCircle onClick={() => setIsShown(false)} />}
                key="bottom-drawer"
                headerStyle={{
                  textAlign: 'center',
                  borderBottom: 'unset',
                  borderTopRightRadius: 14,
                  borderTopLeftRadius: 14,
                }}
                style={{
                  backgroundColor: theme.colors.solidBasicNeutral800,
                  color: theme.colors.lightGrey,
                  borderTopRightRadius: 14,
                  borderTopLeftRadius: 14,
                }}
                footer={
                  <>
                    <Button
                      onClick={() => {
                        form.setFieldsValue({
                          ...form.getFieldsValue(),
                          places: [],
                          performers: [],
                        });
                        setSelectedFilter({});
                      }}
                    >
                      {t('common.clearAll')}
                    </Button>
                    <Button
                      bgcolor={theme.colors.primarySolid500}
                      color="black"
                      onClick={() => {
                        setSelectedFilter({
                          performers: dataForm?.performers,
                          places: dataForm?.places,
                        });
                      }}
                    >
                      {t('common.done')}
                    </Button>
                  </>
                }
                footerStyle={{
                  display: 'flex',
                  gap: 10,
                }}
              >
                {renderDropdown}
              </Drawer>
            )}
          </Form>
        </Form.Provider>
      </S.Wrapper>
    </Container>
  );
}

export default EventPage;
