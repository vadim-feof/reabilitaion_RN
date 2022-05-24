import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import { CollapseBody} from 'accordion-collapse-react-native';


const CustomCollapseBody = (props) => {
    return (
        <CollapseBody>
            <Text style={styles.header}>
                <Text style={styles.text}>{props.children}</Text>
            </Text>
        </CollapseBody>

    );
};

const styles = StyleSheet.create({
    body:{
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        padding: 30,
        backgroundColor: '#fff',
        height: 70,
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }

})

export default CustomCollapseBody;