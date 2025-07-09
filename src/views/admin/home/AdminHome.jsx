import AdminLayout from "layouts/AdminLayout";
import { Text, View, Dimensions, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import {
  favoriteAPI,
  reviewAPI,
  saleAPI,
  userAPI,
  viewAPI,
  productAPI,
} from "api/index.api";
import { storageUtils } from "utils/index.utils";
import { useDispatch } from "react-redux";
import {
  setAllFavorites,
  setAllViews,
  setUsers,
  setAllReviews,
  setProducts,
} from "redux/slices/data.slice";
import {
  FavoritesChart,
  RatingChart,
  UsersChart,
  ViewsChart,
} from "components/index.components";
import { setAllSales } from "../../../redux/slices/data.slice";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const favoritosData = {
  labels: ["Paracetamol", "Ibuprofeno", "Vitamina C", "Aspirina", "Jarabe X"],
  datasets: [
    {
      data: [12, 25, 18, 7, 20],
    },
  ],
};

const AdminHome = () => {
  const dispatch = useDispatch();
  const [kpi, setKpi] = useState({
    totalRevenue: 0,
    newUser: 0,
    monthlyReviews: 0,
  });

  const getData = async () => {
    const token = await storageUtils.getItem("token");
    try {
      const [userRes, saleRes, reviewRes, favoriteRes, viewRes, productRes] =
        await Promise.all([
          userAPI.getUsers(token),
          saleAPI.getSales(token),
          reviewAPI.listAll(token),
          favoriteAPI.getAll(token),
          viewAPI.getViews(token),
          productAPI.getProducts(),
        ]);
      const users = userRes.data.users;
      const sales = saleRes.data.sales;
      const reviews = reviewRes.data.reviews;
      const favorites = favoriteRes.data.favorites;
      const views = viewRes.data.views;
      const products = productRes.data.products;

      dispatch(setUsers(users));
      dispatch(setAllSales(sales));
      dispatch(setAllFavorites(favorites));
      dispatch(setAllReviews(reviews));
      dispatch(setAllViews(views));
      dispatch(setProducts(products));

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const newUsers = users.filter((usr) => {
        const date = new Date(usr.createdAt);
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      }).length;

      let monthlyRevenue = 0;
      sales.forEach((sale) => {
        const date = new Date(sale.createdAt);
        if (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        ) {
          monthlyRevenue += parseFloat(sale.total); // Adjust field name if needed
        }
      });

      const monthlyReviews = reviews.filter((review) => {
        const date = new Date(review.createdAt);
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      }).length;

      setKpi({
        totalRevenue: monthlyRevenue,
        newUser: newUsers,
        monthlyReviews: monthlyReviews,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminLayout>
      <ScrollView className="flex flex-col px-4 py-5">
        {/* Kpis */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="mb-5"
        >
          {/* Total Revenue */}
          <View className="w-[220px] mr-3 bg-white border border-gray-200 rounded-lg p-4">
            <Text
              className="mb-1"
              style={{
                fontFamily: "Inter_600SemiBold",
              }}
            >
              Ingresos del mes
            </Text>
            <Text className="text-xl font-bold text-blue-600">
              ${kpi.totalRevenue.toFixed(2)}
            </Text>
          </View>

          {/* New Users */}
          <View className="w-[220px] mr-3 bg-white border border-gray-200 rounded-lg p-4">
            <Text
              className="mb-1"
              style={{
                fontFamily: "Inter_600SemiBold",
              }}
            >
              Nuevos usuarios
            </Text>
            <Text className="text-xl font-bold text-green-500">
              {kpi.newUser}
            </Text>
          </View>

          {/* Monthly Reviews */}
          <View className="w-[220px] mr-3 bg-white border border-gray-200 rounded-lg p-4">
            <Text
              className="mb-1"
              style={{
                fontFamily: "Inter_600SemiBold",
              }}
            >
              Opiniones recibidas
            </Text>
            <Text className="text-xl font-bold text-yellow-500">
              {kpi.monthlyReviews}
            </Text>
          </View>
        </ScrollView>

        {/* Usuarios Pie Chart */}
        <UsersChart chartConfig={chartConfig} screenWidth={screenWidth} />

        {/* Productos añadidos a favoritos */}
        <FavoritesChart chartConfig={chartConfig} screenWidth={screenWidth} />

        {/* Productos mas vistos */}
        <ViewsChart />

        {/* Productos mejor calificados */}
        <RatingChart />
      </ScrollView>
    </AdminLayout>
  );
};

export default AdminHome;
