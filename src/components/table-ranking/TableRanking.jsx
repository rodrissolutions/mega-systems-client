import { Octicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

const TableRanking = () => {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-col gap-2">
        <View className="flex flex-row gap-1 items-center justify-center">
          <Text
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 54,
            }}
          >
            5.0
          </Text>
          <View className="flex flex-col gap-1">
            <View className="flex flex-row items-center gap-1">
              <Octicons name="star-fill" size={12} />
              <Octicons name="star-fill" size={12} />
              <Octicons name="star-fill" size={12} />
              <Octicons name="star-fill" size={12} />
              <Octicons name="star-fill" size={12} />
            </View>
            <Text
              style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
              }}
            >
              (5 opiniones)
            </Text>
          </View>
        </View>
      </View>
      {/* Ranking by Stars */}
      <View className="flex flex-row items-center gap-2">
        <View className="flex-1 w-full h-[6px] bg-[#ccc] rounded-full">
          <View className="w-[90%] h-full bg-[#1786f9] rounded-l-full"></View>
        </View>
        <View className="flex flex-row items-center gap-1">
          <Text
            className="text-gray-800"
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 14,
            }}
          >
            5
          </Text>
          <Octicons name="star-fill" size={12} color="#ccc" />
        </View>
      </View>
      <View className="flex flex-row items-center gap-2">
        <View className="flex-1 w-full h-[6px] bg-[#ccc] rounded-full">
          <View className="w-[50%] h-full bg-[#1786f9] rounded-l-full"></View>
        </View>
        <View className="flex flex-row items-center gap-1">
          <Text
            className="text-gray-800"
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 14,
            }}
          >
            4
          </Text>
          <Octicons name="star-fill" size={12} color="#ccc" />
        </View>
      </View>
      <View className="flex flex-row items-center gap-2">
        <View className="flex-1 w-full h-[6px] bg-[#ccc] rounded-full">
          <View className="w-[20%] h-full bg-[#1786f9] rounded-l-full"></View>
        </View>
        <View className="flex flex-row items-center gap-1">
          <Text
            className="text-gray-800"
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 14,
            }}
          >
            3
          </Text>
          <Octicons name="star-fill" size={12} color="#ccc" />
        </View>
      </View>
      <View className="flex flex-row items-center gap-2">
        <View className="flex-1 w-full h-[6px] bg-[#ccc] rounded-full">
          <View className="w-[10%] h-full bg-[#1786f9] rounded-l-full"></View>
        </View>
        <View className="flex flex-row items-center gap-1">
          <Text
            className="text-gray-800"
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 14,
            }}
          >
            2
          </Text>
          <Octicons name="star-fill" size={12} color="#ccc" />
        </View>
      </View>
      <View className="flex flex-row items-center gap-2">
        <View className="flex-1 w-full h-[6px] bg-[#ccc] rounded-full">
          <View className="w-[0%] h-full bg-[#1786f9] rounded-l-full"></View>
        </View>
        <View className="flex flex-row items-center gap-1">
          <Text
            className="text-gray-800"
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 14,
            }}
          >
            1
          </Text>
          <Octicons name="star-fill" size={12} color="#ccc" />
        </View>
      </View>
    </View>
  )
}

export default TableRanking
