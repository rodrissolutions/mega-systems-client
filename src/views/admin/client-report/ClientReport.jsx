import { Text, View } from "react-native";
import { NewClientOvertime, TopClientBySales } from "../index.admin";

const ClientReport = () => {
  return (
    <View>
      <TopClientBySales />
      <NewClientOvertime />
    </View>
  );
};

export default ClientReport;
