import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, } from 'react-native';
//import RepositoryList from './src/components/RepositoryList';
//import Text from './src/components/Text';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
    imgPath: require('./src/assets/repo_pics/formik_pic.jpg')
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
    imgPath: require('./src/assets/repo_pics/rails_pic.png')
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
    imgPath: require('./src/assets/repo_pics/django_pic.png')
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
    imgPath: require('./src/assets/repo_pics/redux_pic.png')
  },
];


console.log("catto")

const App = () => {
  return (<>
    <NativeRouter>
      <Main data={repositories} />
    </NativeRouter>
    <StatusBar style='auto' />
  </>)
};


const alertLog = () => {
  console.log("buttoned");
  Alert.alert("you pressed the button!");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
