import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import TextAreaCustom from '@components/common/TextArea';
import { ROUTE_USER } from '@constants/routes';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import { Form as FormAntd, message } from 'antd';
import { ResponseModel } from 'interface';
import { FormInquiryType, InquiryType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type Props = {
  disabled?: boolean;
  data?: InquiryType;
};

const Form = ({ disabled, data }: Props) => {
  const { t } = useTranslation();
  const [form] = FormAntd.useForm();
  const navigate = useNavigate();
  const theme = useTheme() as DefaultTheme;
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data?.title,
        question: data?.question,
        answer: data?.answer,
      });
    }
  }, [data]);

  /**
   * the event used to close modal
   * @returns {void}
   */
  const handleCloseModal = (): void => {
    setOpenModal(false);
    navigate(ROUTE_USER.USER_INQUIRY);
  };
  /**
   * the event used to open modal
   * @returns {void}
   */
  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  /** * Handle submit form */
  const onFinish = async (value: FormInquiryType) => {
    setLoading(true);
    try {
      const res: ResponseModel<string> = await userService.createInquiry(value);
      if (res?.result) {
        handleOpenModal();
      }
    } catch (err: any) {
      message.error(t(`HTTP_STATUS.${err.errorCode}`));
    }
    setLoading(false);
  };

  return (
    <FormAntd
      form={form}
      layout="vertical"
      style={{ minWidth: '100%' }}
      onFinish={onFinish}
    >
      <S.Container>
        <S.Wrap>
          <FormAntd.Item
            name="title"
            label={t('user.title')}
            rules={[
              {
                required: true,
                message: t('user.titleRequired'),
              },
            ]}
          >
            <Input
              disabled={disabled}
              allowClear
              placeholder={t('user.titlePlaceholder')}
            />
          </FormAntd.Item>
          <TextAreaCustom
            disabled={disabled}
            label={t('user.question')}
            name="question"
            placeholder={t('user.questionPlaceholder') as string}
            rules={[
              {
                required: true,
                message: t('user.questionRequired'),
              },
            ]}
            style={{ maxHeight: 160, minHeight: 80 }}
          />
          {data && (
            <TextAreaCustom
              disabled={disabled}
              label={t('user.answer')}
              name="answer"
              style={{ maxHeight: 160, minHeight: 80 }}
              placeholder=""
            />
          )}
          {!disabled && (
            <S.ButtonCreate htmlType="submit">{t('user.send')}</S.ButtonCreate>
          )}
        </S.Wrap>
      </S.Container>
      <Modal isOpen={openModal} onCancel={handleCloseModal}>
        <>
          <div className="content-modal ">
            <H5>{t('user.createQuestionSuccess')}</H5>
            <S.Desc>{t('user.createQuestionSuccessDesc')}</S.Desc>
          </div>

          <Button
            loading={loading}
            size="large"
            color={theme.colors.black}
            bgcolor={theme.colors.primary500}
            onClick={handleCloseModal}
          >
            {t('user.done')}
          </Button>
        </>
      </Modal>
    </FormAntd>
  );
};

export default Form;
