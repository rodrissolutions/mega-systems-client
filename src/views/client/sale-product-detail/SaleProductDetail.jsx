import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native'
import laptop from 'assets/laptop.png'
import { useState } from 'react'
import { Feather, Octicons } from '@expo/vector-icons'
import { pickerUtils } from 'utils/index.utils'

const SaleProductDetail = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [voucher, setVoucher] = useState(false)
  const [imageUri, setImageUri] = useState(null)

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery()
    if (uri) {
      setImageUri(uri)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#F5F9FF',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40,
      }}
    >
      <View className="flex flex-col flex-1">
        <Text
          style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          #123456
        </Text>

        {/* Tabla */}
        <View className="mt-5 flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white">
          {/* Header */}
          <View className="flex flex-row bg-gray-800 h-[50px]">
            {/* Imagen */}
            <View className="w-[20%] h-full border-r border-gray-500"></View>
            {/* Nombre del producto */}
            <View className="w-[40%] h-full border-r border-gray-500 flex flex-row items-center justify-center">
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                Producto
              </Text>
            </View>

            <View className="w-[15%] h-full border-r border-gray-500 flex flex-row items-center justify-center">
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                #
              </Text>
            </View>
            <View className="w-[25%] h-full  flex flex-row items-center justify-center">
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                $
              </Text>
            </View>
          </View>

          {/* Body */}
          <View className="flex flex-col">
            {/* Fila */}
            <View className="flex flex-row h-fit border-b border-gray-200">
              {/* Imagen */}
              <View className="w-[20%] h-full  flex flex-row items-center justify-center">
                <Image source={laptop} className="w-[40px] h-[40px]" />
              </View>

              <View className="w-[40%] h-full  flex flex-row items-center justify-center px-3 py-3">
                <Text
                  style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    color: '#0A192F',
                    textAlign: 'center',
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Accusantium, est?
                </Text>
              </View>

              <View className="w-[15%] h-full  flex flex-row items-center justify-center">
                <Text
                  style={{
                    fontFamily: 'Inter_700Bold',
                    fontSize: 14,
                    color: '#0A192F',
                  }}
                >
                  10
                </Text>
              </View>

              <View className="w-[25%] h-full flex flex-row items-center justify-center">
                <Text
                  style={{
                    fontFamily: 'Inter_700Bold',
                    fontSize: 14,
                    color: '#0A192F',
                  }}
                >
                  $10,00
                </Text>
              </View>
            </View>
            <View className="flex flex-row h-fit border-b border-gray-200">
              {/* Imagen */}
              <View className="w-[20%] h-full flex flex-row items-center justify-center">
                <Image source={laptop} className="w-[40px] h-[40px]" />
              </View>

              <View className="w-[40%] h-full  flex flex-row items-center justify-center px-3 py-3">
                <Text
                  style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    color: '#0A192F',
                    textAlign: 'center',
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Accusantium, est?
                </Text>
              </View>

              <View className="w-[15%] h-full  flex flex-row items-center justify-center">
                <Text
                  style={{
                    fontFamily: 'Inter_700Bold',
                    fontSize: 14,
                    color: '#0A192F',
                  }}
                >
                  10
                </Text>
              </View>

              <View className="w-[25%] h-full flex flex-row items-center justify-center">
                <Text
                  style={{
                    fontFamily: 'Inter_700Bold',
                    fontSize: 14,
                    color: '#0A192F',
                  }}
                >
                  $10,00
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View className="flex flex-row h-[50px] bg-gray-700">
            <View className="w-[75%] h-full flex flex-row items-center justify-center border-r border-gray-600">
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                Total
              </Text>
            </View>

            <View className="w-[25%] h-full flex flex-row items-center justify-center">
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                $20,00
              </Text>
            </View>
          </View>
        </View>

        {/* Comprobante de pago */}
        <View className="flex flex-col mt-10 gap-3">
          <View className="flex flex-row items-center gap-2">
            <Text
              style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 18,
              }}
            >
              Adjuntar comprobante
            </Text>

            <Switch
              value={isSwitchOn}
              onValueChange={(value) => setIsSwitchOn(value)}
              trackColor={{
                false: '#767577',
                true: '#81b0ff',
              }}
              thumbColor={isSwitchOn ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>

          {isSwitchOn ? (
            <>
              <TouchableOpacity
                className="w-full h-[620px] bg-white rounded-lg flex flex-col items-center justify-center gap-2"
                onPress={!imageUri ? pickImage : () => {}}
              >
                {!imageUri ? (
                  <>
                    <Feather name="camera" size={50} color={'#e5e7eb'} />
                    <Text
                      className="text-gray-400"
                      style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 20,
                      }}
                    >
                      Adjuntar comprobante de pago
                    </Text>
                  </>
                ) : (
                  <Image
                    source={{ uri: imageUri }}
                    className="w-full h-full absolute object-cover"
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
              {imageUri && (
                <>
                  <View className="mt-2 flex flex-row items-center justify-between">
                    <Text
                      style={{
                        fontFamily: 'Inter_700Bold',
                        fontSize: 16,
                      }}
                    >
                      Estado del comprobante
                    </Text>
                    <Text
                      className="px-2 py-1 text-white bg-gray-400 rounded-full"
                      style={{
                        fontFamily: 'Inter_400Regular',
                        fontSize: 11,
                      }}
                    >
                      Pendiente
                    </Text>
                  </View>
                  <TouchableOpacity className="w-full flex flex-row items-center justify-center gap-2 py-3 bg-[#1786f9] rounded-lg">
                    <Octicons name="upload" size={20} color={'white'} />
                    <Text
                      style={{
                        fontFamily: 'Inter_700Bold',
                        fontSize: 18,
                        color: '#fff',
                      }}
                    >
                      Subir
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : (
            <View className="w-full h-[120px] bg-white rounded-lg border border-gray-200 flex flex-row items-center justify-center px-5">
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                }}
              >
                Procura llevar el monto total del pago al retirar el producto
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default SaleProductDetail
