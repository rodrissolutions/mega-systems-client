import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { storageUtils } from "../../../utils/index.utils";
import { useNavigation } from "@react-navigation/native";

import onboarding_1 from "assets/animations/onboarding_1.json";
import onboarding_2 from "assets/animations/onboarding_2.json";
import onboarding_3 from "assets/animations/onboarding_3.json";

const MyButton = ({ label, onPress, iconName }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
    <MaterialIcons name={iconName} size={20} color="#fff" />
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      const hasLaunched = await storageUtils.getItem("hasLaunched");
      if (hasLaunched) {
        navigation.replace("Home"); // o tu pantalla principal
      } else {
        setLoading(false);
      }
    };
    checkIfFirstLaunch();
  }, []);

  const handleDone = async () => {
    await storageUtils.saveItem("hasLaunched", "true");
    navigation.replace("Home");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Onboarding
      titleStyles={{
        fontFamily: "Inter_700Bold",
        fontSize: 22,
        color: "#111827",
      }}
      subTitleStyles={{
        fontFamily: "Inter_400Regular",
        fontSize: 16,
        color: "#6B7280",
      }}
      containerStyles={{
        backgroundColor: "#F5F9FF",
      }}
      bottomBarColor="#FFF"
      onDone={handleDone}
      onSkip={handleDone}
      SkipButtonComponent={({ onPress }) => (
        <MyButton label="Saltar" onPress={onPress} iconName="skip-next" />
      )}
      NextButtonComponent={({ onPress }) => (
        <MyButton
          label="Siguiente"
          onPress={onPress}
          iconName="navigate-next"
        />
      )}
      DoneButtonComponent={({ onPress }) => (
        <MyButton label="Listo" onPress={onPress} iconName="check-circle" />
      )}
      pages={[
        {
          backgroundColor: "#F5F9FF",
          image: (
            <LottieView
              source={onboarding_1}
              autoPlay
              loop
              style={{ width: 250, height: 250 }}
            />
          ),
          title: "Compra tecnología con confianza.",
          subtitle:
            "Explora productos de calidad para ti o tu empresa directamente desde tu celular.",
        },
        {
          backgroundColor: "#F5F9FF",

          image: (
            <LottieView
              source={onboarding_2}
              autoPlay
              loop
              style={{ width: 250, height: 250 }}
            />
          ),
          title: "Revisa nuestro catálogo digital.",
          subtitle:
            "Encuentra lo que buscas entre múltiples categorías y especificaciones.",
        },
        {
          backgroundColor: "#F5F9FF",

          image: (
            <LottieView
              source={onboarding_3}
              autoPlay
              loop
              style={{ width: 250, height: 250 }}
            />
          ),
          title: "Deja reseñas y califica productos.",
          subtitle:
            "Comparte tu experiencia para ayudar a otros clientes a elegir mejor.",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#2563EB", // azul bonito
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 6,
  },
});

export default OnboardingScreen;
