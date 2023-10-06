import Button from '@components/common/Button';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: flex-start;
  gap: 20px;
  padding: 0 16px;

  .ant-form-item {
    margin: 0 !important;
    width: 100% !important;
  }

  @media (max-width: ${(props) => props.theme.isMobile}) {
    gap: 16px;
    padding: 0px;
  }
`;
export const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  > * {
    width: 25% !important;
  }
`;

export const ButtonCreate = styled(Button)`
  width: 92px;
  background-color: ${(props) => props.theme.colors.primarySolid500};
  color: ${(props) => props.theme.colors.emphasisDarkColorHight};

  &.ant-btn-default:not(:disabled):hover {
    opacity: 0.9;
    background-color: ${(props) => props.theme.colors.primarySolid500};
  }
`;
