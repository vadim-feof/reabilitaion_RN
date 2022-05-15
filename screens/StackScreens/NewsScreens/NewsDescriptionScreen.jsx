import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, ScrollView} from "react-native";
import FitImage from "react-native-fit-image";
import DeleteButton from "../../../components/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../../components/Buttons/EditButton/EditButton";

const NewsDescriptionScreen = ({route, navigation}) => {

    const news = route.params
    const {title, content, date, picture} = news

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <>
                    <DeleteButton
                        color={tintColor}
                        navigate={() => navigation.navigate('News', {
                                type: 'delete',
                                _id: news._id
                            }
                        )}
                    />
                    <EditButton
                        color={tintColor}
                        navigate={() => navigation.navigate('UpdateNewsScreen', {
                                editingNews: news
                            }
                        )}
                    />
                </>
            )
        });
    }, [navigation]);



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

export default NewsDescriptionScreen;