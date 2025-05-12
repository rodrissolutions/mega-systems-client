import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import './global.css'
import RootNavigator from './src/navigation/RootNavigator'
import { StatusBar } from 'react-native'
import { useFontsLoader } from './src/hooks/index.hooks'

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
    <>
      <AppContent />
    </>
  )
}
