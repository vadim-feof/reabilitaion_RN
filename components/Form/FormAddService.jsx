import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Formik} from "formik";
import CustomInput from "../Common/CustomInput/CustomInput";
import CustomButton from "../Common/CustomButton/CustomButton";
import * as yup from "yup";

const FormAddService = ({navigation, isEdit, editingService}) => {

    const validationSchema = yup.object().shape(
        {
            code: yup.string().typeError('Должно быть строкой').required('Пожалуйста введите код услуги'),
            name: yup.string().typeError('Должно быть строкой').required('Пожалуйста, введите название услуги'),
            price: yup.string().typeError('Должно быть строкой').required('Пожалуйста, введите стоимость услуги'),
            description: yup.string().typeError('Должно быть строкой')
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
                    description:  isEdit ? editingService.description : ''
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
                        <CustomInput
                            onChangeText={handleChange('code')}
                            onBlur={handleBlur('code')}
                            value={values.code}
                            placeholder={'Введите код услуги'}
                        />
                        {touched.code && errors.code && <Text style={styles.error}> {errors.code}</Text>}
                        <CustomInput
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            placeholder={'Введите название услуги'}
                        />
                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                        <CustomInput
                            onChangeText={handleChange('price')}
                            onBlur={handleBlur('price')}
                            value={values.price}
                            placeholder={'Введите стоимость услуги'}
                        />
                        {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}
                        <CustomInput
                            multiline={true}
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            placeholder={'Введите описание услуги'}
                        />
                        {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}

                        <CustomButton
                            onPress={handleSubmit}
                            text={isEdit ? 'Изменить' : 'Добавить'}
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
