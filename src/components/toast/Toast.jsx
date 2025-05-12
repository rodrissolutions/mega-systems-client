import { Octicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Text, useWindowDimensions } from 'react-native'
import { View } from 'react-native-animatable'
const Toast = ({
  setToast,
  type = 'success',
  title = 'Éxito',
  message = 'Operación exitosa',
}) => {
  const [left, setLeft] = useState(0)
  const { width } = useWindowDimensions()
  const bottom = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(0)).current

  //  Definir colores  según el tipo
  const backgroundColor = type === 'success' ? '#15803d' : '#dc3545'
  const iconColor = type === 'success' ? '#15803d' : '#ef4444'
  const iconName = type === 'success' ? 'check-circle' : 'alert'

  function animate() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(bottom, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),

        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      Animated.delay(2000),
      Animated.parallel([
        Animated.timing(bottom, {
          toValue: -80,
          duration: 50,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => setToast(false))
  }

  useEffect(() => {
    setLeft((width - 300) / 2)
  }, [width])

  useEffect(() => {
    animate()
  }, [])

  return (
    <Animated.View
      className="flex flex-row items-center bg-white w-[300px] absolute  overflow-hidden border-l-4 shadow-md shadow-gray-300 rounded-lg mb-10"
      style={{
        left,
        bottom,
        opacity,
        borderLeftColor: backgroundColor,
      }}
    >
      <View className="w-10 flex flex-col justify-center items-center bg-white h-full ">
        <Octicons name={iconName} color={iconColor} size={20} />
      </View>
      <View className="flex flex-col px-3 py-2">
        <Text
          style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 16,
            color: backgroundColor,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: '#202244',
          }}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  )
}

export default Toast
