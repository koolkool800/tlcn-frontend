import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    h5 {
      font-size: 24px;
    }
  }
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 24px;

  @media (max-width: ${(props) => props.theme.isMobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
`;
export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Gap20 = styled(Wrap)`
  gap: 20px;
`;
export const Gap10 = styled(Wrap)`
  gap: 10px;
`;
export const Gap12 = styled(Wrap)`
  gap: 12px;
`;

export const WrapperGetCoupon = styled.div`
  display: flex;
  justify-content: end;

  width: 100%;
  button: {
    width: fit-content;
  }
`;

export const NoContent = styled.div`
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.colors.white};
  height: 5rem;
  color: ${(props) => props.theme.colors.white};

  display: flex;
  justify-content: center;
  align-items: center;
`;
