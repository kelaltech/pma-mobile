import {StyleSheet} from 'react-native';

const project = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#0C1A59',
    height: 210,
    paddingTop: 48,
    paddingLeft: 24,
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  container: {
    marginTop: -84,
    marginHorizontal: 24,
    backgroundColor: 'white',
    height: 'auto',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  diplayRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  name: {
    color: '#5A5A5A',
    fontSize: 14,
    paddingHorizontal: 12,
  },
});

export default project;
