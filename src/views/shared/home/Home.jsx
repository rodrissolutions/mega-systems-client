import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import logo from 'assets/logo.png'
import { Feather, Octicons } from '@expo/vector-icons'
import empty from 'assets/empty.json'
import LottieView from 'lottie-react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
const Home = () => {
  const navigation = useNavigation()
  const [openCart, setOpenCart] = useState(false)
  const toggleOpenCart = () => setOpenCart(!openCart)

  const goToLogin = () => {
    setOpenCart(false)
    navigation.navigate('Login')
  }

  const goToRegister = () => {
    setOpenCart(false)
    navigation.navigate('Register')
  }

  return (
    <View className="flex-1 flex flex-col">
      {/* Header */}
      <View className="h-[80px] bg-[#0A192F] flex flex-row items-center px-5 gap-2">
        <Image source={logo} className="w-[40px] h-[40px] scale-x-[-1]" />

        <View className="flex-1 h-[40px] flex flex-row bg-white rounded-lg mr-5">
          <View className="w-[50px] h-full flex justify-center items-center">
            <Octicons name="search" size={18} color="#ccc" />
          </View>
          <TextInput
            autoCapitalize="none"
            className=" outline-none flex-1 h-full text-[#ccc]"
            placeholder="Estoy buscando..."
            style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 14,
            }}
          />
        </View>

        {/* Botones de opciones */}
        <TouchableOpacity onPress={toggleOpenCart}>
          <Feather name="shopping-cart" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Aside, luego cambiar cuando se separe en componentes */}
      {openCart && (
        <View
          className={`absolute top-[80px] w-full h-screen bg-white z-50 ${
            openCart ? 'translate-x-0' : 'translate-x-full'
          } transition-all duration-300 ease-in-out border-t border-gray-700 flex flex-col`}
        >
          {/* Si no ha iniciado sesión se mostrará este header */}
          <View className="py-10 bg-[#0A192F] px-5 flex flex-col">
            {/* Nombres y Bienvenida */}
            <View className="flex flex-row items-center gap-3">
              <View className="w-[60px] h-[60px] rounded-full bg-white border-gray-200 flex justify-center items-center">
                <Octicons name="person" size={30} color="#ccc" />
              </View>
              <View className="flex flex-col gap-1 max-w-[85%]">
                <Text
                  className="text-white"
                  style={{
                    fontFamily: 'Inter_700Bold',
                    fontSize: 18,
                  }}
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

            <View className="flex flex-row mt-5 px-5 gap-3 ">
              <TouchableOpacity
                className="bg-[#1458b9] w-[50%] py-3 flex justify-center items-center"
                onPress={goToLogin}
              >
                <Text
                  className="text-white"
                  style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 15,
                  }}
                >
                  Ingresa
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white w-[50%] py-3 justify-center items-center border border-[#1458b9] text-[#1458b9]"
                onPress={goToRegister}
              >
                <Text
                  style={{
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 15,
                  }}
                >
                  Crea tu cuenta
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex justify-center items-center py-10">
            <LottieView
              autoPlay
              loop
              source={empty}
              style={{
                width: 200,
                height: 200,
              }}
            />
            <Text
              className="text-gray-500"
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 21,
              }}
            >
              No tienes nada en el carrito
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default Home
