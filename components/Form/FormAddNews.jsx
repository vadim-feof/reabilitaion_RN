import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {Formik} from 'formik'
import * as yup from 'yup'
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import FitImage from "react-native-fit-image";
import {STATIC_IMAGE_NEWS_URL} from "../../services/api";

const FormAddNews = ({navigation, isEdit, editingNews, takePicture, deletePicture, picture, setFormIsEdit}) => {
    const imageUrl = STATIC_IMAGE_NEWS_URL + picture
    const validationSchema = yup.object().shape(
        {
            title: yup.string().typeError('Должно быть строкой').required('Обязательно для заполнения'),
            content: yup.string().typeError('Должно быть строкой').required('Обязательно для заполнения'),
        }
    )

    const submit = (news) => {
        if (isEdit)
            navigation.navigate('News', {
                type: 'edit',
                editedNews: {
                    ...news,
                    _id: editingNews._id,
                    picture
                },
            })
        else
            navigation.navigate('News', {
                type: 'add',
                newNews: {...news, picture},
            })
    }

    return (
        <View>
            <Formik
                initialValues={{
                    title: isEdit ? editingNews.title : '',
                    content: isEdit ? editingNews.content : '',
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
                                         placeholder={'Введите заголовок новости'}
                                         multiline

                            />
                            {touched.title && errors.title && <Text style={styles.error}> {errors.title}</Text>}
                            <CustomInput type={'text'}
                                         onChangeText={handleChange('content')}
                                         onBlur={handleBlur('content')}
                                         value={values.content}
                                         placeholder={'Введите описание новости'}
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
                                text={isEdit ? 'Изменить новость' : 'Опубликовать новость'}
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

export default FormAddNews;