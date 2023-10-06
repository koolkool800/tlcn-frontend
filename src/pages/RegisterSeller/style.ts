import { H6 } from '@style/DefaultStyled';
import styled from 'styled-components';

export const Layout = styled.div`
  max-width: 996px;
  margin: 0 auto;
  margin-bottom: 30px;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .img-success {
    width: 224px;
    height: 224px;
  }
`;
export const Item = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.solidBrightGreenNetrual};
  &:hover {
    background: rgba(83, 246, 198, 0.05);
  }

  .img {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }
  .content {
    margin-top: auto;
    .text-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      h6 {
        margin-bottom: 8px;
      }
    }
    .btn {
      display: flex;
      justify-content: center;
    }
  }
`;
export const Text = styled(H6)`
  width: 750px;
  text-align: center;
  font-weight: 400;
`;
