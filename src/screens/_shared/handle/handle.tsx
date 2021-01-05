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

  refreshing?: boolean;
  onRefresh?: () => void;
}>;

function Handle({
  loading,
  error,
  data,
  refreshing,
  onRefresh,
  children,
}: HandleProps) {
  return loading ? (
    <Loading />
  ) : !data || error ? (
    <ScrollView
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
        {!error && !data ? 'No data' : `${error?.name}: ${error?.message}`}
      </Text>
    </ScrollView>
  ) : (
    <ScrollView
      refreshControl={
        refreshing === undefined || !onRefresh ? undefined : (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        )
      }
      style={{ flex: 1 }}
    >
      {children}
    </ScrollView>
  );
}

export default Handle;
