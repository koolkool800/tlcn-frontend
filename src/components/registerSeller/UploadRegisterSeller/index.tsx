import { Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Form, Modal, Upload, UploadFile, UploadProps, message } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { Eye, Image, TransmitSquare, Trash } from 'iconsax-react';
import { useCallback, useState } from 'react';
import * as S from './style';

interface UploadRegisterSellerProps {
  name: string;
  label: string;
  placeholder: string;
  rules: any;
  padding?: number;
  width?: number;
  height?: number;
  multiple?: boolean;
}
const getBase64File = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UploadRegisterSeller = ({
  name,
  label = '',
  placeholder = '',
  rules,
  width = 384,
  height = 66,
  multiple = false,
}: UploadRegisterSellerProps) => {
  const form = Form.useFormInstance();
  const [fileListValue, setFileListValue] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<any>();
  const [previewOpen, setPreviewOpen] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const allowedExtensions = ['image/png', 'image/jpeg', 'application/pdf'];
    const isAllowed = allowedExtensions.includes(file.type);

    if (!isAllowed) {
      message.error('Only PNG, JPEG, and PDF files are allowed to be uploaded');
      return false;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      message.error('File size is too large. Please upload files under 5MB');
      return false;
    }
    return false;
  };
  const handleChange: UploadProps['onChange'] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    const filteredFileList = info.fileList.filter((file) => {
      return file.type !== 'image/svg+xml';
    });
    setFileListValue(filteredFileList);

    if (filteredFileList.length > 0) {
      form.setFieldsValue({
        [name]: filteredFileList,
      });
    } else {
      form.setFieldsValue({
        [name]: undefined,
      });
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64File(file.originFileObj as RcFile);
    }

    const fileName = file.name as string;
    const lastDotIndex = fileName.lastIndexOf('.');
    const fileExtension = fileName.substring(lastDotIndex + 1);

    setPreviewImage({
      fileExtension,
      previewImage: file.url || (file.preview as string),
      previewTitle:
        file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    });
    setPreviewOpen(true);
  };
  const handleUpdateFileList = (uid: string) => {
    setFileListValue((pre) => pre.filter((file) => file.uid !== uid));

    form.setFieldsValue({
      [name]: fileListValue.filter((file) => file.uid !== uid),
    });
  };

  const uploadRender = useCallback(() => {
    return fileListValue.map((file) => {
      return (
        <S.Wrapper key={file.uid} width={width} height={height}>
          <div className="upload-thumbnail ">
            <Image size={24} />
          </div>
          <Typography className="upload-name">{file.name}</Typography>
          <div className="actions">
            <Eye
              size="20"
              color={theme.colors.surfaceMedium}
              onClick={(event: any) => {
                event.stopPropagation();
                handlePreview(file);
              }}
            />
            <Trash
              size="20"
              color={theme.colors.red700}
              onClick={(event: any) => {
                event.stopPropagation();
                handleUpdateFileList(file.uid);
              }}
            />
          </div>
        </S.Wrapper>
      );
    });
  }, [fileListValue]);

  const handleCancelReview = () => {
    setPreviewOpen(false);
  };

  const uploadProps: UploadProps = {
    maxCount: multiple ? 10 : 1,
    listType: 'picture',
    accept: 'image/*, application/pdf',
    multiple,
    fileList: fileListValue,
    onChange: handleChange,
    beforeUpload,
    customRequest: () => {},
  };

  return (
    <>
      <S.Layout>
        <Form.Item
          name={name}
          label={label}
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[...rules]}
          style={{ marginBottom: 24 }}
        >
          <Upload {...uploadProps} style={{ width: '100%' }}>
            {fileListValue?.length > 0 ? (
              <S.RenderList>{uploadRender()}</S.RenderList>
            ) : (
              <S.Wrapper width={width} height={height}>
                <div className="content">
                  <TransmitSquare size="24" />
                  <span>{placeholder}</span>
                </div>
              </S.Wrapper>
            )}
          </Upload>
        </Form.Item>
      </S.Layout>

      <Modal
        open={previewOpen}
        modalRender={(node) => <S.ModalContainer>{node}</S.ModalContainer>}
        footer={null}
        onCancel={handleCancelReview}
      >
        {previewImage?.fileExtension === 'pdf' ? (
          <div style={{ width: '100%' }}>
            <object
              data={previewImage?.previewImage}
              type="application/pdf"
              width="100%"
              height="500px"
            >
              <p>
                Unable to display PDF file.
                <a href={previewImage?.previewImage}>Download</a> instead.
              </p>
            </object>
          </div>
        ) : (
          <>
            <Typography>{previewImage?.previewTitle}</Typography>
            <img
              alt="example"
              style={{ width: '100%' }}
              src={previewImage?.previewImage}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default UploadRegisterSeller;
