import React from 'react';
import {Formik} from "formik";
import {StyleSheet, Text, View} from "react-native";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import * as yup from "yup";

const FormAddSpecialist = ({navigation}) => {

    const validationSchema = yup.object().shape(
        {
            name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            position: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            description: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        }
    )

    const addSpecialist = (newSpecialist) => {
        navigation.navigate('Specialists', {newSpecialist})
    }

    return (
        <View>
            <Formik
                initialValues={{
                    name: '',
                    position: '',
                    description: '',

                }}
                validateOnBlur
                onSubmit={(values) => {
                    addSpecialist(values)
                }}
                validationSchema={validationSchema}
            >
                {({
                      values, errors, touched,
                      handleChange, handleBlur,
                      handleSubmit,
                  }) => (
                    <View>
                        <CustomInput type={'text'}
                                     onChangeText={handleChange('name')}
                                     onBlur={handleBlur('name')}
                                     value={values.name}
                                     placeholder={'Введите имя ФИО специалиста'}

                        />
                        {touched.name && errors.name && <Text style={styles.error}> {errors.name}</Text>}
                        <CustomInput type={'text'}
                                     onChangeText={handleChange('position')}
                                     onBlur={handleBlur('position')}
                                     value={values.position}
                                     placeholder={'Введите должность'}
                        />
                        {touched.position && errors.position && <Text style={styles.error}>{errors.position}</Text>}
                        <CustomInput type={'text'}
                                     onChangeText={handleChange('description')}
                                     onBlur={handleBlur('description')}
                                     value={values.description}
                                     placeholder={'Введите описание специалиста'}
                        />
                        {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}
                        <CustomButton>
                            <Text style={styles.text}>Добавить фото</Text>
                        </CustomButton>


                        <CustomButton onPress={handleSubmit}>
                            <Text style={styles.text}>Добавить</Text>
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
    img: {
        width: 70,
        height: 70,
        margin: 10
    },

    error: {
        color: 'red',
        marginLeft: 10,
        marginTop: 5
    },
})

export default FormAddSpecialist;