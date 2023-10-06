import Checkbox from '@components/common/Checkbox';
import { Collapse, CollapseProps } from 'antd';
import { ArrowDown2 } from 'iconsax-react';
import * as S from './styles';

const PinTransaction = () => {
  return (
    <S.Container>
      <S.Typography>PIN transaction</S.Typography>
      <ul>
        <li>
          After the buyer payed for the system, you need to transfer the PIN
          number of the ticket to the buyer via platform.
        </li>
        <li>
          Since the buyer received the ticket, 24 hours later you can withdraw
          money at the sales history
        </li>
      </ul>
    </S.Container>
  );
};

export default PinTransaction;
