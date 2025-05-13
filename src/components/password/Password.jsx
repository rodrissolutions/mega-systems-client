import { FontAwesome, Octicons } from '@expo/vector-icons'
import { TextInput, TouchableOpacity, View } from 'react-native'

const Password = ({
  value,
  handleChange,
  isPasswordVisible,
  setIsPasswordVisible,
}) => {
  return (
    <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
      <View className="w-14 flex flex-row items-center justify-center h-full">
        <FontAwesome name="lock" size={20} color={'#545454'} />
      </View>
      <TextInput
        autoComplete="off"
        autoCapitalize="none"
        secureTextEntry={!isPasswordVisible}
        placeholder="Contraseña"
        defaultValue={value}
        onChangeText={handleChange}
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
  )
}

export default Password
