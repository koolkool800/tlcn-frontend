import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  .country-name {
    color: ${(props) => props.theme.colors.emphasisDarkColorHight} !important;
  }

  .react-tel-input .form-control {
    width: 100%;
    border-radius: 14px;
    height: 40px;
    color: ${(props) => props.theme.colors.surfaceSmall};
    font-family: ${(props) => props.theme.font.variable};

    font-size: 15px;
    font-style: normal;
    font-weight: 400;
  }

  .react-tel-input .flag-dropdown,
  .react-tel-input .flag-dropdown .selected-flag,
  .react-tel-input .form-control,
  .react-tel-input .flag-dropdown.open .selected-flag,
  .react-tel-input .flag-dropdown.open,
  .react-tel-input .flag-dropdown .selected-flag {
    background-color: ${(props) => props.theme.colors.surfaceDark};
    border: 1px solid ${(props) => props.theme.colors.surfaceDark};
  }

  .disable .react-tel-input .form-control,
  .disable .react-tel-input .flag-dropdown,
  .disable .react-tel-input .flag-dropdown .selected-flag,
  .disable .react-tel-input .flag-dropdown.open .selected-flag,
  .disable .react-tel-input .flag-dropdown.open,
  .react-tel-input .flag-dropdown .selected-flag {
    background-color: ${(props) => props.theme.colors.neutral20};
    border: 1px solid ${(props) => props.theme.colors.neutral20};
  }
  .flag-dropdown {
    border-top-left-radius: 14px !important;
    border-bottom-left-radius: 14px !important;

    .selected-flag {
      border-top-left-radius: 14px !important;
      border-bottom-left-radius: 14px !important;
    }
  }
`;
