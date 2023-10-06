import { ArrowLeft2 } from 'iconsax-react';

import * as S from './styles';
import CustomLink from '../CustomLink';

type Props = {
  link: string | undefined;
  label: string | undefined;
};

function BackButton({ link, label }: Props) {
  return (
    <CustomLink to={link || ''}>
      <S.Btn>
        <ArrowLeft2 size="16" />
        {label}
      </S.Btn>
    </CustomLink>
  );
}

export default BackButton;
