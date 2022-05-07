import React from 'react';
import {StyleSheet, TextInput, View, Button, Text, TouchableOpacity} from "react-native";
import {Formik} from 'formik'

const FormAddNews = () => {
    return (
        <View>
            <Formik initialValues={{
                title: '', full: '', data: '', img: ''
            }}
                    onSubmit={(values, action) => {
                        /*addNews(values) ДОДЕЛАТЬ ПОЛУЧЕНИ ФУНКЦИИ ДОБАЛЕНИЯ НОВОСТИ*/
                        action.resetForm() /*чистка формы*/
            }}>
                {(props) => (
                    <View>
                        <TextInput value={props.values.title}
                                   placeholder={'Введите название новости'}
                                   onChangeText={props.handleChange('title')}
                                   multiline
                                   style={styles.input}

                        />
                        <TextInput value={props.values.full}
                                   placeholder={'Введите описание новости'}
                                   onChangeText={props.handleChange('full')}
                                   multiline
                                   style={styles.input}

                        />
                        <TextInput value={props.values.data}
                                   placeholder={'Введите дату'}
                                   onChangeText={props.handleChange('full')}
                                   multiline
                                   style={styles.input}

                        />
                        <TextInput value={props.values.img}
                                   placeholder={'Укажите фото'}
                                   onChangeText={props.handleChange('img')}
                                   style={styles.input}

                        />
                        <View style={styles.btn}>
                            <TouchableOpacity onPress={props.handleSubmit}>
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
    }
})

export default FormAddNews;