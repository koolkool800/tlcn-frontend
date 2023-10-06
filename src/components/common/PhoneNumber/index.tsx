import PhoneInput, { CountryData } from 'react-phone-input-2';
import { ObjectLiteral } from 'interface/general';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-phone-input-2/lib/style.css';
import * as S from './style';

type Props = {
  value?: string;
  onChange: (phone: string, countryData: CountryData | ObjectLiteral) => void;
  disabled?: boolean;
  placeholder?: string;
};

const PhoneNumber = ({ value, onChange, disabled, placeholder }: Props) => {
  return (
    <S.Wrapper>
      <div className={disabled ? 'disable' : ''}>
        <PhoneInput
          placeholder={placeholder}
          disabled={disabled}
          localization={{ vn: 'Vietnam' }}
          enableSearch
          country="vn"
          value={value}
          onChange={(
            phone: string,
            countryData: CountryData | ObjectLiteral
          ) => {
            onChange(phone, countryData);
          }}
          masks={{ kr: '..-....-....' }}
        />
      </div>
    </S.Wrapper>
  );
};

export default PhoneNumber;
