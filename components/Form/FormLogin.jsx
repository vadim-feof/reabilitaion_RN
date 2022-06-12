import React from 'react';
import * as yup from 'yup'
import {Formik} from "formik";
import {StyleSheet, View} from "react-native";
import CustomInput from "../Common/CustomInput/CustomInput";
import CustomButton from "../Common/CustomButton/CustomButton";
import {useAuth} from "../../context/AuthContext";
import {ActivityIndicator} from "react-native";
import ErrorText from "../Common/ErrorText";
import CustomCheckBox from "../Common/CustomCheckBox";
import Loader from "../Common/Loader";

const FormLogin = ({navigation}) => {
    const {isLoading, loginUser} = useAuth()

    const navigateToNews = () => {
        navigation.navigate('News')
    }

    const validationSchema = yup.object().shape(
        {
            login: yup.string().when('isEmail', {
                is: true,
                then: yup.string().email('Пожалуйста, введите правильный email')
                    .required('Пожалуйста, введите Ваш email'),
                otherwise: yup.string().matches('^(\\+{1}[0-9]{11})$', 'Номер телефона должен быть в формате +71234567890')
                    .required('Пожалуйста, введите ваш номер телефона')
            }),
            password: yup.string().typeError('Должно быть строкой')
                .required('Укажите пароль'),
        }
    )

    return (
        <View>
            <Formik initialValues={{
                isEmail: false,
                login: '+7',
                password: '',
            }}
                validateOnBlur
                onSubmit={(values, action) => {
                    loginUser(values, navigateToNews)
                }}
                validationSchema={validationSchema}
            >
                {({
                      values, errors, touched,
                      handleChange, handleBlur,
                      handleSubmit, setFieldValue
                  }) => (
                    <View>
                        {isLoading ? <Loader /> : null}
                        <CustomInput keyboardType={values.isEmail ? 'email-address' : 'phone-pad'}
                                     onChangeText={handleChange('login')}
                                     onBlur={handleBlur('login')}
                                     value={values.login}
                                     placeholder={values.isEmail ? 'Введите Email' : 'Введите номер телефона'}
                        />
                        {touched.login && errors.login &&
                            <ErrorText>{errors.login}</ErrorText>}

                        <CustomInput secureTextEntry={true}
                                     onChangeText={handleChange('password')}
                                     onBlur={handleBlur('password')}
                                     value={values.password}
                                     placeholder={'Введите пароль'}

                        />
                        {touched.password && errors.password &&
                            <ErrorText>{errors.password}</ErrorText>}

                        <CustomCheckBox
                            text={'Войти с помощью электронной почты'}
                            setValue={value => setFieldValue('isEmail', value)}
                            value={values.isEmail}
                        />
                        <CustomButton
                            disabled={isLoading}
                            onPress={handleSubmit}
                            text={'Войти'}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'white',
        paddingTop: 15
    },
    error: {
        color: 'red',
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 18,
    },
    checkboxContainer: {
        flexShrink: 1,
        flexDirection: "row",
        margin: 15
    },
    checkbox: {
        width: 25,
        height: 25
    },
    label: {
        fontSize: 17,
        height: 45,
        marginLeft: 5
    }
})

export default FormLogin;
