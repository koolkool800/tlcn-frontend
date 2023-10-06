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

  max-width: 600px;
`;

export const Description = styled(Typography)`
  font-size: 16px;
  width: 100%;
`;

export const TypographyCustom = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
`;

export const WrapperDetail = styled.div`
  padding: 20px 16px;
  border-radius: 16px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.neutral20};

  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${(props) => props.theme.colors.surfaceDarkOutline};
    padding: 12px 0px;
  }

  &.item:last-child {
    border-bottom: 0px;
  }
`;
