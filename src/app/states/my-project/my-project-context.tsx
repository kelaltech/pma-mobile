import { Maybe } from 'graphql/jsutils/Maybe';
import { createContext } from 'react';
import { Project } from '../../../../gen/apollo-types';

export type MyProjectType = Pick<Project, 'id' | 'name'> & {
  lot?: Maybe<
    Pick<Exclude<Pick<Project, 'lot'>['lot'], null | undefined>, 'id' | 'name'>
  >;
};

export const myProjectDefault = {
  myProject: {} as MyProjectType,
  setMyProject: (() => {}) as (_myProject: MyProjectType) => void,
} as const;

export type MyProjectContextValueType = typeof myProjectDefault;

const MyProjectContext = createContext<MyProjectContextValueType>(
  myProjectDefault
);
export default MyProjectContext;
