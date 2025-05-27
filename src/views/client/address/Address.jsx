import { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

const Address = () => {
  const [cities, setCities] = useState([])

  const [province, setProvince] = useState(null)
  const provinces = [
    { label: 'Azuay', value: 'Azuay' },
    { label: 'Bolívar', value: 'Bolívar' },
    { label: 'Cañar', value: 'Cañar' },
    { label: 'Carchi', value: 'Carchi' },
    { label: 'Chimborazo', value: 'Chimborazo' },
    { label: 'Cotopaxi', value: 'Cotopaxi' },
    { label: 'El Oro', value: 'El Oro' },
    { label: 'Esmeraldas', value: 'Esmeraldas' },
    { label: 'Galápagos', value: 'Galápagos' },
    { label: 'Guayas', value: 'Guayas' },
    { label: 'Imbabura', value: 'Imbabura' },
    { label: 'Loja', value: 'Loja' },
    { label: 'Los Ríos', value: 'Los Ríos' },
    { label: 'Manabí', value: 'Manabí' },
    { label: 'Morona Santiago', value: 'Morona Santiago' },
    { label: 'Napo', value: 'Napo' },
    { label: 'Orellana', value: 'Orellana' },
    { label: 'Pastaza', value: 'Pastaza' },
    { label: 'Pichincha', value: 'Pichincha' },
    { label: 'Santa Elena', value: 'Santa Elena' },
    {
      label: 'Santo Domingo de los Tsáchilas',
      value: 'Santo Domingo de los Tsáchilas',
    },
    { label: 'Sucumbíos', value: 'Sucumbíos' },
    { label: 'Tungurahua', value: 'Tungurahua' },
    { label: 'Zamora Chinchipe', value: 'Zamora Chinchipe' },
  ]

  const citiesFromProvince = {
    Azuay: [
      { label: 'Cuenca', value: 'Cuenca' },
      { label: 'Gualaceo', value: 'Gualaceo' },
      { label: 'Paute', value: 'Paute' },
      { label: 'Santa Isabel', value: 'Santa Isabel' },
      { label: 'Sígsig', value: 'Sígsig' },
      { label: 'Girón', value: 'Girón' },
      { label: 'Nabón', value: 'Nabón' },
      { label: 'Camilo Ponce Enríquez', value: 'Camilo Ponce Enríquez' },
      { label: 'Chordeleg', value: 'Chordeleg' },
      { label: 'Oña', value: 'Oña' },
      { label: 'San Fernando', value: 'San Fernando' },
      { label: 'Sevilla de Oro', value: 'Sevilla de Oro' },
    ],
    Bolívar: [
      { label: 'Guaranda', value: 'Guaranda' },
      { label: 'Chillanes', value: 'Chillanes' },
      { label: 'Chimbo', value: 'Chimbo' },
      { label: 'Echeandía', value: 'Echeandía' },
      { label: 'Las Naves', value: 'Las Naves' },
      { label: 'San Miguel', value: 'San Miguel' },
      { label: 'Caluma', value: 'Caluma' },
    ],
    Cañar: [
      { label: 'Azogues', value: 'Azogues' },
      { label: 'Biblián', value: 'Biblián' },
      { label: 'Cañar', value: 'Cañar' },
      { label: 'Déleg', value: 'Déleg' },
      { label: 'El Tambo', value: 'El Tambo' },
      { label: 'La Troncal', value: 'La Troncal' },
      { label: 'Suscal', value: 'Suscal' },
    ],
    Carchi: [
      { label: 'Tulcán', value: 'Tulcán' },
      { label: 'Bolívar', value: 'Bolívar' },
      { label: 'Espejo', value: 'Espejo' },
      { label: 'Mira', value: 'Mira' },
      { label: 'Montúfar', value: 'Montúfar' },
      { label: 'San Pedro de Huaca', value: 'San Pedro de Huaca' },
    ],
    Chimborazo: [
      { label: 'Riobamba', value: 'Riobamba' },
      { label: 'Alausí', value: 'Alausí' },
      { label: 'Colta', value: 'Colta' },
      { label: 'Chambo', value: 'Chambo' },
      { label: 'Chunchi', value: 'Chunchi' },
      { label: 'Cumandá', value: 'Cumandá' },
      { label: 'Guamote', value: 'Guamote' },
      { label: 'Guano', value: 'Guano' },
      { label: 'Pallatanga', value: 'Pallatanga' },
      { label: 'Penipe', value: 'Penipe' },
    ],
    Cotopaxi: [
      { label: 'Latacunga', value: 'Latacunga' },
      { label: 'La Maná', value: 'La Maná' },
      { label: 'Pangua', value: 'Pangua' },
      { label: 'Pujilí', value: 'Pujilí' },
      { label: 'Salcedo', value: 'Salcedo' },
      { label: 'Saquisilí', value: 'Saquisilí' },
      { label: 'Sigchos', value: 'Sigchos' },
    ],
    'El Oro': [
      { label: 'Machala', value: 'Machala' },
      { label: 'Arenillas', value: 'Arenillas' },
      { label: 'Atahualpa', value: 'Atahualpa' },
      { label: 'Balsas', value: 'Balsas' },
      { label: 'Chilla', value: 'Chilla' },
      { label: 'El Guabo', value: 'El Guabo' },
      { label: 'Huaquillas', value: 'Huaquillas' },
      { label: 'Las Lajas', value: 'Las Lajas' },
      { label: 'Marcabelí', value: 'Marcabelí' },
      { label: 'Pasaje', value: 'Pasaje' },
      { label: 'Piñas', value: 'Piñas' },
      { label: 'Portovelo', value: 'Portovelo' },
      { label: 'Santa Rosa', value: 'Santa Rosa' },
      { label: 'Zaruma', value: 'Zaruma' },
    ],
  }

  const typeResidence = [
    { label: 'Casa', value: 'Casa' },
    { label: 'Trabajo', value: 'Trabajo' },
  ]

  const handleProvince = (value) => {
    setProvince(value)
  }

  useEffect(() => {
    if (province !== null && province !== undefined) {
      const cities = citiesFromProvince[province]
      setCities(cities)
    }
  }, [province])

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'android' ? 100 : 0}
    >
      <ScrollView
        className="flex-1 flex bg-[#F5F9FF]"
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 bg-[#F5F9FF] flex flex-col ">
          <Text
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 20,
            }}
          >
            Elige donde recibir tus compras
          </Text>
          <Text
            className="mt-2 text-gray-500"
            style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 15,
            }}
          >
            Enviaremos tu pedido a tu domicilio. Recargo adicional de $5 fuera
            de la ciudad.
          </Text>

          {/* Formularios */}
          <View className="mt-5 flex flex-col gap-4">
            <View className="flex flex-col gap-2">
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                }}
              >
                Ciudad Principal/Provincia
              </Text>
              <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                <RNPickerSelect
                  placeholder={{
                    label: 'Seleccione una provincia',
                    value: null,
                  }}
                  style={{
                    inputAndroid: {
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                    },
                    placeholder: {
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                    },
                  }}
                  onValueChange={(value) => handleProvince(value)}
                  items={provinces}
                />
              </View>
            </View>
            <View className="flex flex-col gap-2">
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                }}
              >
                Cantón
              </Text>

              <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                <RNPickerSelect
                  disabled={cities.length === 0}
                  placeholder={{ label: 'Seleccione una cantón', value: null }}
                  style={{
                    inputAndroid: {
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                    },
                    placeholder: {
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                    },
                  }}
                  onValueChange={(value) => console.log(value)}
                  items={cities}
                />
              </View>
            </View>
            <View className="flex flex-col gap-2">
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                }}
              >
                Nombre y apellido
              </Text>

              <TextInput className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3" />
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 11,
                }}
              >
                Tal cual figure en la cédula de identidad
              </Text>
            </View>

            <View className="flex flex-col gap-2">
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                }}
              >
                Calle
              </Text>

              <TextInput className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3" />
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 11,
                }}
              >
                Escribe solo el nombre de la calle o avenida
              </Text>
            </View>

            <View className="flex flex-col gap-2">
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                }}
              >
                Calle secundaria
              </Text>

              <TextInput className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3" />
            </View>

            <View className="flex flex-col gap-2">
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                }}
              >
                Referencias adicionales de esta dirección
              </Text>

              <TextInput
                className="w-full border border-gray-200 h-[150px] bg-white rounded-lg px-3"
                textAlignVertical="top"
              />

              <View className="flex flex-row items-center justify-end px-2">
                <Text
                  style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                  }}
                >
                  0/200
                </Text>
              </View>
            </View>
            <View className="flex flex-col gap-2">
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                }}
              >
                Teléfono
              </Text>

              <TextInput className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3" />

              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 11,
                }}
              >
                Llamarán a este número si hay algún problema con la entrega
              </Text>
            </View>

            <View className="flex flex-col gap-2">
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                }}
              >
                ¿Es casa o trabajo?
              </Text>
              <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                <RNPickerSelect
                  placeholder={{
                    label: 'Seleccione una opción',
                    value: null,
                  }}
                  style={{
                    inputAndroid: {
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                    },
                    placeholder: {
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                    },
                  }}
                  onValueChange={(value) => handleProvince(value)}
                  items={typeResidence}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity className="mt-5 flex flex-row py-3 bg-[#1458b9] rounded-lg justify-center items-center">
            <Text
              style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 18,
                color: 'white',
              }}
            >
              Aceptar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Address
