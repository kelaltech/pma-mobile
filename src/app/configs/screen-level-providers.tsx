import React from 'react';
import AuthProvider from '../states/auth/auth-provider';
import MyProjectProvider from '../states/my-project/my-project-provider';
import ApolloClientProvider from './apollo-client-provider';

type ScreenLevelProvidersProps = React.PropsWithChildren<unknown>;

function ScreenLevelProviders({ children }: ScreenLevelProvidersProps) {
  return (
    <ApolloClientProvider>
      <AuthProvider>
        <MyProjectProvider>
          <>{children}</>
        </MyProjectProvider>
      </AuthProvider>
    </ApolloClientProvider>
  );
}

export default ScreenLevelProviders;

export function withScreenLevelProviders(Component: () => JSX.Element) {
  return () => {
    return (
      <ScreenLevelProviders>
        <Component />
      </ScreenLevelProviders>
    );
  };
}
