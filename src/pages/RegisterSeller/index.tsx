import ceo from '@assets/images/ceo.png';
import iconSuccess from '@assets/images/icon-success.png';
import manager from '@assets/images/manager.png';
import Button from '@components/common/Button';
import FormRegisterSellerModal, {
  FormRegisterSellerValue,
} from '@components/registerSeller/FormRegisterSellerModal';
import authService from '@services/authService';
import userService from '@services/userService';
import { Container, H5, H6, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { createAndSubmitFormVerifyNice } from '@utils/helper';
import { Col, Row, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { DataVerifyNice, ResponseModel } from 'interface';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const RegisterSeller = () => {
  const { t } = useTranslation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const registerSeller = async (requestParams: FormData) => {
    try {
      const response: ResponseModel<any> = await userService.registerSeller(
        requestParams
      );
      if (response?.result) {
        setShowSuccess(true);
      }
    } catch (e) {
      const error = e as ResponseModel<string>;
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleSubmit = async (values: FormRegisterSellerValue) => {
    const formData = new FormData();
    const bankbookFileValue = values?.bankbookFile[0]?.originFileObj as RcFile;
    const certificateFileValue = values?.certificateFile[0]
      ?.originFileObj as RcFile;
    formData.append('email', values?.email);
    formData.append('bankbookFile', bankbookFileValue);
    formData.append('certificateFile', certificateFileValue);

    await registerSeller(formData);
    handleCancelModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchStateRegisterBusiness = async () => {
    try {
      const response: ResponseModel<any> =
        await userService.getStateRegisterSeller();

      if (response.data?.status !== 2) {
        setShowSuccess(true);
      }
    } catch (e) {
      const error = e as ResponseModel<string>;
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }
  };

  useEffect(() => {
    fetchStateRegisterBusiness();
  }, []);

  /**
   * function get data to verify Nice API
   * @returns {Promise<any>}
   *
   */
  const getDataVerifyNice = async (): Promise<any> => {
    try {
      const res = await authService.getVerifyDataNice();
      return res.data;
    } catch (e) {
      return e;
    }
  };
  /**
   * function used to request verify Nice API
   * @returns {Promise<void>}
   */
  const handleRegisterNice = async (): Promise<void> => {
    const data: DataVerifyNice = await getDataVerifyNice();
    if (data) {
      const requestData = {
        m: 'service',
        enc_data: data.dataEncrypted,
        integrity_value: data.integrityValue,
        token_version_id: data.tokenVersionId,
      };
      createAndSubmitFormVerifyNice(requestData);
    }
  };

  return (
    <Container>
      <S.Layout>
        {/* container verify Nice */}
        <div id="form-container" />

        <S.Wrapper>
          <H5>{t('registerSeller.sellerRegistration')}</H5>
          <S.Wrapper>
            {showSuccess ? (
              <>
                <div className="img-success">
                  <img src={iconSuccess} alt={iconSuccess} />
                </div>
                <S.Text>{t('registerSeller.successMessage')}</S.Text>
              </>
            ) : (
              <Row gutter={[24, 16]}>
                {/* <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <S.Item>
                    <div className="img">
                      <img src={ceo} alt={ceo} />
                    </div>
                    <div className="content">
                      <div className="text-content">
                        <H6>{t('registerSeller.individual.title')}</H6>
                        <Typography>
                          {t('registerSeller.individual.content1')}
                        </Typography>
                        <Typography>
                          {t('registerSeller.individual.content2')}
                        </Typography>
                      </div>
                      <div className="btn">
                        <Button
                          size="large"
                          maxwidth="260"
                          color={theme?.colors?.black}
                          bgcolor={theme?.colors?.primary500}
                          onClick={handleRegisterNice}
                        >
                          {t('registerSeller.register')}
                        </Button>
                      </div>
                    </div>
                  </S.Item>
                </Col> */}
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <S.Item>
                    <div className="img">
                      <img src={manager} alt={manager} />
                    </div>
                    <div className="content">
                      <div className="text-content">
                        <H6> {t('registerSeller.business.title')}</H6>
                        <Typography>
                          {t('registerSeller.business.content1')}
                        </Typography>
                        <Typography>
                          {t('registerSeller.business.content2')}
                        </Typography>
                      </div>
                      <div className="btn">
                        <Button
                          size="large"
                          maxwidth="260"
                          color={theme?.colors?.black}
                          bgcolor={theme?.colors?.primary500}
                          onClick={handleOpenModal}
                        >
                          {t('registerSeller.register')}
                        </Button>
                      </div>
                    </div>
                  </S.Item>
                </Col>
              </Row>
            )}
          </S.Wrapper>

          <FormRegisterSellerModal
            open={openModal}
            onCancel={handleCancelModal}
            onSubmit={handleSubmit}
          />
        </S.Wrapper>
      </S.Layout>
    </Container>
  );
};

export default RegisterSeller;
