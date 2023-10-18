import * as S from './styles';

type CardType = {
  title: string | undefined;
  location: string | undefined;
  price: string | undefined;
  poster?: string | undefined;
  onClick?: () => void;
};
function CardTicket({ location, price, title, poster, onClick }: CardType) {
  return (
    <S.CardTicket onClick={onClick}>
      <div className="img-wrap">
        <img src={poster} alt={poster} />
      </div>
      <div className="bottom-content">
        <h6 className="title">{title}</h6>
        <div className="location">{location}</div>
        <p className="price">{price}</p>
      </div>
    </S.CardTicket>
  );
}

export default CardTicket;
