import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {Formik} from 'formik'
import * as yup from 'yup'
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import FitImage from "react-native-fit-image";
import {STATIC_IMAGE_NEWS_URL} from "../../services/api";

const FormAddLFK = ({navigation, isEdit, editingItems, takePicture, deletePicture, picture, setFormIsEdit}) => {
    const imageUrl = STATIC_IMAGE_NEWS_URL + picture
    const validationSchema = yup.object().shape(
        {
            title: yup.string().typeError('Должно быть строкой').required('Обязательно для заполнения'),
            content: yup.string().typeError('Должно быть строкой').required('Обязательно для заполнения'),
        }
    )

    const submit = (items) => {
        if (isEdit)
            navigation.navigate('LFK', {
                type: 'edit',
                editedItems: {
                    ...items,
                    _id: editingItems._id,
                    picture
                },
            })
        else
            navigation.navigate('LFK', {
                type: 'add',
                newItems: {...items, picture},
            })
    }

    return (
        <View>
            <Formik
                initialValues={{
                    title: isEdit ? editingItems.title : '',
                    content: isEdit ? editingItems.content : '',
                }}
                validateOnBlur
                onSubmit={(values, action) => {
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
                    }, [dirty]);

                    return (
                        <ScrollView>
                            <CustomInput type={'text'}
                                         onChangeText={handleChange('title')}
                                         onBlur={handleBlur('title')}
                                         value={values.title}
                                         placeholder={'Введите заголовок'}
                                         multiline

                            />
                            {touched.title && errors.title && <Text style={styles.error}> {errors.title}</Text>}
                            <CustomInput type={'text'}
                                         onChangeText={handleChange('content')}
                                         onBlur={handleBlur('content')}
                                         value={values.content}
                                         placeholder={'Введите описание'}
                                         multiline

                            />
                            {touched.content && errors.content && <Text style={styles.error}>{errors.content}</Text>}

                            {
                                picture
                                    ?
                                    <>
                                        <View style={{marginTop: 10}}>
                                            <FitImage source={{uri: imageUrl}}/>
                                        </View>
                                        <CustomButton
                                            onPress={deletePicture}
                                            text={'Удалить изображение'}
                                        />
                                    </>
                                    :
                                    <CustomButton
                                        onPress={takePicture}
                                        text={'Добавить изображение'}
                                    />
                            }

                            <CustomButton
                                onPress={handleSubmit}
                                text={isEdit ? 'Изменить' : 'Опубликовать'}
                            />
                        </ScrollView>
                    )
                }}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    textAdd: {
        margin: 10
    },
    error: {
        color: 'red',
        marginLeft: 10,
        marginTop: 5
    }
})

export default FormAddLFK;