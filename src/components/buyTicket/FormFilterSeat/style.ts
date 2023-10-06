import { styled } from 'styled-components';

export const WrapFilter = styled.div`
  width: 100%;
  display: flex;
  align-self: stretch;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 24px;
  .ant-select-selection-item {
    max-width: 120px;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.xs}px) {
    display: flex;
    flex-direction: column;
  }
`;
