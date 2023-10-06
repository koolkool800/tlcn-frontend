import Checkbox from '@components/common/Checkbox';
import { H6 } from '@style/DefaultStyled';
import { Collapse, CollapseProps, Form } from 'antd';
import { ArrowDown2 } from 'iconsax-react';
import PinTransaction from '../PinTransaction';
import SellerShipment from '../SellerShipment';
import * as S from './style';

enum CollapseKeyType {
  PIN_TRANSACTION = '1',
  ONSITE_TRANSACTION = '2',
  SELLER_SHIPMENT = '3',
}

const items: CollapseProps['items'] = [
  {
    key: CollapseKeyType.PIN_TRANSACTION,
    label: (
      <Form.Item name="pin-transaction" valuePropName="checked">
        <Checkbox>PIN transaction</Checkbox>
      </Form.Item>
    ),
    children: <PinTransaction />,
  },

  {
    key: CollapseKeyType.SELLER_SHIPMENT,
    label: (
      <Form.Item name="seller-shipment" valuePropName="checked">
        <Checkbox>Seller shipment</Checkbox>
      </Form.Item>
    ),
    children: <SellerShipment />,
  },
];

const TransactionMethod = () => {
  return (
    <S.Container>
      <div className="description">
        <H6>Select transaction method</H6>
      </div>

      <Collapse
        expandIconPosition="end"
        items={items}
        collapsible="icon"
        bordered={false}
        expandIcon={(e: any) => {
          return (
            <>
              {e.panelKey !== CollapseKeyType.PIN_TRANSACTION && (
                <span className="setting">Setting</span>
              )}
              <ArrowDown2 className="arrow-down" />
            </>
          );
        }}
      />
    </S.Container>
  );
};

export default TransactionMethod;
