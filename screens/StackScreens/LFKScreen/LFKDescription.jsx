import React, {useLayoutEffect} from 'react';
import {STATIC_IMAGE_NEWS_URL} from "../../../services/api";
import DeleteButton from "../../../components/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../../components/Buttons/EditButton/EditButton";
import LFK from "../../DrawerScreens/LFK"
import CreateLfkScreen from "../LFKScreen/CreateLFKScreen"
import {ScrollView, StyleSheet, Text} from "react-native";
import FitImage from "react-native-fit-image";
const LfkDescription = ({route, navigation}) => {

    const items = route.params
    const {title, content, picture} = items
    //const imageUrl = STATIC_IMAGE_NEWS_URL + items.picture
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <>
                    <DeleteButton
                        color={tintColor}
                        navigate={() => navigation.navigate('LFK', {
                                type: 'delete',
                                _id: items._id
                            }
                        )}
                    />
                    <EditButton
                        color={tintColor}
                        navigate={() => navigation.navigate('CreateLfkScreen', {
                                editingItems: items,
                                isEdit: true
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
            <Text style={styles.title}>{title}</Text>
          {/*  {picture ? <FitImage style={styles.photo} source={{uri: imageUrl}}/> : null}*/}
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

export default LfkDescription;