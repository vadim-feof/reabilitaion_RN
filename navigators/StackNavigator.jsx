import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";
import {privateScreens, publicScreens} from "../routes/StackRoutes";
import {useAuth} from "../context/AuthContext";

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const {token} = useAuth()
    console.log('TOKEN', token)
    return (
            <NavigationContainer>
                <StatusBar backgroundColor={'#D58B40'}/>
                <Stack.Navigator
                    screenOptions={stackOptions}
                >
                    <Stack.Screen name={'Root'} component={DrawerNavigator} options={{headerShown: false}}/>

                    {publicScreens.map(screen =>
                        <Stack.Screen
                            key={screen.name}
                            name={screen.name}
                            component={screen.component}
                            options={screen.options}
                        />
                    )}

                    {token
                        ?
                        privateScreens.map(screen =>
                            <Stack.Screen
                                key={screen.name}
                                name={screen.name}
                                component={screen.component}
                                options={screen.options}
                            />
                        )
                        :
                        null
                    }

                </Stack.Navigator>
            </NavigationContainer>
    );
};

const stackOptions = {
    headerStyle: {
        backgroundColor: '#D58B40',
    },
    headerTitleStyle: {
        color: '#fff'
    },
    headerTintColor: '#fff',
}

export default StackNavigator;