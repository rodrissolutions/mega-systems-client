import { Button } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import logo from 'assets/logo.png'
import { Octicons } from '@expo/vector-icons'
import { useState } from 'react'
import { authAPI } from '../../../api/index.api'
import Toast from 'react-native-toast-message'
import { AxiosError } from 'axios'
const Login = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const initialState = {
    email: '',
    password: '',
  }

  const [credentials, setCredentials] = useState(initialState)

  const goToRegister = () => {
    setCredentials(initialState)
    navigation.navigate('Register')
  }

  const handleChange = (name, value) => {
    setCredentials({ ...credentials, [name]: value })
  }

  const handleSubmit = () => {
    if (credentials.email === '' || credentials.password === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Todos los campos son obligatorios',
        text1Style: {
          fontSize: 16,
          fontWeight: '900',
        },
        text2Style: { fontSize: 14 },
      })
      return
    }
    setLoading(true)
    authAPI
      .login(credentials.email.trimEnd(), credentials.password.trimEnd())
      .then((res) => {
        const { message } = res.data
        Toast.show({
          type: 'success',
          text1: 'Inicio de sesión exitoso',
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: '900',
          },
          text2Style: { fontSize: 14 },
        })
        setCredentials(initialState)
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response.data.message ||
              'Error desconocido. Intente nuevamente.',
            text1Style: {
              fontSize: 16,
              fontWeight: '900',
            },
            text2Style: { fontSize: 14 },
          })
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Error desconocido. Intente nuevamente.',
            text1Style: {
              fontSize: 16,
              fontWeight: '900',
            },
            text2Style: { fontSize: 14 },
          })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center  bg-[#F5F9FF] flex-col gap-2 pt-20">
            <View className="w-[85%] mx-auto flex flex-col gap-2 flex-1 justify-center">
              <View className="flex flex-row items-center gap-2">
                <Image
                  source={logo}
                  className="w-[100px] h-[100px] scale-x-[-1]"
                  resizeMode="contain"
                />
                <View className="flex-col gap-1">
                  <Text
                    className="text-[#eb1c33]"
                    style={{
                      fontFamily: 'Orbitron_800ExtraBold',
                      fontSize: 30,
                    }}
                  >
                    Mega Systems
                  </Text>
                  <Text
                    className="text-gray-400"
                    style={{
                      fontFamily: 'Inter_700Bold',
                      fontSize: 15,
                    }}
                  >
                    Servicio y Tecnología a tu alcance
                  </Text>
                </View>
              </View>

              {/* Formulario */}
              <View className="flex flex-col gap-3 mt-20">
                <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
                  <View className="w-14 flex flex-row items-center justify-center h-full">
                    <Octicons name="mail" size={20} color={'#545454'} />
                  </View>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Correo electrónico"
                    defaultValue={credentials.email}
                    onChangeText={(text) => handleChange('email', text)}
                    className="flex-1 bg-white outline-none px-1"
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      color: '#505050',
                    }}
                  />
                </View>
                <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
                  <View className="w-14 flex flex-row items-center justify-center h-full">
                    <Octicons name="lock" size={20} color={'#545454'} />
                  </View>
                  <TextInput
                    autoCapitalize="none"
                    secureTextEntry={!isPasswordVisible}
                    placeholder="Contraseña"
                    defaultValue={credentials.password}
                    onChangeText={(text) => handleChange('password', text)}
                    className="flex-1 bg-white outline-none px-1"
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      color: '#505050',
                    }}
                  />

                  {/* Icono del ojo de candado */}
                  <TouchableOpacity
                    className="px-4"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <Octicons name="eye" size={21} color={'#545454'} />
                    ) : (
                      <Octicons name="eye-closed" size={21} color={'#545454'} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Recuperar contraseña */}
              <View className="flex flex-row justify-end items-center mt-3">
                <TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: 'Inter_700Bold',
                      fontSize: 14,
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Boton */}

              <TouchableOpacity
                className="mt-3 py-4 rounded-full flex flex-row gap-3 items-center justify-center bg-[#0A192F]"
                onPress={handleSubmit}
              >
                {loading && <ActivityIndicator size="small" color="white" />}
                <Text
                  style={{
                    fontFamily: 'Inter_700Bold',
                    fontSize: 18,
                    color: 'white',
                  }}
                >
                  {loading ? 'Cargando...' : 'Iniciar sesión'}
                </Text>
              </TouchableOpacity>

              {/* Caja de registro y activacion */}
            </View>
            <View className="flex-1 flex flex-col justify-end items-center pb-10 w-[90%] mx-auto">
              <View className="flex flex-row justify-center items-center gap-2">
                <Text
                  style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 15,
                    color: '#545454',
                  }}
                >
                  ¿No tienes una cuenta?
                </Text>
                <TouchableOpacity onPress={goToRegister}>
                  <Text
                    className="underline"
                    style={{
                      fontFamily: 'Inter_700Bold',
                      fontSize: 15,
                      color: '#0A192F',
                    }}
                  >
                    Registrate
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex flex-col justify-center items-center gap-2">
                <Text
                  style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 15,
                    color: '#545454',
                  }}
                >
                  o deseas
                </Text>
                <TouchableOpacity>
                  <Text
                    className="underline"
                    style={{
                      fontFamily: 'Inter_700Bold',
                      fontSize: 15,
                      color: '#0A192F',
                      textAlign: 'center',
                    }}
                  >
                    Activar cuenta registrada
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast position="bottom" />
    </KeyboardAvoidingView>
  )
}

export default Login
