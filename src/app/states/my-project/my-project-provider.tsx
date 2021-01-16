import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useMyProjectProviderQuery } from '../../../../gen/apollo-types';
import constantPrivilegeIds from '../../configs/constant-privilege-ids';
import { useAuth } from '../auth/use-auth';
import MyProjectContext, { myProjectDefault } from './my-project-context';

type MyProjectProps = React.PropsWithChildren<unknown>;

const MyProjectProvider: React.FC<MyProjectProps> = ({ children }) => {
  const [myProject, setMyProject] = useState(myProjectDefault.myProject);

  const [{ account }, { logout }] = useAuth();
  const navigation = useNavigation();

  const { data } = useMyProjectProviderQuery({
    variables: { accountId: account?.id || '' },
    fetchPolicy: 'cache-and-network',
  });
  useEffect(() => {
    if (
      account &&
      account?.privilege?.id !== constantPrivilegeIds.siteEngineer
    ) {
      Alert.alert(
        'Error :(',
        'Sorry your account does not have a Site Engineer privilege. This mobile app is only for site engineers. Please contact your administrator.',
        [
          {
            text: 'Logout',
            style: 'destructive',
            onPress: () => {
              logout().then(() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                  history: [],
                })
              );
            },
          },
        ]
      );
    }

    if (!account || !data?.project.getBySiteEngineer) {
      return;
    }
    setMyProject(data.project.getBySiteEngineer);
  }, [account, data, logout, navigation]);

  return (
    <MyProjectContext.Provider value={{ myProject, setMyProject }}>
      <>{children}</>
    </MyProjectContext.Provider>
  );
};

export default MyProjectProvider;
