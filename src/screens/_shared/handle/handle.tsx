/* eslint-disable react-native/no-inline-styles */
import { ApolloError } from '@apollo/react-hooks';
import React from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { colors } from '../../../assets/styles/colors';
import { textStyles } from '../../../assets/styles/text-styles';
import Loading from '../loading/loading';

type HandleProps = React.PropsWithChildren<{
  loading: boolean;
  error: ApolloError | undefined;
  data: any;

  refetch?: () => Promise<unknown>;
}>;

function Handle({ loading, error, data, refetch, children }: HandleProps) {
  return !data && loading ? (
    <Loading />
  ) : !data && error ? (
    <ScrollView
      refreshControl={
        !refetch ? undefined : (
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            colors={[colors.accent, colors.primary]}
          />
        )
      }
      style={{
        flex: 1,
        paddingVertical: 48,
        paddingHorizontal: 24,
      }}
    >
      <Text style={[textStyles.h3, { color: colors.warn, paddingBottom: 24 }]}>
        An error occurred...
      </Text>
      <Text style={[textStyles.large, { color: colors.warn }]}>
        {error?.name}: {error?.message}
      </Text>
    </ScrollView>
  ) : (
    <ScrollView
      refreshControl={
        !refetch ? undefined : (
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            colors={[colors.accent, colors.primary]}
          />
        )
      }
      style={{ flex: 1, backgroundColor: colors.light1 }}
    >
      {children}
    </ScrollView>
  );
}

export default Handle;
