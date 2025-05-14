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
import user from 'assets/user.png'
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { pickerUtils } from '../../../utils/index.utils'
import Toast from 'react-native-toast-message'
import { userAPI } from '../../../api/index.api'
import { AxiosError } from 'axios'
import { Input, Password, Submit } from '../../../components/index.components'

const Register = () => {
  const initialState = {
    fullName: '',
    dni: '',
    phone: '',
    email: '',
    password: '',
  }
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [data, setData] = useState(initialState)
  const [imageUri, setImageUri] = useState(null)

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery()
    if (uri) {
      setImageUri(uri)
    }
  }
  const goToLogin = () => {
    setData(initialState)
    setImageUri(null)
    navigation.navigate('Login')
  }

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value.trimEnd() })
  }

  const handleSubmit = () => {
    if (Object.values(data).includes('')) {
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

    if (!imageUri) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Debes seleccionar una imagen',
        text1Style: {
          fontSize: 16,
          fontWeight: '900',
        },
        text2Style: { fontSize: 14 },
      })
      return
    }

    setLoading(true)

    const formData = new FormData()
    Object.keys(data).forEach((key) => formData.append(key, data[key]))

    formData.append('profilePicture', {
      uri: imageUri,
      name: `profile_picture_${data.fullName.replace(/\s/g, '')}.jpg`,
      type: 'image/jpeg',
    })

    userAPI
      .register(formData)
      .then((res) => {
        const { message } = res.data
        Toast.show({
          type: 'success',
          text1: 'Registro exitoso',
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: '900',
          },
          text2Style: { fontSize: 14 },
        })

        setData(initialState)
        setImageUri(null)

        setTimeout(() => {
          navigation.replace('Code', {
            email: formData.get('email'),
            type: 'Verificación',
          })
        }, 2500)
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          Toast.show({
            type: 'error',
            text1: 'Error al registrar',
            text2:
              err.response.data.message ||
              'Error desconocido. Intente nuevamente',
            text1Style: {
              fontSize: 16,
              fontWeight: '900',
            },
            text2Style: { fontSize: 14 },
          })
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error al registrar',
            text2: 'Error desconocido. Intente nuevamente',
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
          <View className="flex-1 items-center bg-[#F5F9FF] flex-col gap-2 pt-20">
            <View className="w-[85%] mx-auto flex flex-col gap-2 flex-1 ">
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
              <View className="flex flex-col gap-3 mt-10">
                {/* Foto de perfil */}
                <TouchableOpacity
                  className="relative w-32 h-32 rounded-full border-2 border-gray-[#0A192F] mx-auto flex justify-center items-center bg-white mb-5"
                  onPress={pickImage}
                >
                  <Image
                    source={imageUri ? { uri: imageUri } : user}
                    className="w-full h-full rounded-full"
                    resizeMode="cover"
                  />

                  <View className="absolute bottom-1 -right-1 rounded-full bg-[#0A192F] w-10 h-10 flex items-center justify-center">
                    <Ionicons name="camera" size={24} color={'white'} />
                  </View>
                </TouchableOpacity>

                {/* Nombres completos */}

                <Input
                  holder={'Nombres completos'}
                  value={data.fullName}
                  onChange={(text) => handleChange('fullName', text)}
                  Icon={() => (
                    <Octicons name="person-fill" size={20} color={'#545454'} />
                  )}
                />

                {/* DNI */}
                <Input
                  holder="Cédula"
                  value={data.dni}
                  onChange={(text) => handleChange('dni', text)}
                  keyboard="numeric"
                  Icon={() => (
                    <FontAwesome name="id-card" size={20} color={'#545454'} />
                  )}
                />

                {/* Teléfono */}
                <Input
                  holder="Teléfono"
                  value={data.phone}
                  onChange={(text) => handleChange('phone', text)}
                  keyboard="numeric"
                  Icon={() => (
                    <MaterialCommunityIcons
                      name="card-account-phone"
                      size={20}
                      color={'#545454'}
                    />
                  )}
                />

                {/* Teléfono */}
                <Input
                  holder="Correo electrónico"
                  value={data.email}
                  onChange={(text) => handleChange('email', text)}
                  keyboard="email-address"
                  Icon={() => (
                    <Entypo name="mail" size={20} color={'#545454'} />
                  )}
                />

                {/* Contraseña */}
                <Password
                  value={data.password}
                  handleChange={(text) => handleChange('password', text)}
                  isPasswordVisible={isPasswordVisible}
                  setIsPasswordVisible={setIsPasswordVisible}
                  Icon={() => (
                    <FontAwesome name="lock" size={20} color={'#545454'} />
                  )}
                />

                {/* Botón */}
                <Submit
                  loading={loading}
                  handleSubmit={handleSubmit}
                  text={'Registrar'}
                />

                <View className="flex flex-row items-center justify-center gap-2 mt-5">
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 15,
                      color: '#545454',
                    }}
                  >
                    ¿Ya tienes una cuenta?
                  </Text>
                  <TouchableOpacity onPress={goToLogin}>
                    <Text
                      className="underline"
                      style={{
                        fontFamily: 'Inter_700Bold',
                        fontSize: 15,
                        color: '#0A192F',
                      }}
                    >
                      Inicia sesión
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast position="bottom" />
    </KeyboardAvoidingView>
  )
}

export default Register
