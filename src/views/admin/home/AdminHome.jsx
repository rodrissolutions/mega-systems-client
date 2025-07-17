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
import {
  setAllApointments,
  setAllSales,
  setAppointments,
  setBankAccounts,
  setCategories,
  setOffers,
  setSchedules,
  setServices,
} from "../../../redux/slices/data.slice";
import categoryAPI from "../../../api/category/category.api";
import serviceAPI from "../../../api/service/service.api";
import {
  appointmentAPI,
  bankAccountAPI,
  offerAPI,
} from "../../../api/index.api";
import scheduleAPI from "../../../api/schedule/schedule.api";

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
    pendingRevenue: 0,
    rejectedRevenue: 0,
  });

  const getData = async () => {
    const token = await storageUtils.getItem("token");
    try {
      const [
        userRes,
        saleRes,
        reviewRes,
        favoriteRes,
        viewRes,
        productRes,
        categoryRes,
        serviceRes,
        offerRes,
        bankAccountRes,
        scheduleRes,
        appointmentRes,
      ] = await Promise.all([
        userAPI.getUsers(token),
        saleAPI.getSales(token),
        reviewAPI.listAll(token),
        favoriteAPI.getAll(token),
        viewAPI.getViews(token),
        productAPI.getProducts(),
        categoryAPI.getCategories(),
        serviceAPI.getServices(),
        offerAPI.getAllOffers(token),
        bankAccountAPI.getAll(token),
        scheduleAPI.listAll(),
        appointmentAPI.getAppointments(token),
      ]);
      const users = userRes.data.users;
      const sales = saleRes.data.sales;
      const reviews = reviewRes.data.reviews;
      const favorites = favoriteRes.data.favorites;
      const views = viewRes.data.views;
      const products = productRes.data.products;
      const categories = categoryRes.data.categories;
      const services = serviceRes.data.services;
      const offers = offerRes.data.offers;
      const bankAccounts = bankAccountRes.data.bankAccounts;
      const schedules = scheduleRes.data.schedules;
      const appointments = appointmentRes.data.appointments;

      dispatch(setUsers(users));
      dispatch(setAllSales(sales));
      dispatch(setAllFavorites(favorites));
      dispatch(setAllReviews(reviews));
      dispatch(setAllViews(views));
      dispatch(setProducts(products));
      dispatch(setCategories(categories));
      dispatch(setServices(services));
      dispatch(setOffers(offers));
      dispatch(setBankAccounts(bankAccounts));
      dispatch(setSchedules(schedules));
      dispatch(setAllApointments(appointments));

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
      let pendingRevenue = 0;
      let rejectedRevenue = 0;

      sales.forEach((sale) => {
        const date = new Date(sale.createdAt);
        const isCurrentMonth =
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear;

        if (isCurrentMonth) {
          const total = parseFloat(sale.total);
          if (sale.status === "Pagada") {
            monthlyRevenue += total;
          } else if (sale.status === "Pendiente") {
            pendingRevenue += total;
          } else if (sale.status === "Rechazada") {
            rejectedRevenue += total;
          }
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
        pendingRevenue,
        rejectedRevenue,
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
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 20,
          paddingBottom: 40,
          paddingHorizontal: 20,
        }}
      >
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

          {/* Ingresos Pendientes */}
          <View className="w-[220px] mr-3 bg-white border border-gray-200 rounded-lg p-4">
            <Text className="mb-1" style={{ fontFamily: "Inter_600SemiBold" }}>
              Ingresos pendientes
            </Text>
            <Text className="text-xl font-bold text-orange-500">
              ${kpi.pendingRevenue.toFixed(2)}
            </Text>
          </View>

          {/* Ingresos Perdidos */}
          <View className="w-[220px] mr-3 bg-white border border-gray-200 rounded-lg p-4">
            <Text className="mb-1" style={{ fontFamily: "Inter_600SemiBold" }}>
              Ingresos perdidos
            </Text>
            <Text className="text-xl font-bold text-red-500">
              ${kpi.rejectedRevenue.toFixed(2)}
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
        <ViewsChart screenWidth={screenWidth} chartConfig={chartConfig} />

        {/* Productos mejor calificados */}
        <RatingChart />
      </ScrollView>
    </AdminLayout>
  );
};

export default AdminHome;
