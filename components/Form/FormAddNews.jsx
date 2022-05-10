import React from 'react';
import {StyleSheet, TextInput, View, Button, Text, TouchableOpacity, Image} from "react-native";
import {Formik} from 'formik'
import * as yup from 'yup'

const FormAddNews = () => {
    const validationSchema = yup.object().shape(
        {
            title: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            full: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            data: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        }
    )

    return (
        <View>
            <Formik initialValues={{
                title: '',
                full: '',
                data: '',
            }}
                    validateOnBlur
                    onSubmit={(values, action) => {
                        /*addNews(values) ДОДЕЛАТЬ ПОЛУЧЕНИ ФУНКЦИИ ДОБАЛЕНИЯ НОВОСТИ*/
                        action.resetForm() /*чистка формы*/

                    }}
                    validationSchema={validationSchema}
            >
                {({values, errors, touched,
                      handleChange, handleBlur,
                       handleSubmit, }) => (
                    <View>
                        <TextInput type={'text'}
                                   onChangeText={handleChange('title')}
                                   onBlur={handleBlur('title')}
                                   value={values.title}
                                   placeholder={'Введите название новости'}
                                   multiline
                                   style={styles.input}

                        />
                        {touched.title && errors.title && <Text style={styles.error}> {errors.title}</Text>}
                        <TextInput  type={'text'}
                                    onChangeText={handleChange('full')}
                                    onBlur={handleBlur('full')}
                                    value={values.full}
                                    placeholder={'Введите описание новости'}
                                    multiline
                                    style={styles.input}

                        />
                        {touched.full && errors.full && <Text style={styles.error}> {errors.full}</Text>}
                        <TextInput  type={'text'}
                                    onChangeText={handleChange('data')}
                                    onBlur={handleBlur('data')}
                                    value={values.data}
                                    placeholder={'Введите дату'}
                                    multiline
                                    style={styles.input}
                        />
                        {touched.data && errors.data && <Text style={styles.error}> {errors.data}</Text>}

                        <Text style={styles.textAdd}> Добавить картинку </Text>

                        <Image style={styles.img} source={require('../../assets/addNews.png')}/>
                        <View style={styles.btn}>
                            <TouchableOpacity onPress={handleSubmit}>
                                <Text style={styles.text}> Добавить </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginTop: 15,
        padding: 15,
        borderColor: 'silver',
        borderRadius: 5,
        marginHorizontal: 12
    },
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
    img: {
        width: 70,
        height: 70,
        margin: 10
    },
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