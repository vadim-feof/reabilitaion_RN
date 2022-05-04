import React from 'react';

import CustomDrawer from "../components/CustomDrawer/CustomDrawer";
import {publicScreens} from "../routes/DrawerRoutes";
import {createDrawerNavigator} from "@react-navigation/drawer";
const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='News'
            drawerContent={(props) => <CustomDrawer {...props}/>}
            screenOptions={{
                drawerStyle: {backgroundColor: 'rgba(255,255,255,0.95)'}
            }}
        >
            {publicScreens.map(screen =>
                <Drawer.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={screen.options}
                />
            )}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
