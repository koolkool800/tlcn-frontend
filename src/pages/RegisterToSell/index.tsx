import Button from '@components/common/Button';
import Modal from '@components/common/ModalConfirm';
import EventInfo from '@components/registerToSell/EventInfo';
import MethodRegistration from '@components/registerToSell/MethodRegistration';
import PriceRegistration from '@components/registerToSell/PriceRegistration';
import ProductInfo from '@components/registerToSell/ProductInfo';
import { ROUTES, ROUTE_USER } from '@constants/routes';
import useDebounce from '@hooks/useDebounce';
import eventService from '@services/eventService';
import { Container, H5 } from '@style/DefaultStyled';
import { getBase64 } from '@utils/getBase64';
import { Form, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import dayjs from 'dayjs';
import { ResponseModel } from 'interface';
import { AmountSeller, ParamsAmountSeller } from 'interface/event';
import { FormOutSiteTicketForm } from 'interface/outSiteTicket';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import * as S from './style';

function RegisterToSell() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | undefined>();
  const debounce = useDebounce(300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = Form.useWatch('totalPrice', form);
  const voucherId = Form.useWatch('voucherId', form);

  const [preAmount, setPreAmount] = useState<AmountSeller>({
    actualAmountSeller: 0,
    discountValue: 0,
    saleCommission: 0,
    salePrice: 0,
    shippingFee: 0,
  });

  /**
   * event when click button submit
   * @param values value form
   * @returns {Promise<void>}
   */
  const onFinish = async (values: FormOutSiteTicketForm): Promise<void> => {
    setLoading(true);
    try {
      const requestParams = {
        ...values,
        isObstructed: !!values.isObstructed,
        performanceDate: dayjs(values.performanceDate).format('YYYY-MM-DD'),
        pictureOfProof: imageBase64,
      };

      await eventService.createOutSiteTicket(requestParams);
      setIsModalOpen(true);
    } catch (err: any) {
      message.error(t(`HTTP_STATUS.${err.errorCode}`));
    }
    setLoading(false);
  };

  /**
   * used to get pre amount seller
   * @param requestParams { totalPrice: number; voucherId?: string }
   */
  const getPreAmountSeller = async (requestParams: ParamsAmountSeller) => {
    try {
      const response: ResponseModel<AmountSeller> =
        await eventService.getPreAmountSeller(requestParams);
      setPreAmount(response.data);
    } catch (e) {
      const error = e as ResponseModel<string>;
      if (error.errorCode === 'NOT_HAVE_PERMISSION') {
        navigate(ROUTES.REGISTRATION_SELLER);
        return;
      }
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }
  };

  useEffect(() => {
    debounce(() => {
      const valueParams = {
        totalPrice: Number(totalPrice),
        voucherId,
      };
      getPreAmountSeller(valueParams);
    });
  }, [totalPrice, voucherId]);

  /**
   * event when onChange Form
   * used to convert field pictureOfProof to base64
   * @param value
   * @param values
   * @returns {void}
   */
  const handleChange = (value: any, values: FormOutSiteTicketForm) => {
    if (value.pictureOfProof && value.pictureOfProof?.[0]) {
      getBase64(value.pictureOfProof?.[0]?.originFileObj as RcFile, (url) => {
        setImageBase64(url);
      });
    }
  };

  return (
    <>
      <S.Wrapper>
        <H5 className="title">{t('onsiteTicket.header')}</H5>
        <Form.Provider>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onValuesChange={handleChange}
            style={{ maxWidth: 840 }}
          >
            <ProductInfo />
            <MethodRegistration />
            <EventInfo />
            <PriceRegistration {...preAmount} />
            <div className="container-button-submit">
              <Button
                htmlType="submit"
                size="large"
                color={theme?.colors?.black}
                bgcolor={theme?.colors?.primary500}
                maxwidth="384"
                loading={loading}
              >
                {t('onsiteTicket.register')}
              </Button>
            </div>
          </Form>
        </Form.Provider>
        <Modal
          isOpen={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            navigate(ROUTE_USER.USER_MY_TICKET_SALES, { replace: true });
          }}
        >
          <div className="content-modal">
            <H5>{t('onsiteTicket.registerSuccess')}</H5>
            <p>{t('onsiteTicket.registerSuccessText1')}</p>
            <p>{t('onsiteTicket.registerSuccessText2')}</p>
          </div>
        </Modal>
      </S.Wrapper>
    </>
  );
}

export default RegisterToSell;
