import closePng from '@assets/images/close.png';
import successIcon from '@assets/images/successIcon.png';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { H5, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Form, Modal, ModalProps, UploadFile, UploadProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { RcFile } from 'antd/es/upload';
import { Eye, Trash } from 'iconsax-react';
import { useEffect, useState } from 'react';
import UploadRegisterSeller from '@components/registerSeller/UploadRegisterSeller';
import { useTranslation } from 'react-i18next';
import * as S from './style';

export type OrderReport = {
  id: string;
  orderNumber: string;
  orderDate: string;
  orderTitle: string;
};

type PopupReportType = {
  order?: OrderReport;
  loading: boolean;
  onSubmitReport: (orderId: string, values: any) => void;
} & ModalProps;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const PopUpNotification = ({
  type,
  ...rest
}: { type: 'success' } & ModalProps) => {
  const { t } = useTranslation();
  const contentNoti = {
    success: (
      <div className="main">
        <img src={successIcon} alt="Success" />
        <H5>{t('myPurchase.confirmSuccess')}</H5>
      </div>
    ),
  }[type];

  return (
    <Modal
      {...rest}
      closeIcon={<img src={closePng} alt="close-popup" />}
      modalRender={(node) => (
        <S.PopupNotiContainer>{node}</S.PopupNotiContainer>
      )}
    >
      {contentNoti}
    </Modal>
  );
};

const PopupReport = ({
  order,
  onSubmitReport,
  loading,
  ...restProps
}: PopupReportType) => {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<any>();
  const [form] = useForm();

  const handleChange: UploadProps['onChange'] = ({
    fileList: newFileList,
    file,
  }) => {
    setFileList((pre) => newFileList);
    form.setFieldValue('proof', newFileList);
  };

  const handleUpdateFileList = (uid: string) => {
    setFileList((pre) => pre.filter((file) => file.uid !== uid));
    form.setFieldValue(
      'proof',
      fileList.filter((file) => file.uid !== uid)
    );
  };

  const handleSubmitReport = (values: any) => {
    if (order) {
      onSubmitReport(order.id, values);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage({
      previewImage: file.url || (file.preview as string),
      previewTitle:
        file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    });
  };

  const handleCancelReview = () => {
    setPreviewImage(undefined);
  };

  useEffect(() => {
    if (typeof order === 'undefined') {
      form.resetFields();
      setFileList([]);
    }
  }, [order]);

  const listUploadRender = () => {
    return fileList.map((file) => {
      return (
        <div className="item-upload" key={file.uid}>
          <Typography className="item-name">{file.name}</Typography>
          <div className="actions">
            <Eye
              size="20"
              color={theme.colors.surfaceMedium}
              onClick={() => handlePreview(file)}
            />
            <Trash
              size="20"
              color={theme.colors.red700}
              onClick={() => handleUpdateFileList(file.uid)}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Modal
        {...restProps}
        title={<H5>{t('myPurchase.report')}</H5>}
        modalRender={(node) => <S.ModalContainer>{node}</S.ModalContainer>}
        closeIcon={<img src={closePng} alt="close-popup" />}
        footer={
          <div className="btn-wrap">
            <Button
              color="#000"
              bgcolor={theme.colors.primary500}
              hoverbgcolor={theme.colors.primary550}
              form="reportForm"
              htmlType="submit"
              loading={loading}
            >
              {t('myPurchase.send')}
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          id="reportForm"
          onFinish={handleSubmitReport}
          layout="vertical"
        >
          <div className="form-report-container">
            <div className="detail">
              <div className="label">{t('myPurchase.orderInfo')}</div>
              <Typography>
                {t('myPurchase.orderNum')} {order?.id}
              </Typography>
              <Typography>
                {t('myPurchase.orderDate')} {order?.orderDate}
              </Typography>
              <Typography>{order?.orderTitle}</Typography>
            </div>
            <Form.Item
              label={t('myPurchase.detailReport')}
              name="detail"
              rules={[
                { required: true, message: t('myPurchase.fieldRequired') },
              ]}
            >
              <Input placeholder={t('myPurchase.reasonPlaceholder')} />
            </Form.Item>
            <div className="container-pop">
              <UploadRegisterSeller
                multiple
                name="proof"
                label={t('common.uploadProof')}
                placeholder={t('common.uploadProof')}
                rules={[
                  {
                    required: true,
                    message: t('myPurchase.proofUpload'),
                  },
                ]}
                width={343}
                height={86}
              />
            </div>

            <div className="list-upload">{listUploadRender()}</div>
          </div>
        </Form>
      </Modal>
      <Modal
        open={Boolean(previewImage)}
        modalRender={(node) => <S.ModalContainer>{node}</S.ModalContainer>}
        footer={null}
        onCancel={handleCancelReview}
      >
        {previewImage && (
          <>
            <Typography>{previewImage.previewTitle}</Typography>
            <img
              alt="example"
              style={{ width: '100%' }}
              src={previewImage.previewImage}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default PopupReport;
