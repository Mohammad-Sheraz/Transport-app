import { StyleSheet, Text, View } from 'react-native';
import AppNavigator, { MyDrawer } from './src/config/navigation';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <>
      {/* <AppNavigator>
        <View style={styles.container}></View>
      </AppNavigator> */}
      <NavigationContainer>
        <MyDrawer/>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
