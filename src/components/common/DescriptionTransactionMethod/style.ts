import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid  ${(props) => props.theme.colors.white};
  height: fit-content; 
  padding: 20px;
  overflow: hidden;
  }
`;
