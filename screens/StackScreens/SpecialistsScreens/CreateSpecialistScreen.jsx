import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet, View, ScrollView} from 'react-native';
import FormAddSpecialist from "../../../components/Form/FormAddSpecialist";
import {takePictureFromLibrary} from "../../../utils/takePictureFromLibrary";
import PictureService from "../../../services/PictureService";
import {STATIC_SPECIALIST_UPLOAD} from "../../../services/api";
import {toastShow} from "../../../utils/toastShow";
import BackButton from "../../../components/Common/Buttons/BackButton/BackButton";

const CreateSpecialistScreen = ({navigation, route}) => {

    const [picture, setPicture] = useState('')
    const [formIsEdit, setFormIsEdit] = useState(false)
    const {isEdit, editingSpecialist} = route.params
    const [isNewPicture, setIsNewPicture] = useState(!Boolean(editingSpecialist?.photo || ''))

    const takePicture = async () => {
        const picture = await takePictureFromLibrary()
        if (!picture.cancelled) {
            const {pictureFilename} = await PictureService.uploadPicture(picture.uri, STATIC_SPECIALIST_UPLOAD)
            setPicture(pictureFilename)
            toastShow('success', 'Фотография загружена')
        }
    }

    const deletePicture = async () => {
        // удалить пикчу с сервера если: не режим редактирования или это новая пикча
        if (!isEdit || isNewPicture)
            await PictureService.removePicture(picture, STATIC_SPECIALIST_UPLOAD)
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
            setPicture(editingSpecialist.photo)
        }
    }, [route.params])

    const backAction = (e) => {
        if (!formIsEdit && !picture) {
            return
        }
        e.preventDefault()

        Alert.alert(`Отменить ${isEdit ? 'редактирование' : 'создание'} специалиста?`, '', [
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
            <FormAddSpecialist
                navigation={navigation}
                takePicture={takePicture}
                photo={picture}
                deletePicture={deletePicture}
                isEdit={isEdit}
                editingSpecialist={editingSpecialist}
                setFormIsEdit={setFormIsEdit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
    },

})

export default CreateSpecialistScreen;
