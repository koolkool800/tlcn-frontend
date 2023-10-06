import * as S from './style';

function DescriptionTransactionMethod({
  content,
  title,
}: {
  content: any;
  title: any;
}) {
  return (
    <S.Wrapper>
      {title}
      {content}
    </S.Wrapper>
  );
}

export default DescriptionTransactionMethod;
