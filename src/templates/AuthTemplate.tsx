import HeaderAuth from '@components/common/HeaderAuth';
import Footer from '@components/common/footer';
import { Outlet } from 'react-router-dom';
import { Container } from '../style/DefaultStyled';

const AuthTemplate = () => {
  return (
    <Container>
      <HeaderAuth />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default AuthTemplate;
