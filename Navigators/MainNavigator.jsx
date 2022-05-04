import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";
import {publicScreens} from "../routes/OtherRoutes";

const Stack = createNativeStackNavigator()
const MainNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={'#D58B40'}/>

            <Stack.Navigator>
                <Stack.Screen name={'Root'} component={DrawerNavigator} options={{headerShown: false}}/>
                {publicScreens.map(screen =>
                    <Stack.Screen
                        key={screen.name}
                        name={screen.name}
                        component={screen.component}
                        options={screen.options}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;