import React from 'react';
import {StyleSheet, Text} from "react-native"

const ListEmptyText = ({text}) => {
    return (
        <Text style={styles.text}>
            {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        marginTop: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default ListEmptyText;