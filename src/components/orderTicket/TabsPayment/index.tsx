import { PAYMENT_METHOD } from '@constants/codeConstants';
import { useState } from 'react';
import * as S from './styles';

type TabsPropType = {
  value?: string;
  onChange?: (value: string) => void;
};

const listItem: { title: string; value: string }[] = [
  {
    title: 'Credit Card',
    value: PAYMENT_METHOD.CREDIT_CARD,
  },
  {
    title: 'Virtual account',
    value: PAYMENT_METHOD.VIRTUAL_ACCOUNT,
  },
  {
    title: 'Kakao Pay',
    value: PAYMENT_METHOD.KAKAO_PAY,
  },
  {
    title: 'Naver pay',
    value: PAYMENT_METHOD.NAVER_PAY,
  },
  {
    title: 'Paypal',
    value: PAYMENT_METHOD.PAYPAL,
  },
];

function TabsPayment({ value, onChange }: TabsPropType) {
  const [currentTab, setCurrentTab] = useState(value);

  /**
   * event onChange tab
   * @param valuePayment value payment method
   * @returns {void}
   */
  const handleClickTabsCard = (valuePayment: string): void => {
    onChange?.(valuePayment);
    setCurrentTab(valuePayment);
  };

  const renderTabCard = () => {
    return listItem.map((item) => {
      return (
        <S.TabsCard
          key={item.value}
          onClick={() => handleClickTabsCard(item.value)}
          className={currentTab === item.value ? 'tab-active' : ''}
        >
          {item.title}
        </S.TabsCard>
      );
    });
  };

  return (
    <S.TabsContainer>
      <div className="tab-cards-wrap">{renderTabCard()}</div>
    </S.TabsContainer>
  );
}

export default TabsPayment;
