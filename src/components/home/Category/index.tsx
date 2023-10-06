import ArtCategory from '@assets/images/CardCategory/art_category.png';
import ClearanceCategory from '@assets/images/CardCategory/clearance_category.png';
import ConcertCategory from '@assets/images/CardCategory/concert_category.png';
import MusicalCategory from '@assets/images/CardCategory/musical_category.png';
import SportCategory from '@assets/images/CardCategory/sport_category.png';

import { EVENT_TYPE, TITLE_MENU } from '@constants/codeConstants';
import { useAppSelector } from '@hooks/useAppSelector';
import { RootState } from '@redux/store';
import { ContainerSection } from '../../../style/DefaultStyled';
import CategoryItem from '../CategoryItem';
import * as S from './styles';

const defaultCategory = [
  {
    iconUrl: ConcertCategory,
    id: -5,
    inTopBar: true,
    name: TITLE_MENU.CONCERT,
    eventTypes: EVENT_TYPE.CONCERT,
  },
  {
    iconUrl: SportCategory,
    id: -4,
    inTopBar: true,
    name: TITLE_MENU.SPORT,
    eventTypes: EVENT_TYPE.SPORT,
  },
  {
    iconUrl: ArtCategory,
    id: -3,
    inTopBar: true,
    name: TITLE_MENU.ART_GALLERY,
    eventTypes: EVENT_TYPE.ART_GALLERY,
  },
  {
    iconUrl: MusicalCategory,
    id: -2,
    inTopBar: true,
    name: TITLE_MENU.MUSICAL,
    eventTypes: EVENT_TYPE.OTHER,
  },
  {
    iconUrl: ClearanceCategory,
    id: -1,
    inTopBar: true,
    name: TITLE_MENU.CLEARANCE,
    eventTypes: null,
  },
];

function Category() {
  const { eventCategory } = useAppSelector(
    (state: RootState) => state.navigationReducer
  );

  return (
    <ContainerSection>
      <S.CategoryWrap>
        {eventCategory && eventCategory.length > 0
          ? [
              ...defaultCategory,
              ...eventCategory.filter((eventCate) => !eventCate.inTopBar),
            ].map((category) => (
              <CategoryItem
                key={category.name}
                title={category.name}
                bgImage={category.iconUrl}
                inTopBar={category.inTopBar}
                id={category.id}
                eventTypes={category?.eventTypes}
              />
            ))
          : defaultCategory.map((category) => (
              <CategoryItem
                key={category.name}
                title={category.name}
                bgImage={category.iconUrl}
                inTopBar={category.inTopBar}
                id={category.id}
                eventTypes={category?.eventTypes}
              />
            ))}
      </S.CategoryWrap>
    </ContainerSection>
  );
}

export default Category;
