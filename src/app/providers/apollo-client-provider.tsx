import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-community/async-storage';
import { createUploadLink } from 'apollo-upload-client';
import React, { PropsWithChildren } from 'react';
import Config from 'react-native-config';

const httpLink = createUploadLink({
  uri: Config.GRAPHQL_URL || 'http://localhost:4000/graphql',
  fetch,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  (async () => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (
          // no token:
          err.extensions?.code === 'UNAUTHENTICATED' ||
          // invalid:
          (err.extensions?.exception?.name === 'JsonWebTokenError' &&
            err.extensions?.exception?.message === 'invalid signature')
        ) {
          if (
            (await AsyncStorage.getItem('auth/token')) &&
            err.path &&
            err.path.join('.') === ['account', 'me'].join('.')
          ) {
            // already logged out and the regular account.me is requested
            // no further action (such as navigate) is needed in this case
            continue;
          }
          await AsyncStorage.removeItem('auth/token');
          await AsyncStorage.removeItem('auth/account');
        }
      }
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  })();
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('auth/token');
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { fetchPolicy: 'cache-first' },
    mutate: { fetchPolicy: 'no-cache' },
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
});

const ApolloClientProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ApolloProvider client={apolloClient}>
      <>{children}</>
    </ApolloProvider>
  );
};

export default ApolloClientProvider;
