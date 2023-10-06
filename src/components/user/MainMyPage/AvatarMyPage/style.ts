import Button from '@components/common/Button';
import { styled } from 'styled-components';

export const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;
export const Name = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  padding: 14px;
  flex-shrink: 0;
  border-radius: 19.6px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.colors.emphasisDarkSurfaceHigh};
  text-align: center;
  font-size: 21px;
  font-family: ${(props) => props.theme.font.semiBold};
  font-style: normal;
  font-weight: 400;
  line-height: 28px;

  border-radius: 100%;
`;

export const TextAvatar = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  position: relative;

  h5 {
    color: ${(props) => props.theme.colors.colorHigh};
    font-family: ${(props) => props.theme.font.variable};
    font-style: normal;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }
  span {
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-family: Arial;
    font-style: normal;
    font-size: 14px;
    font-weight: 400;
    line-height: 140%;
  }

  .level {
    position: absolute;
    left: 110%;
    top: 14%;
    height: 20px;

    width: fit-content;
    padding: 4px 6px;
    border-radius: 8.4px;

    white-space: nowrap;
    color: ${(props) => props.theme.colors.primary500};
    background-color: ${(props) => props.theme.colors.solidLightGreenNetrual};

    display: flex;
    align-items: center;
    font-size: 9px;

    @media (max-width: ${(props) => props.theme.isMobile}) {
      position: initial !important;
      margin: 8px auto;
    }
  }
`;

export const ButtonUpgrade = styled(Button)`
  width: fit-content;
  height: 32px;
  margin: auto;

  font-size: 12px;
  padding: 8px 16px;

  span {
    margin-right: 6px;
  }
`;

export const Wrapper = styled.div`
  margin-bottom: 32px;
`;

export const WrapperUserRole = styled.div`
  margin-top: 32px;
`;

export const UserRole = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  .item {
    font-size: 16px;
    color: ${(props) => props.theme.colors.white};
  }

  .item:not(:last-child) {
    border-right: 1px solid
      ${(props) => props.theme.colors.emphasisDarkSurfaceMedium};
  }
  .item .title {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  /* .item:not(:first-child) .title {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .item:not(:first-child) .active {
    align-items: center;
  } */

  .active {
    color: ${(props) => props.theme.colors.primary500};
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .desc {
    margin-top: 4px;
    font-size: 14px;
    color: ${(props) => props.theme.colors.emphasisDarkSurfaceMedium};
    text-align: center;
  }

  /* .desc:not(:first-child) {
    text-align: center;
  } */
`;
