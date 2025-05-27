import { useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'

const Appointment = () => {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')

  const onChange = (event, selectedDate) => {}
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  // Fecha base para las restricciones
  const today = new Date()
  const minTime = new Date(today)
  minTime.setHours(8, 0, 0) // 8:00 AM
  const maxTime = new Date(today)
  maxTime.setHours(17, 0, 0) // 5:00 PM

  return (
    <View className="flex flex-col flex-1">
      <ScrollView
        style={{
          flexGrow: 1,
          backgroundColor: '#F5F9FF',
          paddingHorizontal: 20,
        }}
      >
        <View className="flex flex-col gap-3  py-10">
          {/* Servicio */}
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 18,
              }}
            >
              Servicio
            </Text>
            <TextInput
              value="Mantenimiento preventivo"
              className="border border-gray-200 rounded-lg px-3 bg-white py-4"
              readOnly
              style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
              }}
            />
          </View>
          {/* Descripcion */}
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 18,
              }}
            >
              Descripción
            </Text>

            <TextInput
              className="w-full h-[200px] bg-white border border-gray-200 rounded-lg px-5 py-4 text-wrap"
              textAlignVertical="top"
              style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
              }}
            />

            {/* Fecha */}
            <View className="flex flex-col gap-2">
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 18,
                }}
              >
                Fecha
              </Text>
              <View className="flex flex-row items-center gap-2 h-[50px]">
                <TextInput
                  readOnly
                  className="flex-1 bg-white border border-gray-200 rounded-lg h-[50px] text-center"
                  placeholder="DD/MM/AAAA"
                  style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                  }}
                />
                <TouchableOpacity
                  className="w-[45px] h-[45px] flex flex-row justify-center items-center bg-[#1786f9] rounded-lg"
                  onPressIn={() => showMode('date')}
                >
                  <Octicons name="calendar" size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Hora */}
            <View className="flex flex-col gap-2">
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 18,
                }}
              >
                Hora
              </Text>
              <View className="flex flex-row items-center gap-2 h-[50px]">
                <TextInput
                  readOnly
                  className="flex-1 bg-white border border-gray-200 rounded-lg h-[50px] text-center"
                  placeholder="HH:MM"
                  style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                  }}
                />
                <TouchableOpacity
                  className="w-[45px] h-[45px] flex flex-row justify-center items-center bg-[#1786f9] rounded-lg"
                  onPressIn={() => showMode('time')}
                >
                  <Octicons name="clock" size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity className="flex flex-row items-center justify-center gap-2 py-4 w-full rounded-lg bg-[#1458b9]">
            <MaterialIcons name="event-available" size={20} color={'white'} />
            <Text
              style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 18,
                color: 'white',
              }}
            >
              Verificar disponibilidad
            </Text>
          </TouchableOpacity>

          {/* Producto */}
          <View className="flex flex-col gap-2 mt-3">
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18 }}>
              Producto
            </Text>

            <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
              <RNPickerSelect
                placeholder={{ label: 'Seleccione un producto', value: null }}
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
                items={[
                  { label: 'Opción 1', value: 'idopcion1' },
                  { label: 'Opción 2', value: 'idopcion2' },
                  { label: 'Opción 3', value: 'idopcion3' },
                  { label: 'Opción 4', value: 'idopcion4' },
                ]}
              />

              <Text
                className="text-gray-400 px-2 mt-1"
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                }}
              >
                Nota: Si no adquiriste tu producto en la empresa, deja este
                campo en blanco
              </Text>
            </View>
          </View>

          <TouchableOpacity className="mt-14 flex flex-row items-center justify-center gap-2 py-4 w-full rounded-lg bg-[#1458b9]">
            <MaterialIcons name="save" size={20} color={'white'} />
            <Text
              style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 18,
                color: 'white',
              }}
            >
              Generar cita
            </Text>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            minimumDate={minTime}
            maximumDate={maxTime}
          />
        )}
      </ScrollView>
    </View>
  )
}

export default Appointment
