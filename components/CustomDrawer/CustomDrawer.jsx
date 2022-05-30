import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {useAuth} from "../../context/AuthContext";
import {STATIC_IMAGE_USER_URL} from "../../services/api";
import {cutName} from "../../utils/cutName";

const CustomDrawer = (props) => {
    const insets = useSafeAreaInsets()
    const navigation = props.navigation
    const {user, token} = useAuth()
    const imageUrl = STATIC_IMAGE_USER_URL + user.photo
    return (
        <View style={styles.container}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{paddingTop: insets.top}}
            >
                <TouchableOpacity
                    delayPressIn={70}
                    activeOpacity={0.8}
                    style={styles.item}
                    onPress={() => {
                        if (token)
                            navigation.navigate('MyAccount')
                        else
                            navigation.navigate('Login')
                    }}
                >
                    <View style={styles.profileContainer}>
                        <Image style={styles.photo} source={user.photo
                            ?
                            {uri: imageUrl}
                            :
                            require('../../assets/userNoPhoto.png')}
                        />
                        <View style={styles.profileDescription}>
                            {token
                                ?
                                <View style={styles.namePhoneWrapper}>
                                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.nameText}>
                                        {cutName(user.name)}
                                    </Text>
                                    <Text style={styles.phoneText}>
                                        {user.phone}
                                    </Text>
                                </View>
                                :
                                <Text style={styles.profileText}>
                                    Вход не выполнен
                                </Text>
                            }
                        </View>
                    </View>
                </TouchableOpacity>
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
        backgroundColor: '#f7f7f7',
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: Dimensions.get('window').width / 2,
    },
    profileDescription: {
        marginLeft: 5,
    },
    profileText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    namePhoneWrapper: {

    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    phoneText: {
        fontSize: 18,
        marginTop: 5
    }
})

export default CustomDrawer;
