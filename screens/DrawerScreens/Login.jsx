import React, {useState} from 'react';
import {StyleSheet, Image, View} from "react-native";
import logo from "../../assets/logo.png";
import FormLogin from "../../components/Form/FormLogin";
import CustomButton from "../../components/Common/CustomButton/CustomButton";
import ResetPassModal from "../../components/ModalWindows/ResetPassModal";

const Login = ({navigation}) => {

    const [visibleResetPassModal, setVisibleResetPassModal] = useState(false)

    return (
        <View style={styles.container}>
            <ResetPassModal
                visible={visibleResetPassModal}
                setVisible={setVisibleResetPassModal}
            />
            <Image style={styles.logo_img} source={logo}/>
            <FormLogin
                navigation={navigation}
            />
            <CustomButton
                text={'Забыл пароль'}
                onPress={() => setVisibleResetPassModal(true)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    logo_img: {
        resizeMode: 'contain',
        width: 255,
        height: 71,
        marginTop: 40
    },
})

export default Login;
