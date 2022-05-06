import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const MyAccount = () => {
    return (
        <View style={styles.container}>
            <Text>Мой аккаунт</Text>
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
})

export default MyAccount;
