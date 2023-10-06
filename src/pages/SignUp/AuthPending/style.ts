import { Spin } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export const SpinAnt = styled(Spin)`
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%);

  &.ant-spin .ant-spin-dot-item {
    color: ${(props) => props.theme.colors.primary500};
    background-color: ${(props) => props.theme.colors.primary500};
  }
`;
