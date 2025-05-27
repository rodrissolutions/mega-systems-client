import { Feather, Octicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

const ChangePassword = () => {
  const [sendCode, setSendCode] = useState(false)

  return (
    <View className="flex-1 flex flex-col bg-[#F5F9FF] px-10 py-5">
      {/* Mensaje */}
      <View className="w-full h-[100px] bg-red-100 rounded-xl px-5 flex flex-row justify-center items-center border border-red-100">
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            color: '#6b7280',
            textAlign: 'center',
          }}
        >
          Por cuestiones de seguridad necesitamos verificar tu identidad.
          Enviaremos un código de verificación a tu correo.
        </Text>
      </View>

      {/* Formulario de correo */}
      <View className="mt-3 flex flex-col gap-3">
        <Text
          style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 16,
          }}
        >
          Correo electrónico
        </Text>

        <TextInput
          readOnly={sendCode}
          className={`w-full h-[50px]  rounded-xl px-5 flex flex-row justify-center items-center border border-gray-200 ${
            sendCode ? 'bg-gray-100' : 'bg-white'
          }`}
          placeholderTextColor={'#6b7280'}
        />

        <TouchableOpacity
          className="mt-2 py-4 rounded-lg flex flex-row justify-center items-center bg-[#1786f9] gap-2 disabled:opacity-50"
          onPress={() => setSendCode(!sendCode)}
        >
          <Feather name="send" color={'white'} size={20} />
          <Text
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 16,
              color: 'white',
            }}
          >
            Enviar código
          </Text>
        </TouchableOpacity>
      </View>

      {/* Formulario de contraseña */}
      {sendCode && (
        <View className="flex flex-col gap-3 mt-10">
          {/* Código */}
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 16,
              }}
            >
              Código
            </Text>
            <TextInput className="w-full h-[50px] bg-white rounded-xl px-5 flex flex-row justify-center items-center border border-gray-200" />
          </View>

          {/* Contraseña */}
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 16,
              }}
            >
              Contraseña
            </Text>
            <TextInput className="w-full h-[50px] bg-white rounded-xl px-5 flex flex-row justify-center items-center border border-gray-200" />
          </View>
          {/* Contraseña */}
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 16,
              }}
            >
              Confirmar contraseña
            </Text>
            <TextInput className="w-full h-[50px] bg-white rounded-xl px-5 flex flex-row justify-center items-center border border-gray-200" />
          </View>

          <TouchableOpacity className="mt-2 py-4 rounded-lg flex flex-row justify-center items-center bg-[#1786f9]">
            <Text
              style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 16,
                color: 'white',
              }}
            >
              Guardar contraseña
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Toast position="bottom" />
    </View>
  )
}

export default ChangePassword
