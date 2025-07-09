import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect } from "react";
const Map = () => {
  const { currentUser } = useSelector((state) => state.data);

  useEffect(() => {
    console.log(currentUser?.Residency);
  }, []);
  return (
    <View className="flex-1 bg-[#f5f9ff] h-[800px] w-[500px]">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        className="w-full h-full"
        initialRegion={{
          latitude: parseFloat(currentUser.Residency.latitude),
          longitude: parseFloat(currentUser.Residency.longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(currentUser.Residency.latitude),
            longitude: parseFloat(currentUser.Residency.longitude),
          }}
          title={currentUser.Residency.mainStreet}
          description={currentUser.Residency.secondaryStreet}
        />
      </MapView>
    </View>
  );
};

export default Map;
