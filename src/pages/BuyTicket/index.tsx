import FilterValueForm from '@components/buyTicket/FilterValueForm';
import FormFilterSeat from '@components/buyTicket/FormFilterSeat';
import TicketDescription from '@components/buyTicket/TicketDescription';
import Breadcrumb from '@components/common/Breadcrumb';
import Button from '@components/common/Button';
import CardSeat, { CardSeatProp } from '@components/common/CardSeat';
import Checkbox, { Options } from '@components/common/Checkbox';
import Map from '@components/common/Map';
import { IdQuery } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import useDebounce from '@hooks/useDebounce';
import buyTicketService, { FilterSeat } from '@services/buyTicketService';
import eventService from '@services/eventService';
import { Container, H6 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { currencyFormat } from '@utils/currency';
import { extractDataMap } from '@utils/customList';
import { dateTimeFormatString } from '@utils/format';
import { handleResetBrightness } from '@utils/handleMap';
import { getInfoEvent } from '@utils/helper';
import { Col, Drawer, Form, Grid, Row } from 'antd';
import { CloseCircle, FilterSearch } from 'iconsax-react';
import { ResponseListModel, ResponseModel } from 'interface';
import { EventType, FormEventFilter } from 'interface/event';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styles';

export type Seat = {
  class: Options[];
  zone: Options[];
  floors: Options[];
  rows: Options[];
};
type Ticket = Omit<CardSeatProp, 'active'> & { idTicket: string };

function BuyTicket() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const debounce = useDebounce(300);
  const { xs } = Grid.useBreakpoint();
  const [event, setEvent] = useState<EventType>();
  const [isShown, setIsShown] = useState(false);
  const [seat, setSeat] = useState<Seat>({
    class: [],
    zone: [],
    floors: [],
    rows: [],
  });
  const [cardSeat, setCartSeat] = useState<Ticket[]>([]);
  const [form] = Form.useForm<FormEventFilter>();
  const [itemActive, setItemActive] = useState<string>('');

  const { isObstructed, method, ...resFields } =
    Form.useWatch<FormEventFilter>([], form) || {};
  // fetch data event detail
  useEffect(() => {
    if (eventId) {
      const fetchEventData = async () => {
        const response: ResponseModel<EventType> = await eventService.getDetail(
          eventId
        );
        const { groups, stageMap } = response.data;
        const dataSeat = extractDataMap(groups);
        setEvent(response.data);
        setSeat((pre) => ({
          ...pre,
          ...dataSeat,
        }));
      };
      fetchEventData();
    }
  }, [eventId]);

  /**
   * used to filter tickets
   * @param values - value form
   * @returns {Promise<void>}
   */
  const filterTicket = async (values: FormEventFilter): Promise<void> => {
    try {
      const requestParams: FilterSeat = {
        eventId: String(eventId),
        deliveryMethods: values.method && values.method.toString(),
        groupIds: values.classes && values.classes.toString(),
        sectionIds: values.zones && values.zones.toString(),
        floorIds: values.floors && values.floors.toString(),
        rowIds: values.rows && values.rows.toString(),
        isObstructed: values.isObstructed,
      };
      const response: ResponseListModel<EventType> =
        await buyTicketService.getTicket(requestParams);
      const data = response.data?.data;

      const convertDataSeat: Ticket[] = data.map((dataSeat: any) => {
        return {
          idTicket: dataSeat?.id,
          seatInfo: dataSeat?.seatInfo,
          price: dataSeat?.ticket?.totalPrice,
          types: dataSeat?.ticket?.deliveryMethod,
        };
      });
      setCartSeat(convertDataSeat);
    } catch (error) {
      //
    }
  };

  // used to get value ticket
  useEffect(() => {
    const params = form.getFieldsValue();
    filterTicket(params);
  }, []);

  /**
   * the event of form ant
   * @param changedValues - the current value of the field is being changed
   * @param values - the value form
   * @return {void}
   */
  const handleFormValueChange = (
    changedValues: any,
    values: FormEventFilter
  ): void => {
    const valuesForm = form.getFieldsValue();
    if (changedValues?.classes) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        zones: undefined,
        floors: undefined,
        rows: undefined,
      });
    }
    if (!xs) {
      debounce(() => {
        filterTicket(valuesForm);
      });
    }
  };

  /**
   *  used to set fields value
   * @param fieldName current field name
   * @param newValue - value is after change of field
   * @returns {void}
   */
  const setFieldAndTriggerChange = (fieldName: string, newValue: any): void => {
    form.setFieldsValue({
      [fieldName]: newValue,
    });

    handleFormValueChange({ [fieldName]: newValue }, form.getFieldsValue());
  };

  /**
   * used to reset field
   * @returns {void}
   */
  const resetFormFields = (): void => {
    form.resetFields();
    handleFormValueChange({}, form.getFieldsValue());
  };

  /**
   * used to get id and deliveryMethod when click into ticket
   * @param seatSelected ticket selected
   * @returns {void}
   */
  const handleClickItemTicket = (ticket: Ticket): void => {
    navigate(
      ROUTES.PRODUCT_DETAILS.replace(IdQuery, JSON.stringify(ticket?.idTicket))
    );
  };
  return (
    <Container>
      <S.Container>
        <div className="left">
          <div className="image-wrap">
            <Map
              classSelected={
                !xs
                  ? seat.class.find(
                      (item) => item.value === form.getFieldValue('classes')
                    )
                  : seat.class.find((item) => item.value === itemActive)
              }
              stadiumMap={event?.stageMap}
              onClick={(values: any) => {
                const classes = seat?.class;
                const classId: any = classes.find(
                  (item) => item.groupName === values
                );
                if (xs) {
                  filterTicket({
                    ...form.getFieldsValue(),
                    classes: classId?.value,
                  });
                }
                setItemActive(classId?.value);
                setFieldAndTriggerChange('classes', classId?.value);
              }}
            />
          </div>
        </div>
        <div className="right">
          <div className="breadcrumd-wrap">
            {!xs && (
              <Breadcrumb
                items={[
                  {
                    title: getInfoEvent(event?.eventType).title,
                    className: 'item-hover',
                    href: `${ROUTES.EVENT_PAGES}?title=${
                      getInfoEvent(event?.eventType).title
                    }&eventTypes=${event?.eventType}`,
                  },
                  {
                    title: event?.title,
                    href: `${ROUTES.EVENT_DETAIL.replace(
                      IdQuery,
                      JSON.stringify(event?.id)
                    )}`,
                  },
                  {
                    title: `Selected a ticket`,
                  },
                ]}
              />
            )}
          </div>
          <section className="ticket-description-wrap">
            <TicketDescription
              author={event?.performer}
              title={event?.title}
              location={event?.place}
              calendar={`${t('common.useDate')}: ${dateTimeFormatString(
                event?.performanceDate
              )}`}
            />
          </section>
          <section className="select-ticket-section">
            <div className="filter-select-wrap">
              <Form form={form} onValuesChange={handleFormValueChange}>
                <div className="title">
                  <h6>{t('buyTicket.selectTicket')}</h6>
                  {!xs ? (
                    <Form.Item
                      name="isObstructed"
                      valuePropName="checked"
                      style={{ margin: 0 }}
                    >
                      <Checkbox>
                        {t('buyTicket.nonObstructionOfVision')}
                      </Checkbox>
                    </Form.Item>
                  ) : (
                    <Button
                      className="button"
                      style={{ maxWidth: 90 }}
                      onClick={() => setIsShown(!isShown)}
                      icon={<FilterSearch size="15" color="#FFF" />}
                    >
                      {!xs ? t('home.filter') : null}
                    </Button>
                  )}
                </div>

                {!xs && (
                  <>
                    <FormFilterSeat seat={seat} groups={event?.groups ?? []} />

                    <FilterValueForm
                      seat={seat}
                      setFieldValue={setFieldAndTriggerChange}
                      resetFormFields={resetFormFields}
                    />
                  </>
                )}
                {xs && (
                  <Drawer
                    title={<H6>{t('buyTicket.filters')}</H6>}
                    placement="bottom"
                    closable={false}
                    size="large"
                    className="drawer-custom"
                    onClose={() => setIsShown(false)}
                    open={isShown}
                    extra={<CloseCircle onClick={() => setIsShown(false)} />}
                    key="bottom-drawer"
                    headerStyle={{
                      textAlign: 'center',
                      borderBottom: 'unset',
                    }}
                    style={{
                      backgroundColor: theme.colors.solidBasicNeutral800,
                      color: theme.colors.lightGrey,
                    }}
                    footer={
                      <>
                        <Button
                          onClick={() => {
                            form.resetFields();
                            setItemActive('');
                            handleResetBrightness();
                            setIsShown(false);
                            filterTicket(form.getFieldsValue());
                          }}
                        >
                          {t('common.clearAll')}
                        </Button>
                        <Button
                          bgcolor={theme.colors.primarySolid500}
                          color="black"
                          onClick={() => {
                            const valuesForm = form.getFieldsValue();
                            setIsShown(false);
                            setItemActive(valuesForm.classes);
                            filterTicket(valuesForm);
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
                    <Form.Item
                      name="isObstructed"
                      valuePropName="checked"
                      style={{ margin: 0 }}
                    >
                      <Checkbox>
                        {t('buyTicket.nonObstructionOfVision')}
                      </Checkbox>
                    </Form.Item>
                    <FormFilterSeat seat={seat} groups={event?.groups ?? []} />
                    <FilterValueForm
                      seat={seat}
                      setFieldValue={setFieldAndTriggerChange}
                      resetFormFields={resetFormFields}
                    />
                  </Drawer>
                )}
              </Form>
            </div>
          </section>
          <section className="ticket-view-section">
            <Row
              gutter={[
                20,
                { lg: theme.paddingGrid.lg, sm: theme.paddingGrid.lg },
              ]}
            >
              {cardSeat.map((ticket: Ticket) => {
                return (
                  <Col
                    md={8}
                    xs={12}
                    key={ticket.idTicket}
                    onClick={() => {
                      handleClickItemTicket(ticket);
                    }}
                  >
                    <CardSeat
                      price={`${String(
                        currencyFormat(Number(ticket.price))
                      )} 원`}
                      seatInfo={ticket.seatInfo}
                      types={ticket.types ?? []}
                    />
                  </Col>
                );
              })}
            </Row>
          </section>
        </div>
      </S.Container>
    </Container>
  );
}

export default BuyTicket;
