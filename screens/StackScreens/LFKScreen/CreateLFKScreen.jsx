import React, {useEffect, useLayoutEffect, useState} from 'react';
import {takePictureFromLibrary} from "../../../utils/takePictureFromLibrary";
import PictureService from "../../../services/PictureService";
import {STATIC_LFK_UPLOAD} from "../../../services/api";
import {toastShow} from "../../../utils/toastShow";
import {Alert, StyleSheet, View} from "react-native";
import BackButton from "../../../components/Common/Buttons/BackButton/BackButton";
import FormAddLFK from "../../../components/Form/FormAddLFk";

const CreateLfkScreen = ({navigation, route}) => {
    const [picture, setPicture] = useState('')
    const [formIsEdit, setFormIsEdit] = useState(false)
    const {isEdit, editingItems} = route.params

    const [isNewPicture, setIsNewPicture] = useState(!Boolean(editingItems?.picture || ''))

    const takePicture = async () => {
        const picture = await takePictureFromLibrary()
        if (!picture.cancelled) {
            const {pictureFilename} = await PictureService.uploadPicture(picture.uri, STATIC_LFK_UPLOAD)
            setPicture(pictureFilename)
            toastShow('success', 'Изображение загружено')
        }
    }

    const deletePicture = async () => {
        // удалить пикчу с сервера если: не режим редактирования или это новая пикча
        if (!isEdit || isNewPicture) {
            console.log('УДАЛЕНИЕ С СЕРВЕРА')
            await PictureService.removePicture(picture, STATIC_LFK_UPLOAD)
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
            setPicture(editingItems.picture)
        }
    }, [route.params])

    const backAction = (e) => {
        if (!formIsEdit && !picture) {
            return
        }
        e.preventDefault()

        Alert.alert(`Отменить ${isEdit ? 'редактирование' : 'создание'} комплекса?`, '', [
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
            <FormAddLFK
                navigation={navigation}
                takePicture={takePicture}
                picture={picture}
                deletePicture={deletePicture}
                isEdit={isEdit}
                editingItems={editingItems}
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
export default CreateLfkScreen;