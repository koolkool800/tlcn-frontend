export type LoginType = {
  email: string;
  password: string;
};

export type FormLogin = LoginType & {
  remember: boolean;
};

export type Auth = {
  email: string | undefined;
  name: string | undefined;
  accessToken: string | null;
  state?: string;
};

export type ForgotPasswordType = {
  email: string;
};

export type ResetPasswordType = {
  email: string;
  otp: string;
  newPassword: string;
};

export interface AuthQueryParams {
  code: string | undefined;
  state: string | undefined;
  email?: string;
  name?: string;
  redirectUrl?: string;
  errorCode?: string;
  errorMessage?: string;
}

export interface AuthSignUp {
  email: string | undefined;
  name: string | undefined;
  phone?: string | undefined;
  password: string | undefined;
  address: string | undefined;
  detailAddress?: string | undefined;
  zoneCode: string | undefined;
  state?: string | undefined;
  dob?: string | null;
}
export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
};

export type DataVerifyNice = {
  dataEncrypted: string;
  integrityValue: string;
  tokenVersionId: string;
};
export type CreateFormVerifyNice = {
  m: string;
  enc_data: string;
  integrity_value: string;
  token_version_id: string;
};
