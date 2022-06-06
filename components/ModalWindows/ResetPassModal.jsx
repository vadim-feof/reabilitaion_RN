import React from 'react';
import {useAuth} from "../../context/AuthContext";
import * as yup from "yup";
import {useFormik} from "formik";
import {Modal, StyleSheet, Text, View} from "react-native";
import CustomToast from "../CustomToast";
import CloseButton from "../Common/Buttons/CloseButton";
import DefaultText from "../Common/DefaultText";
import CustomInput from "../Common/CustomInput/CustomInput";
import ErrorText from "../Common/ErrorText";
import CustomButton from "../Common/CustomButton/CustomButton";
import CustomCheckBox from "../Common/CustomCheckBox";

const ResetPassModal = ({visible, setVisible}) => {
    const {isLoading, resetPassword} = useAuth()

    const validationSchema = yup.object().shape({
        login: yup.string().when('isEmail', {
            is: true,
            then: yup.string().email('Пожалуйста, введите правильный email')
                .required('Пожалуйста, введите Ваш email'),
            otherwise: yup.string().matches('^(\\+{1}[0-9]{11})$', 'Номер телефона должен быть в формате +71234567890')
                .required('Пожалуйста, введите ваш номер телефона')
        })
    })

    const formik = useFormik({
        initialValues: {
            isEmail: false,
            login: '',
        },
        onSubmit: values => {
            const {login} = values
            resetPassword(login)
            closeModal()
        },
        validationSchema: validationSchema
    })

    const closeModal = () => {
        formik.resetForm()
        setVisible(false)
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={closeModal}
            animationType={'fade'}
        >
            <View style={styles.container}>
                <CustomToast/>
                <View style={styles.wrapper}>
                    <CloseButton color={'#393939'} onPress={closeModal}/>
                    <DefaultText>Восстановить пароль</DefaultText>
                    <CustomInput keyboardType={formik.values.isEmail ? 'email-address' : 'phone-pad'}
                                 onChangeText={formik.handleChange('login')}
                                 onBlur={formik.handleBlur('login')}
                                 value={formik.values.login}
                                 placeholder={formik.values.isEmail ? 'Введите Email' : 'Введите номер телефона'}
                    />
                    {formik.touched.login && formik.errors.login &&
                        <ErrorText>{formik.errors.login}</ErrorText>}

                    <CustomCheckBox
                        text={'Восстановить по электронной почте'}
                        value={formik.values.isEmail}
                        setValue={value => formik.setFieldValue('isEmail', value)}
                    />
                    <CustomButton
                        text={'Восстановить пароль'}
                        disabled={isLoading}
                        onPress={formik.handleSubmit}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    wrapper: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 5
    }
})

export default ResetPassModal;
