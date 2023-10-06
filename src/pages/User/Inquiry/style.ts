import { Typography } from '@style/DefaultStyled';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  /* max-width: 792px; */
  margin: 0 auto;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    gap: 24px;

    h5 {
      font-size: 24px;
    }
  }
`;
export const RowTicket = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

export const Description = styled(Typography)`
  width: 371px;
  text-align: center;
`;
