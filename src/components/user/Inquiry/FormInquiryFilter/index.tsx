import Input from '@components/common/Input';
import { ROUTE_USER } from '@constants/routes';
import useDebounce from '@hooks/useDebounce';
import { Form } from 'antd';
import { SearchNormal1 } from 'iconsax-react';
import { FilterType } from 'interface/general';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

type Props = {
  search: string;
  setSearchValue: (value: string) => void;
};

const FormFilterInquiry = ({ search, setSearchValue }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const debounce = useDebounce();
  const onValuesChange = (changedValues: FilterType) => {
    debounce(() => setSearchValue(String(changedValues?.search || '')));
  };

  /** *
   * Onclick create
   */
  const onCreate = () => {
    navigate(ROUTE_USER.USER_CREATE_INQUIRY);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ minWidth: '100%' }}
      onValuesChange={onValuesChange}
    >
      <S.Container>
        <Form.Item name="search" initialValue={search}>
          <Input
            allowClear
            placeholder={t('user.search')}
            prefix={<SearchNormal1 size="20" color="#FFFFFF" />}
          />
        </Form.Item>
        <S.ButtonCreate onClick={onCreate}>{t('user.create')}</S.ButtonCreate>
      </S.Container>
    </Form>
  );
};

export default FormFilterInquiry;
