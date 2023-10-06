import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import UploadRegisterSeller from '@components/registerSeller/UploadRegisterSeller';
import Input from '../../common/Input';
import * as S from './style';

function EventInfo() {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        name="placeOfBuying"
        label={t('onsiteTicket.whereYouBuyTicket')}
      >
        <Input
          allowClear
          type="input"
          placeholder={t('onsiteTicket.placeholderWhereYouBuyTicket')}
        />
      </Form.Item>

      <S.ContainerUpload>
        <UploadRegisterSeller
          name="pictureOfProof"
          label={t('onsiteTicket.proofOfOwnerTicket')}
          placeholder="Upload certificate"
          rules={[
            {
              required: true,
              message: 'Please upload your business registration certificate!',
            },
          ]}
          width={343}
          height={86}
        />
      </S.ContainerUpload>
    </>
  );
}

export default EventInfo;
