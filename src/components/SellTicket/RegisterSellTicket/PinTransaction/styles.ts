import { styled } from 'styled-components';
import { Typography as T } from '@style/DefaultStyled';

export const Container = styled.div`
  ul {
    color: ${(props) => props.theme.colors.white};
    list-style-type: none;
    margin-top: 8px;
  }

  ul li:not(:last-child) {
    margin-bottom: 8px;
  }

  .ant-collapse-item svg {
    transform: rotate(0);
  }

  .ant-collapse-item-active svg {
    transform: rotate(180deg);
  }

  .ant-collapse-borderless > .ant-collapse-item {
    border-bottom: 0px;
    margin-bottom: 12px;
  }
`;

export const Typography = styled(T)`
  font-weight: 700;

  text-align: center;
`;
