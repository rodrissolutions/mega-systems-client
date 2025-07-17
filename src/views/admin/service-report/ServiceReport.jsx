import { Text, View } from "react-native";
import {
  LowRotationServices,
  ServiceRevenue,
  TopSellingServices,
} from "../index.admin";

const ServiceReport = () => {
  return (
    <View>
      <TopSellingServices />
      <ServiceRevenue />
      <LowRotationServices />
    </View>
  );
};

export default ServiceReport;
