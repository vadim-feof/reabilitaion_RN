import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet, View, Text} from "react-native";
import FormAddNews from "../../../components/Form/FormAddNews";
import PictureService from "../../../services/PictureService";
import {toastShow} from "../../../utils/toastShow";
import BackButton from "../../../components/Buttons/BackButton/BackButton";
import {STATIC_NEWS_UPLOAD} from "../../../services/api";
import {takePictureFromLibrary} from "../../../utils/takePictureFromLibrary";

const CreateNewsScreen = ({navigation, route}) => {

    const [picture, setPicture] = useState('')
    const [formIsEdit, setFormIsEdit] = useState(false)
    const {isEdit, editingNews} = route.params

    const [isNewPicture, setIsNewPicture] = useState(!Boolean(editingNews?.picture || ''))

    const takePicture = async () => {
        const picture = await takePictureFromLibrary()
        if (!picture.cancelled) {
            const {pictureFilename} = await PictureService.uploadPicture(picture.uri, STATIC_NEWS_UPLOAD)
            setPicture(pictureFilename)
            toastShow('success', 'Изображение загружено')
        }
    }

    const deletePicture = async () => {
        // удалить пикчу с сервера если: не режим редактирования или это новая пикча
        if (!isEdit || isNewPicture) {
            console.log('УДАЛЕНИЕ С СЕРВЕРА')
            await PictureService.removePicture(picture, STATIC_NEWS_UPLOAD)
        }
        setPicture('')
        setIsNewPicture(true)
        toastShow('success', 'Изображение удалено')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: ({tintColor}) => (
                <View style={{marginRight: 10}}>
                    <BackButton
                        color={tintColor}
                        navigate={() => {navigation.goBack()}}
                    />
                </View>)
        })
    }, [navigation])

    useEffect(() => {
        navigation.addListener('beforeRemove', backAction)
        return () => {
            navigation.removeListener('beforeRemove', backAction)
        }

    }, [navigation, formIsEdit, picture])

    useEffect(() => {
        if (isEdit) {
            setPicture(editingNews.picture)
        }
    }, [route.params])

    const backAction = (e) => {
        if (!formIsEdit && !picture) {
            return
        }
        e.preventDefault()

        Alert.alert(`Отменить ${isEdit ? 'редактирование' : 'создание'} новости?`, '', [
            {text: 'Да', style: 'destructive', onPress: async () => {
                    // при закрытии окна создания
                    // если пикча была добавлена -> удалить пикчу
                    if (!isEdit && picture)
                        await deletePicture()
                    // при закрытии окна редактирования
                    // если пикча была добавлена и это первая пикча -> удалить пикчу
                    if (isEdit && picture && isNewPicture)
                        await deletePicture()

                    navigation.dispatch(e.data.action)
                }},
            {text: 'Остаться', style: 'cancel', onPress: () => {}},
        ])
    }

    return (
        <View style={styles.container}>
            <FormAddNews
                navigation={navigation}
                takePicture={takePicture}
                picture={picture}
                deletePicture={deletePicture}
                isEdit={isEdit}
                editingNews={editingNews}
                setFormIsEdit={setFormIsEdit}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start"
    },

})

export default CreateNewsScreen;