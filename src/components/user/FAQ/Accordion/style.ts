import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
export const Accordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 20px;
  width: 100%;
  transition: all 0.2s;
  &:hover,
  &.active {
    border-radius: 25.2px;
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
  &.active {
    margin: 4px 0;
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    padding: 16px;
  }
`;
export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  cursor: pointer;
`;
export const AccordionSummary = styled.div`
  color: ${(props) => props.theme.colors.colorHigh};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;
export const AccordionDetails = styled.div`
  color: ${(props) => props.theme.colors.surfaceMedium};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-right: 32px;
`;
export const BtnAccordion = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 11.2px;
  background-color: ${(props) => props.theme.colors.colorHigh};
  color: ${(props) => props.theme.colors.black};
  cursor: pointer;
  user-select: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
