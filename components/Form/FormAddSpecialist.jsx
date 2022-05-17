import React, {useEffect} from 'react';
import {Formik} from "formik";
import {StyleSheet, Text, View, ScrollView} from "react-native";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import * as yup from "yup";
import {STATIC_IMAGE_SPECIALIST_URL} from "../../services/api";
import FitImage from "react-native-fit-image";

const FormAddSpecialist = ({navigation, isEdit, editingSpecialist, takePicture, deletePicture, photo, setFormIsEdit}) => {
    const imageUrl = STATIC_IMAGE_SPECIALIST_URL + photo
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
                    _id: editingSpecialist._id,
                    photo
                }
            })
        else
            navigation.navigate('Specialists', {
                type: 'add',
                newSpecialist: {...specialist, photo}
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
                      values, errors, touched, dirty,
                      handleChange, handleBlur,
                      handleSubmit,
                  }) => {
                    useEffect(() => {
                        if (dirty)
                            setFormIsEdit(true)
                    }, [dirty])
                    return (
                        <ScrollView>
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
                            {touched.description && errors.description &&
                                <Text style={styles.error}>{errors.description}</Text>}
                            {
                                photo
                                    ?
                                    <>
                                        <View style={{marginTop: 10}}>
                                            <FitImage source={{uri: imageUrl}}/>
                                        </View>
                                        <CustomButton
                                            onPress={deletePicture}
                                            text={'Удалить фотографию'}
                                        />
                                    </>
                                    :
                                    <CustomButton
                                        onPress={takePicture}
                                        text={'Добавить фотографию'}
                                    />
                            }

                            <CustomButton
                                onPress={handleSubmit}
                                text={isEdit ? 'Изменить специалиста' : 'Добавить специалиста'}
                            />
                        </ScrollView>
                    )
                }}
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