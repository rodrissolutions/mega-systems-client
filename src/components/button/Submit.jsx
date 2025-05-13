import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

const Submit = ({ loading, handleSubmit, text }) => {
  return (
    <TouchableOpacity
      className="mt-3 py-4 rounded-full flex flex-row gap-3 items-center justify-center bg-[#0A192F]"
      onPress={handleSubmit}
    >
      {loading && <ActivityIndicator size="small" color="white" />}
      <Text
        style={{
          fontFamily: 'Inter_700Bold',
          fontSize: 18,
          color: 'white',
        }}
      >
        {loading ? 'Cargando...' : text}
      </Text>
    </TouchableOpacity>
  )
}

export default Submit
