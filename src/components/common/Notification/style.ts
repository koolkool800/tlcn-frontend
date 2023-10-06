import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  isolation: isolate;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background-color: rgba(255, 255, 255, 0.08);

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
`;
export const Layout = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 20px 16px;
  border-radius: 14px;
  max-width: clamp(478px, 100%, 478px);
  background: ${(props) => props.theme.colors.solidBasicNeutral800};
`;
export const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 9px 16px;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  color: ${(props) => props.theme.colors.surfaceHight};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 16px;
  line-height: 24px;

  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
  &.active {
    background: ${(props) => props.theme.colors.surfaceHight};
  }
  &.isRead {
    color: ${(props) => props.theme.colors.surfaceSmall};
  }
`;
export const Line = styled.div`
  width: 1px;
  height: 23px;
  background: ${(props) => props.theme.colors.surfaceMedium};
`;
export const IconTicket = styled.div`
  display: inline-flex;
  align-items: center;
`;
export const IsRead = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.theme.colors.red500};
  border-radius: 50%;
`;

export const ItemMeta = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  max-width: 100%;
  width: 100%;
  .meta-date {
    display: block;
    word-wrap: break-word;
  }
`;
