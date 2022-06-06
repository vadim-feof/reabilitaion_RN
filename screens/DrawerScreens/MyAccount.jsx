import React, {useLayoutEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView} from 'react-native';
import CustomButton from "../../components/Common/CustomButton/CustomButton";
import {useAuth} from "../../context/AuthContext";
import EditButton from "../../components/Common/Buttons/EditButton/EditButton";
import {STATIC_IMAGE_USER_URL} from "../../services/api";
import {takePictureFromLibrary} from "../../utils/takePictureFromLibrary";
import Loader from "../../components/Common/Loader";
import ChangeEmailModal from "../../components/ModalWindows/ChangeEmailModal";
import ChangePassModal from "../../components/ModalWindows/ChangePassModal";

const MyAccount = ({navigation}) => {
    const {user, isLoading, uploadPhoto, removePhoto, logOut} = useAuth()
    const imageUrl = `${STATIC_IMAGE_USER_URL}/${user._id}/${user.photo}`

    const takeAndUploadPicture = async () => {
        const picture = await takePictureFromLibrary()
        if (!picture.cancelled) {
            uploadPhoto(picture)
        }
    }

    const [visibleEmailModal, setVisibleEmailModal] = useState(false)
    const [visiblePassModal, setVisiblePassModal] = useState(false)

    const openCheckRemovePhotoModal = () => {
        Alert.alert(
            'Действительно удалить фотографию?',
            '',
            [
                {
                    text: 'Отмена'
                },
                {
                    text: user.photo ? 'Удалить фотографию' : '',
                    onPress: removePhoto
                }
            ]
        )
    }

    const openChangePhotoModal = () => {
        Alert.alert(
            'Выберите действие',
            '',
            [
                {
                    text: 'Отмена'
                },
                {
                    text: user.photo ? 'Удалить фотографию' : '',
                    onPress: openCheckRemovePhotoModal
                },
                {
                    text: user.photo ? 'Изменить фотографию' : 'Загрузить фотографию',
                    onPress: takeAndUploadPicture
                },
            ]
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <EditButton
                color={tintColor}
                navigate={() => navigation.navigate('EditMyAccountScreen')}
            />
        });
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            {isLoading ? <Loader/> : null}
            <ChangeEmailModal
                visible={visibleEmailModal}
                setVisible={setVisibleEmailModal}
            />
            <ChangePassModal
                visible={visiblePassModal}
                setVisible={setVisiblePassModal}
            />
            <View style={styles.wrapperPhoto}>
                <TouchableOpacity onPress={openChangePhotoModal}>
                    <Image  style={styles.photo} source={user.photo
                        ?
                        {uri: imageUrl}
                        :
                        require('../../assets/userNoPhoto.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {user.name}
                </Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.item}>Телефон:
                    <Text> {user.phone}</Text>
                </Text>
                <Text style={styles.item}>Почта:
                    <Text> {user.email}</Text>
                </Text>
                <Text style={styles.item}>Номер карты:
                    <Text> {user.card}</Text>
                </Text>
                <Text style={styles.item}>Дата рождения:
                    <Text> {new Date(user.birthday).toLocaleDateString('ru')}</Text>
                </Text>
            </View>
            <CustomButton
                disabled={isLoading}
                text={'Сменить электронную почту'}
                onPress={() => setVisibleEmailModal(true)}
            />
            <CustomButton
                disabled={isLoading}
                text={'Сменить пароль'}
                onPress={() => setVisiblePassModal(true)}
            />
            <CustomButton
                disabled={isLoading}
                text={'Выход'}
                onPress={() => {
                    logOut(() => navigation.navigate('News'))
                }}
            />
            <View style={{height: 100}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    name: {
        marginTop: 15,
        fontWeight: 'bold',
        color: '#696969',
        fontSize: 18,
        textAlign: 'center'
    },
    info: {
        marginTop: 15,
        marginLeft: 30,
    },
    item: {
        marginTop: 7,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#696969'
    },
    photo: {
        width: 300,
        height: 300,
        borderRadius: Dimensions.get('window').width / 2,
        marginTop: 20,

    },
    wrapperPhoto: {
        width: '100%',
        height: 400,
        backgroundColor: '#DCDCDC',
        alignItems: "center"
    },
    loader: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 5
    }
})

export default MyAccount;
