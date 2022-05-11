import React from 'react';
import {StyleSheet, Image, Text, TextInput, View} from "react-native";
import logo from "../../assets/logo.png";
import FormLogin from "../../components/Form/FormLogin";

const AuthPage = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo_img} source={logo}/>
            <FormLogin/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo_img: {
        resizeMode: 'contain',
        width: 255,
        height: 71,
        marginTop: 40
    },
})

export default AuthPage;