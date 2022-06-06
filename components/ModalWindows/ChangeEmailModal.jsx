import React from 'react';
import {Modal, View, StyleSheet} from "react-native";
import {useFormik} from "formik";
import * as yup from "yup";
import CustomInput from "../Common/CustomInput/CustomInput";
import CustomButton from "../Common/CustomButton/CustomButton";
import ErrorText from "../Common/ErrorText";
import {useAuth} from "../../context/AuthContext";
import CloseButton from "../Common/Buttons/CloseButton";
import DefaultText from "../Common/DefaultText";
import Toast from "react-native-toast-message";
import {toastConfig, toastShow} from "../../utils/toastShow";
import CustomToast from "../CustomToast";

const ChangeEmailModal = ({visible, setVisible}) => {
    const {isLoading, updateUser, sendEmailCode, verifyEmailCode} = useAuth()

    const validationSchema = yup.object().shape({
        email: yup.string().email('Введите верный email')
            .required('Пожалуйста, введите вашу электронную почту'),

        code: yup.string()
            .required('Пожалуйста, введите код активации'),

        isCodeVerify: yup.bool()
            .oneOf([true], 'Пожалуйста, подтвердите почту'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            code: '',
            isCodeSend: false,
            isCodeVerify: false,
        },
        onSubmit: values => {
            const {email} = values
            updateUser({email})
            closeModal()
        },
        validationSchema: validationSchema
    })

    const setIsCodeSend = () => {
        formik.setFieldValue('isCodeSend', true)
    }

    const sendCode = () => {
        if (formik.errors.email || !formik.values.email) {
            formik.setFieldTouched('email', true)
            return
        }
        sendEmailCode(formik.values.email, setIsCodeSend)
    }

    const setIsCodeVerify = () => {
        formik.setFieldValue('isCodeVerify', true)
        toastShow('success', 'Код проверен.', 'Теперь вы можете сменить почту.')
    }

    const verifyCode = () => {
        if (formik.errors.code || !formik.values.code) {
            formik.setFieldTouched('code', true)
            return
        }
        verifyEmailCode(formik.values.email, formik.values.code, setIsCodeVerify)
    }

    const changeEmail = () => {
        formik.setFieldValue('isCodeSend', false)
        formik.setFieldValue('isCodeVerify', false)
        formik.setFieldValue('code', '')
    }

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
                    <DefaultText>Сменить электронную почту</DefaultText>
                    <CustomInput
                        keyboardType={'email-address'}
                        onChangeText={(text) => {
                            changeEmail()
                            formik.handleChange('email')(text)
                        }}
                        onBlur={formik.handleBlur('email')}
                        value={formik.values.email}
                        placeholder={'Email'}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <ErrorText>{formik.errors.email}</ErrorText>}
                    {
                        formik.values.isCodeSend && !formik.values.isCodeVerify
                            ?
                            <>
                                <CustomInput
                                    keyboardType={'number-pad'}
                                    onChangeText={formik.handleChange('code')}
                                    onBlur={formik.handleBlur('code')}
                                    value={formik.values.code}
                                    placeholder={'Введите код активации'}
                                />
                                {formik.touched.code && formik.errors.code &&
                                    <ErrorText>{formik.errors.code}</ErrorText>}
                                <CustomButton
                                    disabled={isLoading}
                                    text={'Проверить код активации'}
                                    onPress={verifyCode}
                                />
                            </>
                            :
                            null
                    }
                    {
                        !formik.values.isCodeVerify
                            ?
                            <CustomButton
                                disabled={isLoading}
                                text={formik.values.isCodeSend ? 'Отправить код повторно' : 'Отправить код на почту'}
                                onPress={sendCode}
                            />
                            :
                            <CustomButton
                                disabled={isLoading}
                                text={'Сменить почту'}
                                onPress={formik.handleSubmit}
                            />
                    }
                    {!formik.errors.email && formik.errors.isCodeVerify
                        ? <ErrorText>{formik.errors.isCodeVerify}</ErrorText>
                        : null
                    }
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

export default ChangeEmailModal;
