import { useContext } from 'react';
import MyProjectContext from './my-project-context';

export const useMyProject = () => useContext(MyProjectContext);
