import Select from '@components/common/Select';
import { Option } from '@components/common/Select/style';
import TextAreaCustom from '@components/common/TextArea';
import { Form } from 'antd';
import * as S from './styles';

const provinceOptions = [{ label: 'HCM City', value: 1 }];
const districtOptions = [{ label: 'District 1', value: 1 }];

const OnsiteTransaction = () => {
  return (
    <S.Container>
      <S.Typography>Online transaction information</S.Typography>

      <Form.Item label="Province" name="province" style={{ marginBottom: 0 }}>
        <Select placeholder="Select province" options={provinceOptions}>
          {provinceOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="District" name="district" style={{ marginBottom: 0 }}>
        <Select placeholder="Select district" options={districtOptions}>
          {districtOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <div className="textarea">
        <TextAreaCustom
          name="address"
          label="More Detail"
          placeholder="Enter more detail about the trade preferred area"
        />
      </div>
    </S.Container>
  );
};

export default OnsiteTransaction;
