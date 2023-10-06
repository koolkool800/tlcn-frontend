import Button from '@components/common/Button';
import styled from 'styled-components';

export const CustomButton = styled(Button)`
  span {
    color: ${(props) => props.theme.colors.surfaceHight};
  }
`;
