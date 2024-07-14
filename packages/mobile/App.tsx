import { StatusBar } from 'expo-status-bar';
import { Provider } from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home/Home';
import WebView from './screens/webview/WebView';
import ConnectedLoginScreen from './screens/auth/Login';
import Register from './screens/auth/Register';
import createStore from "./services/store";

export type StackScreens = {
  Home: undefined,
  Login: undefined,
  Register: undefined,
  App: undefined,
}

export const Stack = createNativeStackNavigator<StackScreens>();

export default function App() {
  const store = createStore();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={ConnectedLoginScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="App" component={WebView} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
