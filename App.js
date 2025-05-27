import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import './global.css'
import RootNavigator from './src/navigation/RootNavigator'
import { StatusBar } from 'react-native'
import { useFontsLoader } from './src/hooks/index.hooks'
import { Provider } from 'react-redux'
import store from './src/redux/store'

const AppContent = () => {
  const fontsLoaded = useFontsLoader()
  if (!fontsLoaded) return null
  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}
export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
