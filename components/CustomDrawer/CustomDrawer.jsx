import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
    const insets = useSafeAreaInsets()

    return (
        <View style={styles.container}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{paddingTop: insets.top}}
            >
                <View style={styles.profileContainer}>
                    <View style={styles.profile}>

                    </View>
                    <Text>Имя</Text>
                </View>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileContainer: {
        backgroundColor: '#E5E2E2',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    profile: {
        height: 100,
        width: 100,
        backgroundColor: '#3f3e3e',
        borderRadius: 50,

    }

})

export default CustomDrawer;
