import styled from 'styled-components';
import { Typography as T } from '@style/DefaultStyled';

export const Container = styled.div`
  .description {
    margin-bottom: 12px;
  }

  .ant-collapse-expand-icon {
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  .ant-collapse-header {
    padding: 0px !important;
  }
  .ant-collapse-content-box {
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.neutral900};
    padding: 16px !important;
  }

  ul {
    color: ${(props) => props.theme.colors.white};
    list-style-type: none;
    margin-top: 8px;
  }

  ul li:not(:last-child) {
    margin-bottom: 8px;
  }

  .ant-collapse-item .arrow-down {
    transform: rotate(0);
  }

  .ant-collapse-item-active .arrow-down {
    transform: rotate(180deg);
  }

  .ant-collapse-borderless > .ant-collapse-item {
    border-bottom: 0px;
    margin-bottom: 12px;
  }

  .setting {
    font-size: 12px;
    color: ${(props) => props.theme.colors.surfaceMedium};
    margin-right: 4px;
  }
`;

export const Typography = styled(T)`
  font-weight: 700;

  text-align: center;
`;
