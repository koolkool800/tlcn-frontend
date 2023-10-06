import { Spin } from 'antd';
import styled from 'styled-components';

export const StyleSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: ${(props) => props.theme.colors.primarySolid500};
  }
`;
