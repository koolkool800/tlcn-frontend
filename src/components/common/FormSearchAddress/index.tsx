import { Form, message } from 'antd';
import { CloseCircle, SearchNormal1 } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import * as S from './style';
import { addressService } from '@services/address';
import Select from '../Select';
import { DefaultOptionType } from 'antd/es/select';

type Props = {
  requiredLabel?: boolean;
  rulesAddress?: any;
};
const FormSearchAddress = ({ requiredLabel = true, rulesAddress }: Props) => {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const zoneCode = Form.useWatch('zoneCode');
  const [district, setDistrict] = useState<{ label: string; value: string }[]>(
    []
  );
  const [openDaum, setOpenDaum] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const rules = rulesAddress || [
    {
      required: true,
      message: t('user.addressRequired'),
    },
  ];

  useEffect(() => {
    const getAddress = async (provinceCode: string) => {
      const response: { data: { name: string; code: string }[] } =
        await addressService.getDistrict(provinceCode);

      return response.data.map((item) => {
        return {
          value: item.code,
          label: item.name,
        };
      });
    };
    if (form.getFieldValue('zoneCode') !== undefined) {
      getAddress(form.getFieldValue('zoneCode'))
        .then((res) => setDistrict(res))
        .catch((err) => message.error(err));
    }
  }, [form.getFieldValue('zoneCode')]);

  const onChange = (value: string) => {
    form.setFieldValue('zoneCode', value);
  };

  const onChange2 = (value: string) => {
    form.setFieldValue('address', value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ): boolean => {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  };
  return (
    <Form.Item>
      <S.Label required={requiredLabel}>
        <span className="label">{t('user.address')}</span>
      </S.Label>
      <S.Wrapper>
        <>
          <Form.Item
            name="zoneCode"
            style={{ margin: 0, width: '100%' }}
            rules={rules}
          >
            <Select
              showSearch
              placeholder="Select a province"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                filterOption(input, option as any)
              }
              options={[
                {
                  value: '89',
                  label: 'An Giang',
                },
                {
                  value: '77',
                  label: 'Bà Rịa - Vũng Tàu',
                },
                {
                  value: '95',
                  label: 'Bạc Liêu',
                },
                {
                  value: '24',
                  label: 'Bắc Giang',
                },
                {
                  value: '06',
                  label: 'Bắc Kạn',
                },
                {
                  value: '27',
                  label: 'Bắc Ninh',
                },
                {
                  value: '83',
                  label: 'Bến Tre',
                },
                {
                  value: '74',
                  label: 'Bình Dương',
                },
                {
                  value: '52',
                  label: 'Bình Định',
                },
                {
                  value: '70',
                  label: 'Bình Phước',
                },
                {
                  value: '60',
                  label: 'Bình Thuận',
                },
                {
                  value: '96',
                  label: 'Cà Mau',
                },
                {
                  value: '04',
                  label: 'Cao Bằng',
                },
                {
                  value: '92',
                  label: 'Cần Thơ',
                },
                {
                  value: '48',
                  label: 'Đà Nẵng',
                },
                {
                  value: '66',
                  label: 'Đắk Lắk',
                },
                {
                  value: '67',
                  label: 'Đắk Nông',
                },
                {
                  value: '11',
                  label: 'Điện Biên',
                },
                {
                  value: '75',
                  label: 'Đồng Nai',
                },
                {
                  value: '87',
                  label: 'Đồng Tháp',
                },
                {
                  value: '64',
                  label: 'Gia Lai',
                },
                {
                  value: '02',
                  label: 'Hà Giang',
                },
                {
                  value: '35',
                  label: 'Hà Nam',
                },
                {
                  value: '01',
                  label: 'Hà Nội',
                },
                {
                  value: '42',
                  label: 'Hà Tĩnh',
                },
                {
                  value: '30',
                  label: 'Hải Dương',
                },
                {
                  value: '31',
                  label: 'Hải Phòng',
                },
                {
                  value: '93',
                  label: 'Hậu Giang',
                },
                {
                  value: '17',
                  label: 'Hoà Bình',
                },
                {
                  value: '79',
                  label: 'Hồ Chí Minh',
                },
                {
                  value: '33',
                  label: 'Hưng Yên',
                },
                {
                  value: '56',
                  label: 'Khánh Hòa',
                },
                {
                  value: '91',
                  label: 'Kiên Giang',
                },
                {
                  value: '62',
                  label: 'Kon Tum',
                },
                {
                  value: '12',
                  label: 'Lai Châu',
                },
                {
                  value: '20',
                  label: 'Lạng Sơn',
                },
                {
                  value: '10',
                  label: 'Lào Cai',
                },
                {
                  value: '68',
                  label: 'Lâm Đồng',
                },
                {
                  value: '80',
                  label: 'Long An',
                },
                {
                  value: '36',
                  label: 'Nam Định',
                },
                {
                  value: '40',
                  label: 'Nghệ An',
                },
                {
                  value: '37',
                  label: 'Ninh Bình',
                },
                {
                  value: '58',
                  label: 'Ninh Thuận',
                },
                {
                  value: '25',
                  label: 'Phú Thọ',
                },
                {
                  value: '54',
                  label: 'Phú Yên',
                },
                {
                  value: '44',
                  label: 'Quảng Bình',
                },
                {
                  value: '49',
                  label: 'Quảng Nam',
                },
                {
                  value: '51',
                  label: 'Quảng Ngãi',
                },
                {
                  value: '22',
                  label: 'Quảng Ninh',
                },
                {
                  value: '45',
                  label: 'Quảng Trị',
                },
                {
                  value: '94',
                  label: 'Sóc Trăng',
                },
                {
                  value: '14',
                  label: 'Sơn La',
                },
                {
                  value: '72',
                  label: 'Tây Ninh',
                },
                {
                  value: '34',
                  label: 'Thái Bình',
                },
                {
                  value: '19',
                  label: 'Thái Nguyên',
                },
                {
                  value: '38',
                  label: 'Thanh Hóa',
                },
                {
                  value: '46',
                  label: 'Thừa Thiên Huế',
                },
                {
                  value: '82',
                  label: 'Tiền Giang',
                },
                {
                  value: '84',
                  label: 'Trà Vinh',
                },
                {
                  value: '08',
                  label: 'Tuyên Quang',
                },
                {
                  value: '86',
                  label: 'Vĩnh Long',
                },
                {
                  value: '26',
                  label: 'Vĩnh Phúc',
                },
                {
                  value: '15',
                  label: 'Yên Bái',
                },
              ]}
            />
          </Form.Item>
        </>
        <Form.Item
          name="address"
          style={{ margin: 0, width: '100%' }}
          rules={rules}
        >
          <Select
            showSearch
            placeholder="Select a district"
            optionFilterProp="children"
            onChange={onChange2}
            disabled={!zoneCode}
            filterOption={(input, option) => filterOption(input, option as any)}
            options={district}
          />
        </Form.Item>
        <Form.Item name="detailAddress" style={{ margin: 0, width: '100%' }}>
          <Input
            allowClear
            disabled={!zoneCode}
            type="search"
            placeholder={t('user.detailAddress')}
          />
        </Form.Item>
      </S.Wrapper>
    </Form.Item>
  );
};

export default FormSearchAddress;
