import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { Col, Form, Typography, Grid } from 'antd';
import { FilterSearch, SearchNormal1 } from 'iconsax-react';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, useTheme } from 'styled-components';
import { CustomButton } from './style';

const { Text } = Typography;
const { useBreakpoint } = Grid;

function ContainerActions({
  isShown,
  setIsShown,
  totalElement,
  defaultValue,
}: {
  isShown: boolean;
  setIsShown: (value: boolean) => void;
  totalElement: number;
  defaultValue: { [key: string]: string | number } | any;
}) {
  const theme = useTheme() as DefaultTheme;
  const { t } = useTranslation();
  const screens = useBreakpoint();
  return (
    <>
      <Col
        md={6}
        xs={4}
        className="box-filter"
        style={{ flexDirection: !screens.xs ? 'row' : 'column' }}
      >
        <CustomButton
          className="button"
          style={{ maxWidth: 90 }}
          onClick={() => setIsShown(!isShown)}
          icon={<FilterSearch size="15" color={theme.colors.surfaceHight} />}
        >
          {!screens.xs ? t('home.filter') : null}
        </CustomButton>
        {!screens.xs && (
          <Text type="secondary" style={{ color: '#FFF' }}>
            {`${totalElement} ${
              totalElement > 1 ? t('home.results') : t('home.result')
            }`}
          </Text>
        )}
      </Col>
      <Col md={18} xs={20} className="box-search">
        <Form.Item name="keyword">
          <Input
            value={defaultValue?.keyword}
            placeholder={t('home.searchBar.placeHolder')}
            prefix={<SearchNormal1 />}
          />
        </Form.Item>
      </Col>
    </>
  );
}

export default ContainerActions;
