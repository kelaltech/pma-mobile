import { createContext, useContext } from 'react';

import { Scope } from '../configs/privilege-scopes';
import { AccountLoginResponse } from '../../../gen/apollo-types';

export const authDefault = [
  {
    token: undefined as AccountLoginResponse['token'] | null | undefined,
    account: undefined as AccountLoginResponse['account'] | null | undefined,
  },
  {
    login: (async () => {}) as (
      token: string,
      account: AccountLoginResponse['account'] | null
    ) => Promise<void>,
    logout: (async () => {}) as () => Promise<void>,

    saveToken: (async () => {}) as (token: string) => Promise<void>,
    saveAccount: (async () => {}) as (
      account: AccountLoginResponse['account'] | null
    ) => Promise<void>,

    hasScope: (() => false) as (scope: Scope | RegExp) => boolean,
    mayHaveScopes: (() => false) as (scopes: (Scope | RegExp)[]) => boolean,
  },
] as const;

export type AuthType = typeof authDefault;

const AuthContext = createContext<AuthType>(authDefault);
export default AuthContext;

export const useAuth = () => useContext(AuthContext);
