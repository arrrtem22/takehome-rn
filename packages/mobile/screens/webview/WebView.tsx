import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../../App';
import { WebView as NativeWebView } from 'react-native-webview';
import AuthStorage from '../../services/auth-storage';
import CONFIG from '../../api/config';

export default function WebView({ }: NativeStackScreenProps<StackScreens, 'App'>) {
  const [token, setToken] = useState<string | null>(null);

  const webAppRoot = CONFIG.webappUrl;

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await AuthStorage.getToken();
      console.log('Fetched token:', fetchedToken);
      setToken(fetchedToken);
    };

    fetchToken();
  }, [setToken]);



  console.log('EXPO_PUBLIC_WEBAPP_ROOT:', webAppRoot);

  if (!token) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NativeWebView source={{
        uri: webAppRoot, headers: {
          Cookie: 'SESSION_TOKEN=' + token,
        },
      }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
