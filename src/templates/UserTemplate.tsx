import TopHeader from '@components/common/HeaderTop';
import Footer from '@components/common/footer';
import { useAppDispatch } from '@hooks/useAppDispatch';
import useAuth from '@hooks/useAuth';
import useProfile from '@hooks/useProfile';
import { setProfile } from '@redux/reducer/userReducer';
import userService from '@services/userService';
import { Col, Row } from 'antd';
import { ResponseModel } from 'interface';
import { UserType } from 'interface/user';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from '../components/user/SideBar';
import { ROUTE_USER } from '../constants/routes';
import { Container } from '../style/DefaultStyled';

const UserTemplate = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const currentTab = location.pathname ?? ROUTE_USER.USER_MY_PAGE;

  const profile = useProfile();
  const user = useAuth();
  /**
   * func load profile
   * @returns {void}
   */
  const loadProfile = async () => {
    try {
      const res: ResponseModel<UserType> = await userService.getProfile();
      dispatch(setProfile(res?.data || null));
    } catch (err) {
      /** * error */
    }
  };

  useEffect(() => {
    if (!profile || profile?.email !== user?.email) {
      loadProfile();
    }
  }, []);

  return (
    <Container>
      <div className="user-top-header">
        <TopHeader />
      </div>
      <Row gutter={[24, 0]}>
        <Col md={6} sm={24}>
          <SideBar currentTab={currentTab} />
        </Col>
        <Col md={18} sm={24} style={{ width: '100%' }}>
          <Outlet />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default UserTemplate;
