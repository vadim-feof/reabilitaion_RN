import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import {Formik} from "formik";
import CustomInput from "../CustomInput/CustomInput";
import * as yup from 'yup'
import CustomButton from "../CustomButton/CustomButton";

const FormRegistration = () => {
    const validationSchema = yup.object().shape(
        {
            secondName: yup.string().typeError('Имя должно быть строкой').required('Пожалуйста, укажите фамилию'),
            name: yup.string().typeError('Фамилия должна быть строкой').required('Пожалуйста, укажите имя'),
            patronymic: yup.string().typeError('Отчество должно быть строкой').required('Пожалуйста, укажите отчество'),

            numCard: yup.string().typeError('Номер карты должен быть в виде строки').required('Пожалуйста, укажите номер амбулаторной карты'),

            telephone: yup.number().typeError('Телефон должен состоять из цифр').required('Пожалуйста, введите ваш телефон'),
            email: yup.string().email('Введите верный email').required('Пожалуйста, введите вашу элеутронную почту'),

            password: yup.string().typeError('Пароль должнен быть строкой').required('Пожалуйста, введите пароль'),
            confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),
        }
    )

    return (
        <View>
            <Formik initialValues={{
                secondName: '',
                name: '',
                patronymic: '',
                numCard: '',
                telephone: '',
                email: '',
                password: '',
                confirmPassword: ''

            }}
                    validateOnBlur
                    onSubmit={(values, action) => {
                        /*ФУНКЦИЯ ДОБАВЛЕНИЯ РЕГИСТРАЦИИ*/
                        action.resetForm() /*чистка формы*/

                    }}
                    validationSchema={validationSchema}
            >
                {({values, errors, touched,
                      handleChange, handleBlur,
                      handleSubmit, }) => (
                    <ScrollView>
                        <Text style={styles.headerText}>Пожалуйста, заполните все поля!</Text>
                        <View>
                            <CustomInput type={'text'}
                                         onChangeText={handleChange('secondName')}
                                         onBlur={handleBlur('secondName')}
                                         value={values.secondName}
                                         placeholder={'Фамилия'}

                            />
                            {touched.secondName && errors.secondName && <Text style={styles.error}> {errors.secondName}</Text>}
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
                            {touched.patronymic && errors.patronymic && <Text style={styles.error}> {errors.patronymic}</Text>}
                        </View>
                        <Text style={styles.headerText}>Укажите ваш телефоон и электронную почту:</Text>
                        <View style={styles.border}>
                            <CustomInput keyboardType={'number-pad'}
                                         onChangeText={handleChange('telephone')}
                                         onBlur={handleBlur('telephone')}
                                         value={values.telephone}
                                         placeholder={'Телефон'}
                            />
                            {touched.telephone && errors.telephone && <Text style={styles.error}> {errors.telephone}</Text>}
                            <CustomInput type={'email-address'}
                                         onChangeText={handleChange('email')}
                                         onBlur={handleBlur('email')}
                                         value={values.email}
                                         placeholder={'Email'}
                            />
                            {touched.email && errors.email && <Text style={styles.error}> {errors.email}</Text>}
                        </View>
                        <Text style={styles.headerText}>Пожалуйста, введите номер вашей амбулатоной карты:</Text>
                        <View>
                            <CustomInput type={'text'}
                                         onChangeText={handleChange('numCard')}
                                         onBlur={handleBlur('numCard')}
                                         value={values.numCard}
                                         placeholder={'Номер амбулаторной карты'}
                            />
                            {touched.numCard && errors.numCard && <Text style={styles.error}> {errors.numCard}</Text>}
                        </View>
                        <Text style={styles.headerText}>Пожалуйста, придумайте пароль потвердите его:</Text>
                        <View>
                            <CustomInput secureTextEntry={true}
                                         onChangeText={handleChange('password')}
                                         onBlur={handleBlur('password')}
                                         value={values.password}
                                         placeholder={'Пароль'}

                            />
                            {touched.password && errors.password && <Text style={styles.error}> {errors.password}</Text>}
                            <CustomInput secureTextEntry={true}
                                         onChangeText={handleChange('confirmPassword')}
                                         onBlur={handleBlur('confirmPassword')}
                                         value={values.confirmPassword}
                                         placeholder={'Подтвердите пароль'}

                            />
                            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}> {errors.confirmPassword}</Text>}
                        </View>

                            <CustomButton onPress={handleSubmit}>
                                <Text style={styles.text}>Зарегестрироваться</Text>
                            </CustomButton>
                    </ScrollView>
                )}

            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 10,
        color: '#CD853F',
        fontWeight: 'bold',
        marginHorizontal: 8,
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
        marginTop: 5
    },
})

export default FormRegistration;