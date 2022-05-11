import React from 'react';
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from "react-native";
import {Formik} from 'formik'
import * as yup from 'yup'

const FormAddNews = ({navigation}) => {

    const validationSchema = yup.object().shape(
        {
            title: yup.string().typeError('Должно быть строкой').required('Обязательно'),
            content: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        }
    )

    const addNews = (newNews) => {
        navigation.navigate('News', {newNews})
    }

    return (
        <View>
            <Formik
                initialValues={{
                    title: '',
                    content: '',
                }}
                validateOnBlur
                onSubmit={(values, action) => {
                    addNews(values)
                }}
                validationSchema={validationSchema}
            >
                {({
                      values, errors, touched,
                      handleChange, handleBlur,
                      handleSubmit,
                  }) => (
                    <View>
                        <TextInput type={'text'}
                                   onChangeText={handleChange('title')}
                                   onBlur={handleBlur('title')}
                                   value={values.title}
                                   placeholder={'Введите заголовок новости'}
                                   multiline
                                   style={styles.input}
                        />
                        {touched.title && errors.title && <Text style={styles.error}> {errors.title}</Text>}
                        <TextInput type={'text'}
                                   onChangeText={handleChange('content')}
                                   onBlur={handleBlur('content')}
                                   value={values.content}
                                   placeholder={'Введите текст новости'}
                                   multiline
                                   style={styles.input}
                        />
                        {touched.content && errors.content && <Text style={styles.error}>{errors.content}</Text>}

                        <Text style={styles.textAdd}> Добавить картинку </Text>

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