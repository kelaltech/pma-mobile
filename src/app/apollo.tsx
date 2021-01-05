import { ApolloClient, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ApolloProvider, createHttpLink } from '@apollo/react-hooks';
import React, { PropsWithChildren } from 'react';
import Config from 'react-native-config';

const httpLink = createHttpLink({
  uri: Config.GRAPHQL_URL,
  fetch,
});

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { fetchPolicy: 'no-cache' },
    mutate: { fetchPolicy: 'no-cache' },
    watchQuery: { fetchPolicy: 'no-cache' },
  },
});

const ApolloClientProvider = ({ children }: PropsWithChildren<{}>) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
