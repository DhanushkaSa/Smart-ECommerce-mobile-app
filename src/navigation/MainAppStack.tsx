import { createStackNavigator } from "@react-navigation/stack";
import { AuthStack } from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrderScreen from "../screens/cart/MyOrderScreen";

const Stack = createStackNavigator()

export default function MainAppStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ headerShown: true , title: 'Checkout'}} />
            <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} options={{ headerShown:true , title: 'My Orders'}} />

        </Stack.Navigator>
    )
}