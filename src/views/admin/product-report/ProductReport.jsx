import { ScrollView, Text, View } from "react-native";
import {
  LowRotationProducts,
  MostFavoritedProducts,
  MostViewedProducts,
  ProductRevenue,
  StockVsSales,
  TopRatedProducts,
  TopSellingProducts,
} from "../index.admin";

const ProductReport = () => {
  return (
    <ScrollView
      className="flex flex-col gap-4 flex-1 bg-[#F5F9FF]"
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
      }}
    >
      <LowRotationProducts />
      <TopSellingProducts />
      <ProductRevenue />
      <StockVsSales />
      <TopRatedProducts />
      {/*
      <MostViewedProducts />
      <MostFavoritedProducts /> */}
    </ScrollView>
  );
};

export default ProductReport;
