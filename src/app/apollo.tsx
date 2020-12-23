// import qs from 'qs'
import React, { PropsWithChildren } from 'react'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { createHttpLink } from '@apollo/client/link/http'
import AsyncStorage from '@react-native-community/async-storage'
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL || `http://localhost:1337/graphql`,
    fetch,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            if (
                // no token:
                err.extensions?.code === 'UNAUTHENTICATED' ||
                // invalid:
                (err.extensions?.exception?.name === 'JsonWebTokenError' &&
                    err.extensions?.exception?.message === 'invalid signature')
            ) {
                if (typeof window === 'undefined') {
                    continue
                }
                if (
                    !AsyncStorage.getItem('auth/token') &&
                    err.path &&
                    err.path.join('.') === ['account', 'me'].join('.')
                ) {
                    // already logged out and the regular account.me is requested
                    // no further action (such as navigate) is needed in this case
                    continue
                }
                AsyncStorage.removeItem('auth/token')
                AsyncStorage.removeItem('auth/account')
                // window.location.href = `/login/?${qs.stringify(
                //   {
                //     continue:
                //       window.location.pathname.replace(/\/$/, '/') +
                //       (window.location.search || '') +
                //       (window.location.hash || ''),
                //   },
                //   { addQueryPrefix: false }
                // )}`
            }
        }
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`)
    }
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('auth/token')
    return {
        headers: {
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    }
})

export const apolloClient = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache(),
})

const ApolloClientProvider = ({ children }: PropsWithChildren<{}>) => {
    return (
        <ApolloProvider client={apolloClient}>
            <>{children}</>
        </ApolloProvider>
    )
}

export default ApolloClientProvider