import { createStackNavigator } from "@react-navigation/stack";
import {
  Address,
  Appointment,
  ChangePassword,
  Code,
  Favorites,
  History,
  Home,
  Login,
  Profile,
  Recovery,
  Register,
  BuyProductDetail,
  Buy,
  BuyServiceDetail,
  Services,
  AdminHome,
  Users,
  Products,
  Reports,
  Settings,
  Categories,
  ServicesDashboard,
  Sales,
  Comments,
  Resend,
} from "views/index.views";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import { Checkout, Edit, InfoSale, InfoUser, Map } from "../views/index.views";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: "Configuración",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{
          headerTitle: "Dirección de entrega",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="EditInformation"
        component={Edit}
        options={{
          headerTitle: "Editar Información",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: "Cambiar contraseña",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

const ServicesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Services"
        component={Services}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Appointment"
        component={Appointment}
        options={{
          headerTitle: "Agendar cita",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{
          headerTitle: "Dirección de entrega",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerTitle: "Citas",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

const BuyNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name="Buy"
        component={Buy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuyProductDetail"
        component={BuyProductDetail}
        options={{
          headerTitle: "Detalle",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="BuyServiceDetail"
        component={BuyServiceDetail}
        options={{
          headerTitle: "Detalle",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{
          headerTitle: "Dirección de entrega",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerTitle: "Confirmar compra",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerShown: false,
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{
          headerTitle: "Dirección de entrega",
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#0A192F",
        tabBarLabelStyle: {
          fontFamily: "Inter_400Regular",
          fontSize: 13,
        },
      }}
    >
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ServicesNavigator"
        component={ServicesNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Servicios",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="briefcase" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="BuyMain"
        component={BuyNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Compras",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="tag" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="heart" size={21} color={color} />
          ),
          headerShown: false,

          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitle: "Favoritos",
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarLabel: "Ajustes",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="gear" size={21} color={color} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "#1786f9",
          },
          headerTitle: "Configuración",
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 24,
          },
          headerTitleAlign: "center",
        }}
      />
    </Tabs.Navigator>
  );
};

const UsersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name="Users"
        component={Users}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="InfoUser"
        component={InfoUser}
        options={{
          headerTitle: "Información del Usuario",
          headerStyle: {
            backgroundColor: "#0A192F",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 18,
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="InfoSale"
        component={InfoSale}
        options={{
          headerTitle: "Información de la compra",
          headerStyle: {
            backgroundColor: "#0A192F",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 18,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

// AdminNavigator
const AdminNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={AdminHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainUsers"
        component={UsersNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Services"
        component={ServicesDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sales"
        component={Sales}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reports"
        component={Reports}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          headerTitle: "Ubicación",
          headerStyle: {
            backgroundColor: "#0A192F",
          },
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Inter_700Bold",
            fontSize: 18,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Admin"
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Code"
        component={Code}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recovery"
        component={Recovery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Resend"
        component={Resend}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
