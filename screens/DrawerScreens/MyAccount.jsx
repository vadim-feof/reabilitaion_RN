import React from 'react';

import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const MyAccount = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperPhoto}>
                <Image  style={styles.photo} source={require('../../assets/Angelina.jpg')}/>
                <Text style={styles.name}> Прощекальникова Геля Дмитриевна</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.item}>Телефон:</Text>
                <Text style={styles.item}>Почта:</Text>
                <Text style={styles.item}>Номер карты:</Text>
                <Text style={styles.item}>День рождения:</Text>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    name: {
        marginTop: 15,
        fontWeight: 'bold',
        color: '#696969',
        fontSize: 18
    },
    /*info: {
        flexDirection: 'column',
        marginTop: 15,
        display: 'flex',
        justifyContent: "start" /!*НЕ РАБОТАЕТ*!/
    },*/
    item: {
        marginTop: 7
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
    }
})

export default MyAccount;
