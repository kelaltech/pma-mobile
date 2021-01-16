import AsyncStorage from '@react-native-community/async-storage';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Scope } from '../../configs/privilege-scopes';
import AuthContext, { authDefault, AuthType } from './auth-context';

type AuthProviderProps = React.PropsWithChildren<unknown>;

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [values, setValues] = useState<AuthType[0]>(authDefault[0]);
  useLayoutEffect(() => {
    (async () => {
      setValues({
        token: (await AsyncStorage.getItem('auth/token')) ?? null,
        account: JSON.parse(
          (await AsyncStorage.getItem('auth/account')) ?? 'null'
        ),
      });
    })();
  }, []);

  const login = useCallback(async (token, account) => {
    if (typeof window === 'undefined') {
      return;
    }

    await AsyncStorage.setItem('auth/token', token);
    await AsyncStorage.setItem(
      'auth/account',
      JSON.stringify(account).toString()
    );

    setValues({ token, account });
  }, []);
  const logout = useCallback(async () => {
    if (typeof window === 'undefined') {
      return;
    }

    await AsyncStorage.removeItem('auth/token');
    await AsyncStorage.removeItem('auth/account');

    setValues({ token: null, account: null });
  }, []);

  const saveToken = useCallback(async (token) => {
    if (typeof window === 'undefined') {
      return;
    }

    await AsyncStorage.setItem('auth/token', token);

    setValues({
      token,
      account: JSON.parse(
        (await AsyncStorage.getItem('auth/account')) ?? 'null'
      ),
    });
  }, []);
  const saveAccount = useCallback(async (account) => {
    if (typeof window === 'undefined') {
      return;
    }

    await AsyncStorage.setItem(
      'auth/account',
      JSON.stringify(account).toString()
    );

    setValues({
      token: (await AsyncStorage.getItem('auth/token')) ?? null,
      account,
    });
  }, []);

  const hasScope = useCallback(
    (scope: Scope | RegExp) => {
      if (!values.account || !values.account.privilege) {
        return false;
      }

      const grantedScopes =
        values.account.privilege.scopes.map(({ scope }) => scope) ?? [];

      if (typeof scope === 'string') {
        return grantedScopes.includes(scope);
      } else {
        for (const grantedScope of grantedScopes) {
          if (grantedScope.match(scope)) {
            return true;
          }
        }

        return false;
      }
    },
    [values.account]
  );

  const mayHaveScopes = useCallback(
    (scopes: (Scope | RegExp)[]) => {
      if (!values.account || !values.account.privilege) {
        return false;
      }

      for (const scope of scopes) {
        if (hasScope(scope)) {
          return true;
        }
      }

      return false;
    },
    [hasScope, values.account]
  );

  return (
    <AuthContext.Provider
      value={[
        values,
        { login, logout, saveToken, saveAccount, hasScope, mayHaveScopes },
      ]}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
