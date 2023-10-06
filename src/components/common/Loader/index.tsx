import Logo from '@assets/images/logo.png';
import * as S from './styles';

function Loader() {
  return (
    <S.Loader>
      {/* <div className="spinner">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div> */}
      <img src={Logo} alt="logo" />
    </S.Loader>
  );
}

export default Loader;
