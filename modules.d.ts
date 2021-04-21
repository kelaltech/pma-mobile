declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-image-picker';
declare module 'react-native-mime-types';
declare module 'accordion-collapse-react-native';
