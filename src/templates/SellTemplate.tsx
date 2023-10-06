import TopHeader from '@components/common/HeaderTop';
import { Outlet } from 'react-router-dom';
import { Container } from '../style/DefaultStyled';

const SellTemplate = () => {
  return (
    <Container>
      <div style={{ paddingTop: 32, paddingBottom: 48 }}>
        <TopHeader />
      </div>

      <Outlet />
    </Container>
  );
};

export default SellTemplate;
