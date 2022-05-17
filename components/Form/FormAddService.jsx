import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Formik} from "formik";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import * as yup from "yup";

const FormAddService = ({navigation, isEdit, editingService}) => {

    const validationSchema = yup.object().shape(
        {
            code: yup.string().typeError('Должно быть строкой').required('Пожалуйста введите код услуги'),
            name: yup.string().typeError('Должно быть строкой').required('Пожалуйста, введите название услуги'),
            price: yup.string().typeError('Должно быть строкой').required('Пожалуйста, введите стоимость услуги'),
        }
    )

    const submit = (service) => {
        if (isEdit)
            navigation.navigate('Services', {
                type: 'edit',
                editedService: {
                    ...service,
                    _id: editingService._id
                }
            })
        else
            navigation.navigate('Services', {
                type: 'add',
                newService: service
            })
    }


    return (
        <View>
            <Formik
                initialValues={{
                    code: isEdit ? editingService.code : '',
                    name: isEdit ? editingService.name : '',
                    price: isEdit ? editingService.price : '',
                }}
                validateOnBlur
                onSubmit={(values) => {
                    submit(values)
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
                                     onChangeText={handleChange('code')}
                                     onBlur={handleBlur('code')}
                                     value={values.code}
                                     placeholder={'Введите код амбулаторной карты'}
                                     multiline

                        />
                        {touched.code && errors.code && <Text style={styles.error}> {errors.code}</Text>}
                        <CustomInput type={'text'}
                                     onChangeText={handleChange('name')}
                                     onBlur={handleBlur('name')}
                                     value={values.name}
                                     placeholder={'Введите название услуги'}
                                     multiline
                        />
                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                        <CustomInput type={'text'}
                                     onChangeText={handleChange('price')}
                                     onBlur={handleBlur('price')}
                                     value={values.price}
                                     placeholder={'Введите стоимость услуги'}
                        />
                        {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}

                        <CustomButton onPress={handleSubmit}>
                            <Text style={styles.text}>{isEdit ? 'Изменить' : 'Добавить'}</Text>
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
})

export default FormAddService;