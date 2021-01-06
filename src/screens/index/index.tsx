import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../../app/contexts/auth-context';
import Loading from '../_shared/loading/loading';

const Index = () => {
  const navigation = useNavigation();

  const [{ account }] = useAuth();

  React.useEffect(() => {
    if (account === undefined) {
      return;
    } else if (account === null) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Main');
    }
  }, [account, navigation]);

  return <Loading />;
};

export default Index;
