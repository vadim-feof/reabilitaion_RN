import React, {useState} from 'react';
import * as yup from 'yup'
import {Formik} from "formik";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CheckBox from 'expo-checkbox';
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";

const FormLogin = () => {
    const validationSchema = yup.object().shape(
        {
            telephone: yup.number().typeError('Введите верный номер телефона').required('Пожалуйста, укажите телефон'),
            email: yup.string().email('Введите верный email').required('Пожалуйста, укажите вашу элекронную почту '),
            password: yup.string().typeError('Должно быть строкой').required('Укажите пароль'),
        }
    )

    const [isSelected, setSelection] = useState(false)

    return (
        <View>
            <Formik initialValues={{
                telephone: '',
                email: '',
                password: '',
            }}
                validateOnBlur
                onSubmit={(values, action) => {
                    /*ФУНКЦИЯ ДОБАВЛЕНИЯ АВТОРИЗАЦИИ*/
                    action.resetForm() /*чистка формы*/

                }}
                validationSchema={validationSchema}
            >
                {({
                      values, errors, touched,
                      handleChange, handleBlur,
                      handleSubmit,
                  }) => (
                    <View>
                        {
                            isSelected
                                ?
                                <>
                                    <CustomInput keyboardType={'email-address'}
                                                 onChangeText={handleChange('email')}
                                                 onBlur={handleBlur('email')}
                                                 value={values.email}
                                                 placeholder={'Email'}
                                    />
                                    {touched.email && errors.email && <Text style={styles.error}> {errors.email}</Text>}
                                </>
                                :
                                <>
                                    <CustomInput keyboardType={'phone-pad'}
                                                 onChangeText={handleChange('telephone')}
                                                 onBlur={handleBlur('telephone')}
                                                 value={values.telephone}
                                                 placeholder={'Телефон'}
                                    />
                                    {touched.telephone && errors.telephone && <Text style={styles.error}> {errors.telephone}</Text>}
                                </>
                        }

                        <CustomInput secureTextEntry={true}
                                     onChangeText={handleChange('password')}
                                     onBlur={handleBlur('password')}
                                     value={values.password}
                                     placeholder={'Пароль'}

                        />
                        {touched.password && errors.password && <Text style={styles.error}> {errors.password}</Text>}

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Войти с помощью электронной почты</Text>
                        </View>
                        <CustomButton onPress={handleSubmit}>
                            <Text style={styles.text}>Войти</Text>
                        </CustomButton>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
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
        marginLeft: 5
    }
})

export default FormLogin;