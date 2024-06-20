import React, { useEffect, useRef } from "react";
import { BackHandler, StyleSheet, View, StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import type { WebViewNavigation } from "react-native-webview/lib/WebViewTypes";

export default function WebLayout() {
  const webViewRef = useRef<WebView>(null);

  const handleBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // Prevent default behavior (exit app)
    }
    return false; // Allow default behavior
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WebView
        ref={webViewRef}
        source={{ uri: "https://financial.abuabdirohman.com/" }}
        onNavigationStateChange={(navState: WebViewNavigation) => {
          if (navState.canGoBack) {
            BackHandler.addEventListener("hardwareBackPress", handleBackPress);
          } else {
            BackHandler.removeEventListener(
              "hardwareBackPress",
              handleBackPress
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30, // Adjust this value as needed
  },
});
