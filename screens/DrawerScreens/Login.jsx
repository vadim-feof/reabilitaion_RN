import React from 'react';
import {StyleSheet, Image, Text, TextInput, View} from "react-native";
import logo from "../../assets/logo.png";

const AuthPage = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo_img} source={logo}/>
            <Text style={styles.text}>
                Введите номер телефона или эл. почту
            </Text>
            <TextInput
                style={styles.phone}
                placeholder={'Телефон или E-mail'}
                scrollEnabled={true}
                keyboardType={'email-address'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo_img: {
        resizeMode: 'contain',
        width: 255,
        height: 71,
        marginTop: 40
    },
    text: {
        fontSize: 24,
        marginTop: 135,
        textAlign: "center",
        paddingHorizontal: '2%'
    },
    phone: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        fontSize: 24,
        marginTop: 22,
        borderRadius: 8,
        width: '80%'
    }
})

export default AuthPage;