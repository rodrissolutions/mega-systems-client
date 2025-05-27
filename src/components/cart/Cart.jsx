// components/CarritoAside.js
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Entypo, Octicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import empty from 'assets/empty.json'
import laptop from 'assets/laptop.png'

import { useNavigation } from '@react-navigation/native'

const Cart = ({ openCart, toggleOpenCart }) => {
  const navigation = useNavigation()

  const goToLogin = () => {
    toggleOpenCart()
    navigation.navigate('Login')
  }

  const goToRegister = () => {
    toggleOpenCart()
    navigation.navigate('Register')
  }

  if (!openCart) return null

  return (
    <View
      className={`absolute top-0 w-[85%] right-0 h-screen z-50  flex flex-col  bg-white border-l border-gray-200 rounded-tl-xl shadow-xl shadow-gray-300 overflow-hidden`}
    >
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100 bg-[#0A192F]">
        <Text
          style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 20,
            color: 'white',
          }}
        >
          Mi carrito
        </Text>
        <TouchableOpacity onPress={toggleOpenCart}>
          <Octicons name="x" size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      {/* Cuando el usuario no haya iniciado sesion */}
      {/* <View className="py-10 bg-[#0A192F] px-5 flex flex-col">
        <View className="flex flex-row items-center gap-3">
          <View className="w-[60px] h-[60px] rounded-full bg-white border-gray-200 flex justify-center items-center">
            <Octicons name="person" size={30} color="#ccc" />
          </View>
          <View className="flex flex-col gap-1 max-w-[85%]">
            <Text
              className="text-white"
              style={{ fontFamily: 'Inter_700Bold', fontSize: 18 }}
            >
              Bienvenido
            </Text>
            <Text
              className="text-gray-400"
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 15,
                flexWrap: 'wrap',
              }}
            >
              Ingresa a tu cuenta para ver tus compras, favoritos, etc.
            </Text>
          </View>
        </View>

        <View className="flex flex-row mt-5 px-5 gap-3">
          <TouchableOpacity
            className="bg-[#1458b9] w-[50%] py-3 flex justify-center items-center"
            onPress={goToLogin}
          >
            <Text
              className="text-white"
              style={{ fontFamily: 'Inter_600SemiBold', fontSize: 15 }}
            >
              Ingresa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white w-[50%] py-3 justify-center items-center border border-[#1458b9]"
            onPress={goToRegister}
          >
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 15 }}>
              Crea tu cuenta
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* Cuando el carrito este vacío */}

      {/* <View className="flex  items-center flex-1 pt-52">
        <LottieView
          autoPlay
          loop
          source={empty}
          style={{ width: 200, height: 200 }}
        />
        <Text
          className="text-gray-500"
          style={{ fontFamily: 'Inter_600SemiBold', fontSize: 21 }}
        >
          Carrito vacío
        </Text>
      </View> */}

      {/*  */}
      <View className="flex flex-col flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 50,
          }}
        >
          {/* Producto */}
          <View className="flex flex-row py-3 px-5 border-b border-gray-100 items-center">
            {/* Imagen */}
            <Image source={laptop} className="w-[50px] h-[50px]" />

            {/* Nombre y precio */}
            <View className="flex flex-col flex-1 px-3">
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                Laptop Assus ROG 2023 15.6"
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 13,
                }}
              >
                $1,500
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Entypo name="minus" size={15} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                1
              </Text>
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Octicons name="plus" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row py-3 px-5 border-b border-gray-100 items-center">
            {/* Imagen */}
            <Image source={laptop} className="w-[50px] h-[50px]" />

            {/* Nombre y precio */}
            <View className="flex flex-col flex-1 px-3">
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                Laptop Assus ROG 2023 15.6"
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 13,
                }}
              >
                $1,500
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Entypo name="minus" size={15} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                1
              </Text>
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Octicons name="plus" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row py-3 px-5 border-b border-gray-100 items-center">
            {/* Imagen */}
            <Image source={laptop} className="w-[50px] h-[50px]" />

            {/* Nombre y precio */}
            <View className="flex flex-col flex-1 px-3">
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                Laptop Assus ROG 2023 15.6"
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 13,
                }}
              >
                $1,500
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Entypo name="minus" size={15} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                1
              </Text>
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Octicons name="plus" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row py-3 px-5 border-b border-gray-100 items-center">
            {/* Imagen */}
            <Image source={laptop} className="w-[50px] h-[50px]" />

            {/* Nombre y precio */}
            <View className="flex flex-col flex-1 px-3">
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                Laptop Assus ROG 2023 15.6"
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 13,
                }}
              >
                $1,500
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Entypo name="minus" size={15} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                1
              </Text>
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Octicons name="plus" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row py-3 px-5 border-b border-gray-100 items-center">
            {/* Imagen */}
            <Image source={laptop} className="w-[50px] h-[50px]" />

            {/* Nombre y precio */}
            <View className="flex flex-col flex-1 px-3">
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                Laptop Assus ROG 2023 15.6"
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 13,
                }}
              >
                $1,500
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Entypo name="minus" size={15} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                1
              </Text>
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Octicons name="plus" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row py-3 px-5 border-b border-gray-100 items-center">
            {/* Imagen */}
            <Image source={laptop} className="w-[50px] h-[50px]" />

            {/* Nombre y precio */}
            <View className="flex flex-col flex-1 px-3">
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                Laptop Assus ROG 2023 15.6"
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 13,
                }}
              >
                $1,500
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Entypo name="minus" size={15} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 15,
                }}
              >
                1
              </Text>
              <TouchableOpacity className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300">
                <Octicons name="plus" size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Footer */}
      <View className="h-[140px] bg-gray-100 fixed w-full bottom-14 py-5">
        {/* Subtotal */}
        <View className="flex flex-row items-center justify-between px-5">
          <Text
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 18,
            }}
          >
            Total
          </Text>
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
            }}
          >
            $1,500
          </Text>
        </View>
        <TouchableOpacity className="w-[90%] mx-auto mt-5 py-3 bg-[#1786f9] rounded-lg flex flex-row items-center justify-center">
          <Text
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 16,
              color: 'white',
            }}
          >
            Confirmar compra
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Cart
