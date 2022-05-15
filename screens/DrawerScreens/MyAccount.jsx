import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const MyAccount = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text>123123вфывфыв</Text>
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

    }
})

export default MyAccount;
