import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Countdown = ({ createdAt, expirationTime, resendCode }) => {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const start = new Date().getTime()
    const end = new Date(expirationTime).getTime()
    const initialDiff = Math.floor((end - start) / 1000)
    setTimeLeft(initialDiff)

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [createdAt, expirationTime])

  const formatTipe = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
    const secs = String(seconds % 60).padStart(2, '0')
    return `${mins}:${secs}`
  }
  return (
    <View className="flex-1 flex-col justify-end ">
      {timeLeft > 0 ? (
        <Text
          className="text-gray-400"
          style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
          }}
        >
          {`Reenviar código en ${formatTipe(timeLeft)}`}
        </Text>
      ) : (
        <TouchableOpacity onPress={resendCode}>
          <Text
            className="text-gray-500"
            style={{
              fontFamily: 'Inter_700Bold',
              fontSize: 18,
            }}
          >
            Reenviar código
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Countdown
