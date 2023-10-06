import { AutoComplete } from 'antd';
import { styled } from 'styled-components';

export const InputContainer = styled.div`
  min-width: 336px;
  isolation: isolate;

  .ant-select-single {
    width: 100%;
    height: auto;
  }
  input.ant-input {
    background-color: transparent !important;
  }
  @media (max-width: ${(props) => props.theme.breakPoint.md}px) {
    min-width: auto;
    .drawer-container {
      position: absolute;
      left: 0;
      transform: translateY(10px);
      width: 100vw;
      height: 452px;
      overflow: auto;
      transition: height 0.2s ease-in;
      &.hide {
        height: 0px;
      }
      .drawer-wrap {
        position: relative;
        background-color: ${(props) => props.theme.colors.solidBasicNeutral800};
        padding: 16px;

        .title-type {
          color: ${(props) => props.theme.colors.surfaceHight};
          font-size: 12px;
          font-weight: 700;
          line-height: 20px;
          letter-spacing: 0.4000000059604645px;
          text-align: left;
          text-transform: uppercase;
        }
        .event-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          border-radius: 14px;
          &:hover {
            background-color: ${(props) => props.theme.colors.surfaceDark};
          }
          .event-name {
            .title {
              color: ${(props) => props.theme.colors.surfaceHight};
              font-size: 14px;
              font-weight: 400;
              line-height: 22px;
              letter-spacing: 0em;
              text-align: left;
              span.accent {
                color: ${(props) => props.theme.colors.primarySolid500};
              }
            }
            .stadium {
              color: ${(props) => props.theme.colors.surfaceMedium};
              font-size: 14px;
              font-weight: 400;
              line-height: 22px;
              letter-spacing: 0em;
              text-align: left;
            }
          }
          .event-perform {
            .perform-time {
              color: ${(props) => props.theme.colors.surfaceHight};
              //styleName: Other/Caption;
              font-size: 12px;
              font-weight: 400;
              line-height: 20px;
              letter-spacing: 0.4000000059604645px;
              text-align: right;
            }
          }
        }
      }
    }
  }
`;

export const PopupStyle = styled.div`
  background-color: ${(props) => props.theme.colors.solidBasicNeutral800};
  padding: 24px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  .ant-select-item-option-content {
    overflow: auto;
    white-space: normal;
  }
  .ant-select-item.ant-select-item-option.ant-select-item-option-grouped {
    padding-inline-start: 0;
    padding: 0;
    &.ant-select-item-option-active {
      border-radius: 0;
      background-color: transparent;
    }
  }
  .ant-select-item {
    padding: unset;
  }
  .title-type {
    color: ${(props) => props.theme.colors.surfaceHight};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    text-transform: uppercase;
  }
  .event-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* gap: 80px; */
    padding: 8px 16px;
    border-radius: 14px;
    &:hover {
      background-color: ${(props) => props.theme.colors.surfaceDark};
    }
    .event-name {
      max-width: 183px;

      .title {
        color: ${(props) => props.theme.colors.surfaceHight};
        span.accent {
          color: ${(props) => props.theme.colors.primarySolid500};
        }
      }
      .stadium {
        color: ${(props) => props.theme.colors.surfaceMedium};
      }
    }
    .event-perform {
      .perform-time {
        color: ${(props) => props.theme.colors.surfaceHight};
      }
    }
  }
`;

export const BreakLine = styled.div`
  padding: 20px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  .mini-line {
    width: 16px;
    height: 1px;
    background-color: ${(props) => props.theme.colors.emphasisDarkSurfaceSmall};
  }
`;
