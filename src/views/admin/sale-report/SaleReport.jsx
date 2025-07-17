import { Text, View } from "react-native";
import {
  RevenueOvertime,
  SalesByPaymentMethod,
  SalesOvertime,
  SalesRejected,
} from "../index.admin";

const SaleReport = () => {
  return (
    <View>
      <SalesByPaymentMethod />
      <SalesOvertime />
      <SalesRejected />
      <RevenueOvertime />
    </View>
  );
};

export default SaleReport;
