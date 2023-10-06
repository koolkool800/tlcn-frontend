import { ROUTES } from '@constants/routes';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

type Props = {
  title: string;
  bgImage: string;
  inTopBar: boolean;
  id: number;
  eventTypes?: string | null | undefined;
};

const CategoryItem = ({ title, bgImage, inTopBar, id, eventTypes }: Props) => {
  const navigate = useNavigate();

  const onClickEvent = () => {
    // page clearance
    if (id < 0 && !eventTypes) {
      return navigate(ROUTES.CLEARANCE);
    }

    // event page
    if (id < 0 && eventTypes) {
      return navigate(
        `${ROUTES.EVENT_PAGES}?${queryString.stringify({
          eventTypes,
          title,
        })}`
      );
    }

    return navigate(
      `${ROUTES.EVENT_PAGES}?${queryString.stringify({
        navCateId: id,
        title,
      })}`
    );
  };

  return (
    <S.Container onClick={onClickEvent}>
      <img src={bgImage} alt={title} />
      <S.H5Custom>{title}</S.H5Custom>
    </S.Container>
  );
};

export default CategoryItem;
