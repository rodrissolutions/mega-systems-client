import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import {
  Code,
  Favorites,
  Home,
  Login,
  Profile,
  Register,
  Sales,
  Services,
} from '../views/index.views'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Octicons } from '@expo/vector-icons'

const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const MainTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0A192F',
        tabBarLabelStyle: {
          fontFamily: 'Inter_400Regular',
          fontSize: 13,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Services"
        component={Services}
        options={{
          headerShown: false,
          tabBarLabel: 'Servicios',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="briefcase" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Sales"
        component={Sales}
        options={{
          headerShown: false,
          tabBarLabel: 'Compras',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="tag" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false,
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="heart" size={21} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="gear" size={21} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
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
        name="Home"
        component={MainTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default RootNavigator
