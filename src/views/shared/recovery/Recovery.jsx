import { Text, TextInput, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import recovery from "assets/animations/recovery.json";
import { useState } from "react";

const Recovery = () => {
  const [emailFound, setEmailFound] = useState(false);

  const handleSubmit = () => {};
  return (
    <View className="flex-1 bg-[#F5F9FF] flex flex-col pt-14 px-5 items-center">
      {/* Animacion */}
      <LottieView
        autoPlay
        loop
        source={recovery}
        style={{
          width: 200,
          height: 200,
        }}
      />

      <View className="px-3 py-5 w-full h-fit bg-green-100 mt-3 border border-green-200 rounded-xl">
        <Text
          className="text-green-800"
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 14,
            textAlign: "center",
          }}
        >
          Por tu seguridad enviaremos un código al correo asociado para que
          puedas restablecer tu contraseña
        </Text>
      </View>

      {/* Ingresar correo */}
      <View className="flex flex-col gap-2 mt-3 w-full px-3">
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
          }}
        >
          Ingresa tu correo
        </Text>

        <TextInput
          className="bg-white h-[50px] mt-1 rounded-lg border border-gray-200 px-3"
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
          }}
        />

        <TouchableOpacity className="w-full h-[50px] flex flex-row justify-center items-center bg-[#4F46E5] rounded-lg mt-2">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "white",
            }}
          >
            Enviar código
          </Text>
        </TouchableOpacity>
      </View>

      {/* Codigo y nueva contraseña */}

      <View className="flex flex-col gap-3 mt-10 w-full px-3">
        <View className="flex flex-col gap-2">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: emailFound ? "black" : "gray",
            }}
          >
            Código de verificación
          </Text>

          <TextInput
            readOnly={!emailFound}
            className={`${
              emailFound ? "bg-white" : "bg-gray-100"
            }  h-[50px]  rounded-lg border border-gray-200 px-3`}
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
            }}
          />
        </View>

        <View className="flex flex-col gap-2">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: emailFound ? "black" : "gray",
            }}
          >
            Nueva contraseña
          </Text>

          <TextInput
            readOnly={!emailFound}
            className={`h-[50px]  rounded-lg border border-gray-200 px-3 ${
              emailFound ? "bg-white" : "bg-gray-100"
            }`}
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
            }}
          />
        </View>

        <TouchableOpacity
          disabled={!emailFound}
          className={`
          w-full h-[50px] flex flex-row justify-center items-center ${
            emailFound ? "bg-[#4F46E5]" : "bg-gray-400"
          } rounded-lg mt-2 `}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "white",
            }}
          >
            Restablecer contraseña
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Recovery;
