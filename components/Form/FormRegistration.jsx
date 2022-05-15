import React from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {Formik} from "formik";
import CustomInput from "../CustomInput/CustomInput";
import * as yup from 'yup'
import CustomButton from "../CustomButton/CustomButton";

const FormRegistration = () => {

    const validationSchema = yup.object().shape(
        {
            secondName: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            patronymic: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            numCard: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            telephone: yup.number().typeError('Должно быть число').required('Обязательно'),
            email: yup.string().email('Введите верный email').required('Обязательно'),
            password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
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
                        <CustomInput type={'text'}
                                     onChangeText={handleChange('numCard')}
                                     onBlur={handleBlur('numCard')}
                                     value={values.numCard}
                                     placeholder={'Номер амбулаторной карты'}
                        />
                        {touched.numCard && errors.numCard && <Text style={styles.error}> {errors.numCard}</Text>}
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

                        <CustomButton onPress={handleSubmit}>
                            <Text style={styles.text}>Зарегистрироваться</Text>
                        </CustomButton>
                    </ScrollView>
                )}

            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: '80%',
        height: 50,
        marginHorizontal: '10%',
        backgroundColor: '#D58B40',
        borderRadius: 5,
        marginTop: 20
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
    }
})

export default FormRegistration;