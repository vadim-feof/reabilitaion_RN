import React from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import {Formik} from "formik";
import CustomInput from "../Common/CustomInput/CustomInput";
import * as yup from 'yup'
import CustomButton from "../Common/CustomButton/CustomButton";
import {useAuth} from "../../context/AuthContext";
import BirthdayPicker from "../BirthdayPicker";
import {upperFirstLetter} from "../../utils/upperFirstLetter";

const FormRegistration = ({navigation}) => {
    const {registrationUser, isLoading} = useAuth()

    const navigateToLogin = () => {
        navigation.navigate('Login')
    }

    const validationSchema = yup.object().shape(
        {
            secondName: yup.string().matches('^([А-Яа-яA-Za-z-\S]+)$', 'Введите фамилию без пробелов')
                .required('Пожалуйста, укажите фамилию'),

            name: yup.string().matches('^([А-Яа-яA-Za-z-\S]+)$', 'Введите имя без пробелов')
                .required('Пожалуйста, укажите имя'),

            patronymic: yup.string().matches('^([А-Яа-яA-Za-z-\S]+)$', 'Введите отчество без пробелов')
                .required('Пожалуйста, укажите отчество'),

            numCard: yup.string().matches('^([0-9]{2}\/[0-9]{6})$', 'Номер карты должен быть в формате XX/XXXXXX')
                .required('Пожалуйста, укажите номер амбулаторной карты'),

            telephone: yup.string().matches('^(\\+{1}[0-9]{11})$', 'Номер телефона должен быть в формате +71234567890')
                .required('Пожалуйста, введите ваш телефон'),

            email: yup.string().email('Введите верный email')
                .required('Пожалуйста, введите вашу электронную почту'),

            password: yup.string().min(6, 'Не менее 6 символов').max(20, 'Не более 20 символов')
                .required('Пожалуйста, введите пароль'),

            confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),
        }
    )

    return (
        <View>
            <Formik initialValues={{
                secondName: 'Балясов',
                name: 'Вадим',
                patronymic: 'Александрович',
                birthday: new Date(1990, 1, 1),
                numCard: '68',
                telephone: '+79961230853',
                email: 'plyto12@gmail.com',
                password: 'pass123',
                confirmPassword: 'pass123'
            }}
                    validateOnBlur
                    onSubmit={(values, action) => {
                        const regData = {
                            name: `${upperFirstLetter(values.secondName)} ${upperFirstLetter(values.name)} ${upperFirstLetter(values.patronymic)}`,
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
                {({values, errors, touched,
                      handleChange, handleBlur,
                      handleSubmit, setFieldValue}) => {

                    return (
                        <ScrollView>
                            <Text style={styles.headerText}>Пожалуйста, заполните ФИО:</Text>
                            <View>
                                <CustomInput type={'text'}
                                             onChangeText={handleChange('secondName')}
                                             onBlur={handleBlur('secondName')}
                                             value={values.secondName}
                                             placeholder={'Фамилия'}

                                />
                                {touched.secondName && errors.secondName &&
                                    <Text style={styles.error}> {errors.secondName}</Text>}
                                <CustomInput type={'text'}
                                             onChangeText={handleChange('name')}
                                             onBlur={handleBlur('name')}
                                             value={values.name}
                                             placeholder={'Имя'}
                                />
                                {touched.name && errors.name && <Text style={styles.error}> {errors.name}</Text>}
                                <CustomInput type={'text'}
                                             onChangeText={handleChange('patronymic')}
                                             onBlur={handleBlur('patronymic')}
                                             value={values.patronymic}
                                             placeholder={'Отчество'}
                                />
                                {touched.patronymic && errors.patronymic &&
                                    <Text style={styles.error}> {errors.patronymic}</Text>}
                                <Text style={styles.headerText}>Дата рождения:</Text>
                                <BirthdayPicker
                                    value={values.birthday}
                                    setValue={(birthday) => setFieldValue('birthday', birthday)}
                                />

                            </View>
                            <Text style={styles.headerText}>Укажите ваш телефон и электронную почту:</Text>
                            <View style={styles.border}>
                                <CustomInput keyboardType={'phone-pad'}
                                             onChangeText={handleChange('telephone')}
                                             onBlur={handleBlur('telephone')}
                                             value={values.telephone}
                                             placeholder={'Телефон'}
                                />
                                {touched.telephone && errors.telephone &&
                                    <Text style={styles.error}> {errors.telephone}</Text>}
                                <CustomInput type={'email-address'}
                                             onChangeText={handleChange('email')}
                                             onBlur={handleBlur('email')}
                                             value={values.email}
                                             placeholder={'Email'}
                                />
                                {touched.email && errors.email && <Text style={styles.error}> {errors.email}</Text>}
                            </View>
                            <Text style={styles.headerText}>Пожалуйста, введите номер вашей амбулаторной карты:</Text>
                            <View>
                                <CustomInput type={'text'}
                                             onChangeText={handleChange('numCard')}
                                             onBlur={handleBlur('numCard')}
                                             value={values.numCard}
                                             placeholder={'Номер амбулаторной карты'}
                                />
                                {touched.numCard && errors.numCard &&
                                    <Text style={styles.error}> {errors.numCard}</Text>}
                            </View>
                            <Text style={styles.headerText}>Придумайте пароль и подтвердите его:</Text>
                            <View>
                                <CustomInput autoCapitalize='none'
                                             onChangeText={handleChange('password')}
                                             onBlur={handleBlur('password')}
                                             value={values.password}
                                             placeholder={'Пароль'}

                                />
                                {touched.password && errors.password &&
                                    <Text style={styles.error}> {errors.password}</Text>}
                                <CustomInput autoCapitalize='none'
                                             onChangeText={handleChange('confirmPassword')}
                                             onBlur={handleBlur('confirmPassword')}
                                             value={values.confirmPassword}
                                             placeholder={'Подтвердите пароль'}

                                />
                                {touched.confirmPassword && errors.confirmPassword &&
                                    <Text style={styles.error}> {errors.confirmPassword}</Text>}
                            </View>
                            <CustomButton
                                disabled={isLoading}
                                onPress={handleSubmit}
                                text={'Зарегистрироваться'}
                            />
                            <ActivityIndicator
                                animating={isLoading}
                                color={'#D58B40'}
                                size={'large'}
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
    error: {
        color: 'red',
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 18,
    },
})

export default FormRegistration;