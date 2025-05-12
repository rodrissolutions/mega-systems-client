import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { View } from 'react-native'
import { Login } from '../views/index.views'

const Stack = createStackNavigator()

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default RootNavigator
