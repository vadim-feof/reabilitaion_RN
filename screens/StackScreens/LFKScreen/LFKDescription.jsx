import React, {useLayoutEffect} from 'react';
import {STATIC_IMAGE_LFK_URL} from "../../../services/api";
import DeleteButton from "../../../components/Common/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../../components/Common/Buttons/EditButton/EditButton";
import LFK from "../../DrawerScreens/LFK"
import CreateLfkScreen from "../LFKScreen/CreateLFKScreen"
import {ScrollView, StyleSheet, Text} from "react-native";
import FitImage from "react-native-fit-image";

const LfkDescription = ({route, navigation}) => {

    const lfkItem = route.params
    const {title, content, picture} = lfkItem
    const imageUrl = STATIC_IMAGE_LFK_URL + lfkItem.picture

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <>
                    <DeleteButton
                        color={tintColor}
                        navigate={() => navigation.navigate('LFK', {
                                type: 'delete',
                                _id: lfkItem._id
                            }
                        )}
                    />
                    <EditButton
                        color={tintColor}
                        navigate={() => navigation.navigate('CreateLfkScreen', {
                                editingItems: lfkItem,
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
            {picture
                ?
                <FitImage style={styles.photo} source={{uri: imageUrl}}/>
                :
                null
            }
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