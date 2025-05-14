import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Layout from '../../../layouts/Layout'
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import laptop from 'assets/laptop.png'
import { useState } from 'react'
import { Product } from '../../../components/index.components'

const Home = () => {
  const [ranking, setRanking] = useState(3)

  return (
    <Layout>
      <View className="flex flex-col flex-1">
        {/* Filtros */}
        <View className="flex flex-row h-[50px] bg-white border-b border-gray-200 shadow-md shadow-gray-300 ">
          <TouchableOpacity className="flex-1 h-full flex flex-row justify-center items-center border-r border-gray-200 gap-2 ">
            <Octicons
              name="arrow-switch"
              size={20}
              className="rotate-90"
              color={'#9ca3af'}
            />
            <Text
              style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: '#9ca3af',
              }}
            >
              Ordenar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 h-full flex flex-row justify-center items-center gap-2 ">
            <Octicons name="filter" size={20} color={'#9ca3af'} />
            <Text
              style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: '#9ca3af',
              }}
            >
              Filtrar
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 bg-[#F5F9FF] px-4"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}
        >
          {/* Productos */}
          <View className="flex flex-col flex-wrap justify-between gap-y-4 pt-10">
            <Product ranking={ranking} />
          </View>
        </ScrollView>
      </View>
    </Layout>
  )
}

export default Home
