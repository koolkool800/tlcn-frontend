import Button from '@components/common/Button';
import { styled } from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  max-width: 792px;
  margin: 0 auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
export const FlexBetween = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;
export const TextDetail = styled.div`
  color: ${(props) => props.theme.colors.surfaceMedium};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.4px;
  text-decoration-line: underline;
  cursor: pointer;
`;
export const ItemTicket = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  padding: 20px 16px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.surfaceDark};
  span {
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-family: ${(props) => props.theme.font.variable};
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }
`;
