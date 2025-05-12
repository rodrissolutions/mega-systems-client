import { useFonts } from 'expo-font'

import {
  Orbitron_400Regular,
  Orbitron_500Medium,
  Orbitron_600SemiBold,
  Orbitron_700Bold,
  Orbitron_800ExtraBold,
  Orbitron_900Black,
} from '@expo-google-fonts/orbitron'

import {
  Inter_100Thin,
  Inter_100Thin_Italic,
  Inter_200ExtraLight,
  Inter_200ExtraLight_Italic,
  Inter_300Light,
  Inter_300Light_Italic,
  Inter_400Regular,
  Inter_400Regular_Italic,
  Inter_500Medium,
  Inter_500Medium_Italic,
  Inter_600SemiBold,
  Inter_600SemiBold_Italic,
  Inter_700Bold,
  Inter_700Bold_Italic,
  Inter_800ExtraBold,
  Inter_800ExtraBold_Italic,
  Inter_900Black,
  Inter_900Black_Italic,
} from '@expo-google-fonts/inter'

export default function useFontsLoader() {
  const [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_500Medium,
    Orbitron_600SemiBold,
    Orbitron_700Bold,
    Orbitron_800ExtraBold,
    Orbitron_900Black,
    Inter_100Thin,
    Inter_100Thin_Italic,
    Inter_200ExtraLight,
    Inter_200ExtraLight_Italic,
    Inter_300Light,
    Inter_300Light_Italic,
    Inter_400Regular,
    Inter_400Regular_Italic,
    Inter_500Medium,
    Inter_500Medium_Italic,
    Inter_600SemiBold,
    Inter_600SemiBold_Italic,
    Inter_700Bold,
    Inter_700Bold_Italic,
    Inter_800ExtraBold,
    Inter_800ExtraBold_Italic,
    Inter_900Black,
    Inter_900Black_Italic,
  })

  return fontsLoaded
}
