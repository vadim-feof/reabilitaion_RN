import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from "react-native";
import FitImage from "react-native-fit-image";
import AddButton from "../components/Buttons/AddButton/AddButton";
import DeleteButton from "../components/Buttons/DeleteButton/DeleteButton";
import {useNews} from "../context/NewsContext";

const NewsDescription = ({route, navigation}) => {


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <DeleteButton
                color={tintColor}
                navigate={() => navigation.navigate('News', {_id: route.params._id} )}

            />
        });
    }, [navigation]);



    const {title, content, date, picture} = route.params
    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <Text style={styles.date}>{new Date(date).toLocaleDateString('ru')}</Text>
            <Text style={styles.title}>{title}</Text>
            {picture && <FitImage style={styles.photo} source={{uri: picture}}/>}
            <Text style={styles.content}>{content}</Text>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingBottom: 20
    },
    date: {
        color: '#D58B40',
        fontSize: 18,
        marginTop: 5,
        fontWeight: 'bold'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 15,
    },
    photo: {
        marginTop: 15,
    },
    content: {
        marginTop: 10,
        lineHeight: 26,
        fontSize: 20,
    }
})

export default NewsDescription;