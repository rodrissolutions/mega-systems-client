import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
  const navigation = useNavigation()
  const goToAddressForm = () => {
    navigation.navigate('Address')
  }

  const goToChangePassword = () => {
    navigation.navigate('ChangePassword')
  }
  return (
    <View className="flex flex-col flex-1 bg-[#F5F9FF] items-center justify-center">
      <View className="w-[370px] h-[500px] relative bg-white rounded-xl border border-gray-200">
        {/* Imagen */}
        <View className="w-32 h-32 rounded-full bg-[#1786f9] absolute -top-16 left-[135px] flex flex-col justify-center items-center border-2 border-gray-200 shadow-xl shadow-indigo-500">
          <Text
            style={{
              fontFamily: 'Orbitron_800ExtraBold',
              fontSize: 50,
              color: 'white',
            }}
          >
            A
          </Text>
        </View>

        <View className="flex flex-col top-20 justify-center items-center">
          <View className="mt-10 flex gap-8">
            <TouchableOpacity className="flex flex-row justify-between items-center w-full  px-5 py-2">
              <View className="flex flex-row gap-2 items-center">
                <Ionicons name="person-outline" size={22} color={'#6b7280'} />
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 18,
                  }}
                >
                  Editar perfil
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={'#6b7280'} />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex flex-row justify-between items-center w-full  px-5 py-2"
              onPress={goToChangePassword}
            >
              <View className="flex flex-row gap-2 items-center">
                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color={'#6b7280'}
                />
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 18,
                  }}
                >
                  Cambiar contraseña
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={'#6b7280'} />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex flex-row justify-between items-center w-full  px-5 py-2"
              onPress={goToAddressForm}
            >
              <View className="flex flex-row gap-2 items-center">
                <Ionicons name="location-outline" size={22} color={'#6b7280'} />
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 18,
                  }}
                >
                  Dirección de entrega
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={'#6b7280'} />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row justify-between items-center w-full  px-5 py-2">
              <View className="flex flex-row gap-2 items-center">
                <Ionicons
                  name="help-circle-outline"
                  size={22}
                  color={'#6b7280'}
                />
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 18,
                  }}
                >
                  Términos y condiciones
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={'#6b7280'} />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row justify-between items-center w-full  px-5 py-2">
              <View className="flex flex-row gap-2 items-center">
                <Ionicons name="exit-outline" size={22} color={'#6b7280'} />
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 18,
                  }}
                >
                  Cerrar sesión
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={'#6b7280'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Profile
