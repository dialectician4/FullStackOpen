import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Alert, Pressable } from 'react-native';

console.log("catto")

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text>Hello World!</Text>
      <Pressable onPress={() => alertLog() }>
        <Text>Pressable</Text>
      </Pressable>
    </View>
  );
}

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
