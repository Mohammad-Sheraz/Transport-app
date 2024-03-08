import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PickUp from '../views/pickup';
import Destination from '../views/destination';
import Dashboard from '../views/dashboard';
import VehicleSelection from '../views/vehicle';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="PickUp" component={PickUp} />
                <Stack.Screen name="Destination" component={Destination} />
                <Stack.Screen name="Vehicle Selection" component={VehicleSelection} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="PickUp" component={PickUp} />
            <Drawer.Screen name="Destination" component={Destination} />
            <Drawer.Screen name="Vehicle Selection" component={VehicleSelection} />
        </Drawer.Navigator>
    );
}

export {
    AppNavigator,
    MyDrawer
};