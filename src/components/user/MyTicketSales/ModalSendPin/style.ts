import { styled } from 'styled-components';

export const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 384px;
  display: flex;

  flex-direction: column;
  gap: 32px;

  text-align: left;
  .input-pin {
    margin-bottom: 34px;
  }
`;
