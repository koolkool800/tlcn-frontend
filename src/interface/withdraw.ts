export type BankAccountInfo = {
  id: number;
  bankName: string;
  accountNumber: string;
  name: string;
};
export type UserInformationWithdraw = {
  totalBalance: number;
  bankAccount: BankAccountInfo;
};

export type WithdrawDetail = {
  id: number;
  createdAt: string;
  details: string;
  accumulate: number;
  withdraw: number;
  balance: number;
};

export type WithdrawHistory = {
  id: number;
  createdAt: string;
  amount: number;
  comment: string;
  status: string;
};
