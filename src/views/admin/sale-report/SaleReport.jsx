import { ScrollView } from "react-native";
import {
  SaleByWeek,
  SalesByMonth,
  SalesByPaymentMethod,
  SalesByYear,
} from "../index.admin";

const SaleReport = () => {
  return (
    <ScrollView
      className="flex-1 flex-col gap-4 bg-[#F5F9FF]"
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
      }}
    >
      <SalesByPaymentMethod />
      <SalesByYear />
      <SalesByMonth />
      <SaleByWeek />
    </ScrollView>
  );
};

export default SaleReport;
