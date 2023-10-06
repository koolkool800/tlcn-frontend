import Button from '@components/common/Button';
import { H6 } from '@style/DefaultStyled';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: left;

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 384px;

    @media (max-width: ${(props) => props.theme.isMobile}) {
      width: 100%;
      min-width: 280px;
    }
  }
`;
