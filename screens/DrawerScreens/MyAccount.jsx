import React from 'react';

import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const MyAccount = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image  style={styles.photo} source={require('../../assets/Angelina.jpg')}/>
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
    photo: {
        width: 300,
        height: 300,
        borderRadius: Dimensions.get('window').width / 2,
    }
})

export default MyAccount;
