import React, {useState} from 'react';

import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from "../../components/CustomButton/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuth} from "../../context/AuthContext";

const MyAccount = ({navigation}) => {
    const {user, logOut} = useAuth()
    console.log(user)
    return (
        <View style={styles.container}>
            <View style={styles.wrapperPhoto}>
                <Image  style={styles.photo} source={require('../../assets/Angelina.jpg')}/>
                <Text style={styles.name}>
                    {user.name}
                </Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.item}>Телефон:
                    <Text> {user.phone}</Text>
                </Text>
                <Text style={styles.item}>Почта:
                    <Text> {user.email}</Text>
                </Text>
                <Text style={styles.item}>Номер карты:
                    <Text> {user.card}</Text>
                </Text>
                <Text style={styles.item}>Дата рождения:
                    <Text> {new Date(user.birthday).toLocaleDateString('ru')}</Text>
                </Text>
            </View>
            <CustomButton
                text={'Выход'}
                onPress={() => {
                    logOut(() => navigation.navigate('News'))
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    name: {
        marginTop: 15,
        fontWeight: 'bold',
        color: '#696969',
        fontSize: 18
    },
    info: {
        marginTop: 15,
        marginLeft: 30,
    },
    item: {
        marginTop: 7,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#696969'
    },
    photo: {
        width: 300,
        height: 300,
        borderRadius: Dimensions.get('window').width / 2,
        marginTop: 20,

    },
    wrapperPhoto: {
        width: '100%',
        height: 400,
        backgroundColor: '#DCDCDC',
        alignItems: "center"
    }
})

export default MyAccount;
