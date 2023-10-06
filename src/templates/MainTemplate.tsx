import { useAppDispatch } from '@hooks/useAppDispatch';
import useScroll from '@hooks/usePosition';
import { setEventCategory } from '@redux/reducer/navigationReducer';
import eventService from '@services/eventService';
import { useEffect, useState } from 'react';
import { Outlet, OutletProps } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/footer';

function MainTemplate(props: OutletProps) {
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(true);
  const scrollPosition: number = useScroll();
  const fetchData = async () => {
    try {
      const res = await eventService.getNavigationCategory();
      dispatch(setEventCategory(res.data));
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (scrollPosition > 20) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [scrollPosition]);

  return (
    <>
      <Header visible={visible} />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainTemplate;
