import React from 'react';
import {Formik} from "formik";
import {StyleSheet, Text, View} from "react-native";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import * as yup from "yup";

const FormAddSpecialist = ({navigation, isEdit, editingSpecialist}) => {

    const validationSchema = yup.object().shape(
        {
            name: yup.string().typeError('Должно быть строкой').required('Поажлуйста, ввдедите ФИО специалиста'),
            position: yup.string().typeError('Должно быть строкой').required('Пожалуйста, введите должность'),
            description: yup.string().typeError('Должно быть строкой').required('Пожалуйста, введите описание'),
        }
    )

    const submit = (specialist) => {
        if (isEdit)
            navigation.navigate('Specialists', {
                type: 'edit',
                editedSpecialist: {
                    ...specialist,
                    _id: editingSpecialist._id
                }
            })
        else
            navigation.navigate('Specialists', {
                type: 'add',
                newSpecialist: specialist
            })
    }

    return (
        <View>
            <Formik
                initialValues={{
                    name: isEdit ? editingSpecialist.name : '',
                    position: isEdit ? editingSpecialist.position : '',
                    description: isEdit ? editingSpecialist.description : '',
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
                                     onChangeText={handleChange('name')}
                                     onBlur={handleBlur('name')}
                                     value={values.name}
                                     placeholder={'Введите ФИО специалиста'}

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

export default FormAddSpecialist;