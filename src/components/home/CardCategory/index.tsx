import React from 'react';
import * as S from './styles';

type CardType = {
  title: string;
  backgroundImg?: string;
};
function CardCategory({ title, backgroundImg }: CardType) {
  return (
    <S.CardCategory backgroundImg={backgroundImg}>
      <div className="overlay" />
      <p>{title}</p>
    </S.CardCategory>
  );
}
CardCategory.defaultProps = {
  backgroundImg: '',
};
export default CardCategory;
