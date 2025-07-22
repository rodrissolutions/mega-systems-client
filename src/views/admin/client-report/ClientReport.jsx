import { ScrollView, Text, View } from "react-native";
// import { GroupByCity, TopClientBySales } from "../index.admin";

const ClientReport = () => {
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
      {/* <GroupByCity /> */}
      {/* <TopClientBySales /> */}
    </ScrollView>
  );
};

export default ClientReport;
