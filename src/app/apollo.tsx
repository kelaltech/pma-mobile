import React, { PropsWithChildren } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import { onError } from '@apollo/client/link/error'
// import { createHttpLink } from '@apollo/react-hooks'

// const httpLink = createHttpLink({
//     uri: `http://localhost:1337/graphql`,
//     fetch,
// })
console.log('apollo')
// const errorLink = onError(({ networkError }) => {
//     if (networkError) {
//         console.error(`[Network error]: ${networkError}`)
//     }
// })

export const apolloClient = new ApolloClient({
    uri: 'http://10.42.0.69:1337/graphql',
    // link: errorLink.concat(httpLink),
    cache: new InMemoryCache(),
})

const ApolloClientProvider = ({ children }: PropsWithChildren<{}>) => {
    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    )
}

export default ApolloClientProvider
