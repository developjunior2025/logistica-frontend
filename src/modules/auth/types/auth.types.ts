export type TUserRole =
  | 'PROF-CLI-001'
  | 'PROF-TIE-002'
  | 'PROF-SUP-003'
  | 'PROF-OPE-004'
  | 'PROF-INS-005'
  | 'PROF-TRP-006'
  | 'PROF-AGA-007'
  | 'PROF-AUD-008';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: TUserRole;
  storeId?: number;
  active: boolean;
  createdAt: string;
}

export interface ILoginResponse {
  access_token: string;
  user: IUser;
}

export interface IRegisterResponse {
  access_token: string;
  user: IUser;
}
