import React, {useState} from 'react';

import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const MyAccount = () => {
    const [info, setInfo ] = useState(
        {name:'Прощекальникова Геля Дмитриевна', phone: '89111111111', email: 'text@mail.ru',
            birthday: '10.08.2000', card: '123456789009876'}
    )


    return (
        <View style={styles.container}>
            <View style={styles.wrapperPhoto}>
                <Image  style={styles.photo} source={require('../../assets/Angelina.jpg')}/>
                <Text style={styles.name}> {info.name} </Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.item}>Телефон:
                    <Text> {info.phone}</Text>
                </Text>
                <Text style={styles.item}>Почта:
                    <Text> {info.email}</Text>
                </Text>
                <Text style={styles.item}>Номер карты:
                    <Text> {info.card}</Text>
                </Text>
                <Text style={styles.item}>День рождения:
                    <Text> {info.birthday}</Text>
                </Text>
            </View>
        </View>
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
        fontSize: 18
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
    }
})

export default MyAccount;
