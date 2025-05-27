import { Text, View } from 'react-native'

const Comment = () => {
  return (
    <View className="flex flex-row gap-2 mb-5">
      <View className="w-[50px] h-[50px] bg-red-300 rounded-full">
        {/* Imagen de perfil */}
      </View>
      {/* Nombre y comentario */}
      <View className="flex flex-col flex-1">
        <View className="flex flex-col  bg-gray-100 px-2 py-2 rounded-lg">
          <Text
            style={{
              fontFamily: 'Inter_800ExtraBold',
              fontSize: 14,
            }}
          >
            User Name
          </Text>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 13,
            }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi a
            modi similique et error placeat delectus nemo reiciendis omnis
            facilis!
          </Text>
        </View>

        {/* Tiempo y respuestas */}
        <View className="flex flex-row gap-2">
          <Text
            style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 12,
              color: '#9ca3af',
            }}
          >
            1 hora
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Comment
