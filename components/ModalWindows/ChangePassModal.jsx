import React from 'react';
import {useAuth} from "../../context/AuthContext";
import * as yup from "yup";
import {useFormik} from "formik";
import {Modal, StyleSheet, View} from "react-native";
import CustomToast from "../CustomToast";
import CloseButton from "../Common/Buttons/CloseButton";
import DefaultText from "../Common/DefaultText";
import CustomInput from "../Common/CustomInput/CustomInput";
import ErrorText from "../Common/ErrorText";
import CustomButton from "../Common/CustomButton/CustomButton";

const ChangePassModal = ({visible, setVisible}) => {
    const {isLoading, updateUser} = useAuth()

    const validationSchema = yup.object().shape({
        password: yup.string().min(6, 'Не менее 6 символов').max(20, 'Не более 20 символов')
            .required('Пожалуйста, введите пароль'),

        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),
    })

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        onSubmit: values => {
            const {password} = values
            updateUser({password})
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
                    <DefaultText>Сменить пароль</DefaultText>
                    <CustomInput
                        autoCapitalize='none'
                        onChangeText={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                        value={formik.values.password}
                        placeholder={'Пароль'}
                    />
                    {formik.touched.password && formik.errors.password &&
                        <ErrorText>{formik.errors.password}</ErrorText>}
                    <CustomInput
                        autoCapitalize='none'
                        onChangeText={formik.handleChange('confirmPassword')}
                        onBlur={formik.handleBlur('confirmPassword')}
                        value={formik.values.confirmPassword}
                        placeholder={'Подтвердите пароль'}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                        <ErrorText>{formik.errors.confirmPassword}</ErrorText>}
                    <CustomButton
                        text={'Сменить пароль'}
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

export default ChangePassModal;
