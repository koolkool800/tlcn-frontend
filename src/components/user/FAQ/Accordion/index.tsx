import { Add, Minus } from 'iconsax-react';
import { FaqType } from 'interface/user';
import { useState } from 'react';
import * as S from './style';

type Props = {
  item: FaqType;
};

const Accordion = ({ item }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpanded = () => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <S.Accordion className={expanded ? 'active' : ''}>
      <S.AccordionHeader onClick={handleExpanded}>
        <S.AccordionSummary>{item?.faqQuestion}</S.AccordionSummary>
        <S.BtnAccordion role="button">
          {expanded ? <Minus size="16" /> : <Add size="16" />}
        </S.BtnAccordion>
      </S.AccordionHeader>
      {expanded && <S.AccordionDetails>{item?.faqAnswer}</S.AccordionDetails>}
    </S.Accordion>
  );
};

export default Accordion;
