import { NavigationContainer } from "@react-navigation/native";
import MainAppStack from "./src/navigation/MainAppStack";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import { store } from "./src/store/store";
import React from "react";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/localization/i18n";


export default function App() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("./src/assets/fonts/Nunito-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={store}>

      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <FlashMessage position="top" />
          <MainAppStack />
        </NavigationContainer>
      </I18nextProvider>

    </Provider>

  );
}
