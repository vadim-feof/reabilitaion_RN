import React from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert} from "react-native";
import {Formik} from "formik";
import CustomInput from "../Common/CustomInput/CustomInput";
import * as yup from 'yup'
import CustomButton from "../Common/CustomButton/CustomButton";
import {useAuth} from "../../context/AuthContext";
import BirthdayPicker from "../BirthdayPicker";
import {upperFirstLetter} from "../../utils/upperFirstLetter";
import {toastShow} from "../../utils/toastShow";
import CustomCheckBox from "../Common/CustomCheckBox";
import Loader from "../Common/Loader";
import ErrorText from "../Common/ErrorText";

const FormRegistration = ({navigation}) => {
    const {registrationUser, sendEmailCode, verifyEmailCode, isLoading} = useAuth()

    const navigateToLogin = () => {
        navigation.navigate('Login')
    }

    const validationSchema = yup.object().shape(
        {
            secondName: yup.string().matches('^([А-Яа-яA-Za-z-\S]+)$', 'Введите фамилию без пробелов')
                .required('Пожалуйста, укажите фамилию'),

            name: yup.string().matches('^([А-Яа-яA-Za-z-\S]+)$', 'Введите имя без пробелов')
                .required('Пожалуйста, укажите имя'),

            patronymic: yup.string().matches('^([А-Яа-яA-Za-z-\S]+)$', 'Введите отчество без пробелов'),

            numCard: yup.string().matches('^([0-9]{2}\/[0-9]{6})$', 'Номер карты должен быть в формате XX/XXXXXX')
                .required('Пожалуйста, укажите номер амбулаторной карты'),

            telephone: yup.string().matches('^(\\+{1}[0-9]{11})$', 'Номер телефона должен быть в формате +71234567890')
                .required('Пожалуйста, введите ваш телефон'),

            email: yup.string().email('Введите верный email')
                .required('Пожалуйста, введите вашу электронную почту'),

            code: yup.string()
                .required('Пожалуйста, введите код активации'),

            isCodeVerify: yup.bool()
                .oneOf([true], 'Пожалуйста, подтвердите почту'),

            password: yup.string().min(6, 'Не менее 6 символов').max(20, 'Не более 20 символов')
                .required('Пожалуйста, введите пароль'),

            confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),

            isCheckDataProcess: yup.bool()
                .oneOf([true], 'Без согласия на обработку данных регистрация невозможна'),
        }
    )

    return (
        <View>
            <Formik initialValues={{
                secondName: '',
                name: '',
                patronymic: '',
                birthday: new Date(1990, 1, 1),
                numCard: '',
                telephone: '+7',
                email: '',
                password: '',
                confirmPassword: '',
                code: '',
                isCodeSend: false,
                isCodeVerify: false,
                isCheckDataProcess: false
            }}
                    validateOnBlur
                    onSubmit={(values, action) => {
                        const regData = {
                            name: `${upperFirstLetter(values.secondName)} ${upperFirstLetter(values.name)} ${upperFirstLetter(values.patronymic)}`.trim(),
                            phone: values.telephone,
                            email: values.email,
                            password: values.password,
                            birthday: values.birthday,
                            card: values.numCard
                        }
                        registrationUser(regData, navigateToLogin)
                    }}
                    validationSchema={validationSchema}
            >
                {({values, errors, touched, setFieldTouched,
                      handleChange, handleBlur,
                      handleSubmit, setFieldValue}) => {

                    const setIsCodeSend = () => {
                        setFieldValue('isCodeSend', true)
                    }

                    const sendCode = () => {
                        if (errors.email || !values.email) {
                            setFieldTouched('email', true)
                            return
                        }
                        sendEmailCode(values.email, setIsCodeSend)
                    }

                    const setIsCodeVerify = () => {
                        setFieldValue('isCodeVerify', true)
                        toastShow('success', 'Код проверен.', 'Продолжите регистрацию.')
                    }

                    const verifyCode = () => {
                        if (errors.code || !values.code) {
                            setFieldTouched('code', true)
                            return
                        }
                        verifyEmailCode(values.email, values.code, setIsCodeVerify)
                    }

                    const changeEmail = () => {
                        setFieldValue('isCodeSend', false)
                        setFieldValue('isCodeVerify', false)
                        setFieldValue('code', '')
                    }

                    return (
                        <ScrollView>
                            {isLoading ? <Loader/> : null}
                            <Text style={styles.headerText}>Пожалуйста, заполните ФИО:</Text>
                            <View>
                                <CustomInput
                                    onChangeText={handleChange('secondName')}
                                    onBlur={handleBlur('secondName')}
                                    value={values.secondName}
                                    placeholder={'Фамилия*'}
                                />
                                {touched.secondName && errors.secondName &&
                                    <ErrorText>{errors.secondName}</ErrorText>}
                                <CustomInput
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    placeholder={'Имя*'}
                                />
                                {touched.name && errors.name &&
                                    <ErrorText>{errors.name}</ErrorText>}
                                <CustomInput
                                    onChangeText={handleChange('patronymic')}
                                    onBlur={handleBlur('patronymic')}
                                    value={values.patronymic}
                                    placeholder={'Отчество'}
                                />
                                {touched.patronymic && errors.patronymic &&
                                    <ErrorText>{errors.patronymic}</ErrorText>}
                                <Text style={styles.headerText}>Дата рождения:</Text>
                                <BirthdayPicker
                                    value={values.birthday}
                                    setValue={(birthday) => setFieldValue('birthday', birthday)}
                                />

                            </View>
                            <Text style={styles.headerText}>Укажите ваш телефон и электронную почту:</Text>
                            <View style={styles.border}>
                                <CustomInput
                                    keyboardType={'phone-pad'}
                                    onChangeText={handleChange('telephone')}
                                    onBlur={handleBlur('telephone')}
                                    value={values.telephone}
                                    placeholder={'Телефон*'}
                                />
                                {touched.telephone && errors.telephone &&
                                    <ErrorText>{errors.telephone}</ErrorText>}
                                <CustomInput
                                    keyboardType={'email-address'}
                                    onChangeText={(text) => {
                                        changeEmail()
                                        handleChange('email')(text)
                                    }}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder={'Введите Email*'}
                                />
                                {touched.email && errors.email &&
                                    <ErrorText>{errors.email}</ErrorText>}
                                {
                                    values.isCodeSend && !values.isCodeVerify
                                    ?
                                        <>
                                            <CustomInput
                                                keyboardType={'number-pad'}
                                                onChangeText={handleChange('code')}
                                                onBlur={handleBlur('code')}
                                                value={values.code}
                                                placeholder={'Введите код активации'}
                                            />
                                            {touched.code && errors.code &&
                                                <ErrorText>{errors.code}</ErrorText>}
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
                                    !values.isCodeVerify
                                    ?
                                        <CustomButton
                                            disabled={isLoading}
                                            text={values.isCodeSend ? 'Отправить код повторно' : 'Отправить код на почту'}
                                            onPress={sendCode}
                                        />
                                    :
                                        null
                                }
                                {!errors.email && errors.isCodeVerify ?
                                    <ErrorText>{errors.isCodeVerify}</ErrorText> : null}
                            </View>
                            <Text style={styles.headerText}>Пожалуйста, введите номер вашей амбулаторной карты:</Text>
                            <View>
                                <CustomInput
                                     onChangeText={handleChange('numCard')}
                                     onBlur={handleBlur('numCard')}
                                     value={values.numCard}
                                     placeholder={'Номер амбулаторной карты*'}
                                />
                                {touched.numCard && errors.numCard &&
                                    <ErrorText>{errors.numCard}</ErrorText>}
                            </View>
                            <Text style={styles.headerText}>Придумайте пароль и подтвердите его:</Text>
                            <View>
                                <CustomInput
                                    autoCapitalize='none'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder={'Введите пароль'}

                                />
                                {touched.password && errors.password &&
                                    <ErrorText>{errors.password}</ErrorText>}
                                <CustomInput
                                    autoCapitalize='none'
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    placeholder={'Подтвердите пароль'}
                                />
                                {touched.confirmPassword && errors.confirmPassword &&
                                    <ErrorText>{errors.confirmPassword}</ErrorText>}
                            </View>
                            <CustomCheckBox
                                setValue={value => setFieldValue('isCheckDataProcess', value)}
                                value={values.isCheckDataProcess}
                                text={'Согласие на обработку данных'}
                            />
                            <ErrorText>
                                {errors.isCheckDataProcess}
                            </ErrorText>
                            <CustomButton
                                disabled={isLoading}
                                onPress={handleSubmit}
                                text={'Зарегистрироваться'}
                            />
                            <View style={{height: 100}}/>
                        </ScrollView>
                    )
                }}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 19,
        textAlign: "left",
        marginTop: 10,
        color: '#CD853F',
        fontWeight: 'bold',
        marginHorizontal: 15,
        lineHeight: 20
    },
    text: {
        textAlign: 'center',
        color: '#E0FFFF',
        paddingTop: 15
    },
})

export default FormRegistration;
