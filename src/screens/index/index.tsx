import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../../app/states/auth/use-auth';
import Loading from '../_shared/loading/loading';

const Index = () => {
  const navigation = useNavigation();

  const [{ account }] = useAuth();

  React.useEffect(() => {
    if (account === undefined) {
      return;
    } else if (account === null) {
      navigation.reset({ index: 0, routes: [{ name: 'Login' }], history: [] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Main' }], history: [] });
    }
  }, [account, navigation]);

  return <Loading />;
};

export default Index;
