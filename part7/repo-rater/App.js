import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert, Pressable } from 'react-native';
import RepositoryList from './src/components/RepositoryList';
import Text from './src/components/Text';
import Main from './src/components/Main';


console.log("catto")

const App = () => {
  return <Main />
};

//
//export default function App() {
//  return (
//    <View style={styles.container}>
//      <Text>Open up App.js to start working on your app!</Text>
//      <StatusBar style="auto" />
//      <Text>Hello World!</Text>
//      <Pressable onPress={() => alertLog()}>
//        <Text>Pressable</Text>
//      </Pressable>
//      <RepositoryList />
//    </View>
//  );
//}


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
