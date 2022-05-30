import React from 'react';
import CustomDrawer from "../components/CustomDrawer/CustomDrawer";
import {authScreens, privateScreens, publicScreens} from "../routes/DrawerRoutes";
import {createDrawerNavigator} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuth} from "../context/AuthContext";

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    const {token} = useAuth()

    return (
        <Drawer.Navigator
            initialRouteName='News'
            drawerContent={(props) => <CustomDrawer {...props}/>}
            screenOptions={drawerOptions}
        >
            {publicScreens.map(screen =>
                <Drawer.Screen
                    key={screen.name}
                    name={screen.name}
                    options={screen.options}
                >
                    {screen.component}
                </Drawer.Screen>
            )}

            {token
                ?
                privateScreens.map(screen =>
                <Drawer.Screen
                    key={screen.name}
                    name={screen.name}
                    options={screen.options}
                >
                    {screen.component}
                </Drawer.Screen>
                )
                :
                authScreens.map(
                    screen =>
                        <Drawer.Screen
                            key={screen.name}
                            name={screen.name}
                            options={screen.options}
                        >
                            {screen.component}
                        </Drawer.Screen>
                )
            }
        </Drawer.Navigator>
    );
};

const drawerOptions = {
    drawerStyle: {backgroundColor: 'rgb(255,255,255)'},
    headerStyle: {
        backgroundColor: '#D58B40',
    },
    headerTitleStyle: {
        color: '#fff'
    },
    headerTintColor: '#fff',
    drawerActiveBackgroundColor: '#D58B40',
    drawerActiveTintColor: '#fff',
    drawerInactiveBackgroundColor: 'transparent',
    drawerInactiveTintColor: '#000',
    drawerLabelStyle: {
        marginLeft: -20,
        fontSize: 18,
    },
    drawerType: 'slide',
    drawerItemPress: (obj) => {
        console.log(obj)
        this.closeDrawer()
    }
}

export default DrawerNavigator;
