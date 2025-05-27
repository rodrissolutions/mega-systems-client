import { useNavigation } from '@react-navigation/native'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import logo from 'assets/logo.png'
import { Octicons } from '@expo/vector-icons'
import { useState } from 'react'
import { authAPI } from 'api/index.api'
import Toast from 'react-native-toast-message'
import { AxiosError } from 'axios'
import { Input, Password, Submit } from 'components/index.components'
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
                <Input
                  Icon={() => (
                    <Octicons name="mail" size={20} color={'#545454'} />
                  )}
                  holder={'Correo electrónico'}
                  value={credentials.email}
                  onChange={(text) => handleChange('email', text)}
                />
                <Password
                  Icon={() => (
                    <Octicons name="lock" size={20} color={'#545454'} />
                  )}
                  handleChange={(text) => handleChange('password', text)}
                  value={credentials.password}
                  isPasswordVisible={isPasswordVisible}
                  setIsPasswordVisible={setIsPasswordVisible}
                />
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

              <Submit
                loading={loading}
                handleSubmit={handleSubmit}
                text="Iniciar sesión"
              />

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
