import { styled } from 'styled-components';

export const ContainerLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`;

export const ContainerExpiredDate = styled.div`
  color: ${(props) => props.theme.colors.solidBasicRed500};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const ContainerMenu = styled.div`
  margin-top: 4px;
  background-color: ${(props) => props.theme.colors.solidBasicNeutralV};
  padding: 12px;
  border-radius: 20px;
  .rc-virtual-list-holder-inner {
    gap: 16px;
    .ant-select-item {
      border-radius: 14px;
    }
  }
`;
