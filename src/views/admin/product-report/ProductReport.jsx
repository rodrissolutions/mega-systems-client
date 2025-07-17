import { Text, View } from "react-native";
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
    <View>
      <TopSellingProducts />
      <LowRotationProducts />
      <ProductRevenue />
      <StockVsSales />
      <TopRatedProducts />
      <MostViewedProducts />
      <MostFavoritedProducts />
    </View>
  );
};

export default ProductReport;
