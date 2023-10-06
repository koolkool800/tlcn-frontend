import Button from '@components/common/Button';
import { H6 } from '@style/DefaultStyled';
import { styled } from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0;

  .ant-form-item {
    margin-bottom: 0px;
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    margin-top: 0px;
  }
`;
export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 28px;

  width: 384px;
`;

export const ButtonCreate = styled(Button)`
  background-color: ${(props) => props.theme.colors.primarySolid500};
  color: ${(props) => props.theme.colors.emphasisDarkColorHight};

  &.ant-btn-default:not(:disabled):hover {
    opacity: 0.9;
    background-color: ${(props) => props.theme.colors.primarySolid500};
  }
`;

export const Desc = styled(H6)`
  font-weight: 400;
`;
