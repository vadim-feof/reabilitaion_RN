import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from "react-native";
import DeleteButton from "../../../components/Common/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../../components/Common/Buttons/EditButton/EditButton";
import {useAuth} from "../../../context/AuthContext";
import {checkAdminRole} from "../../../utils/checkAdminRole";

const ServiceDescriptionScreen = ({navigation, route}) => {

    const service = route.params
    const {code, name, price, description} = service

    const {user} = useAuth()

    useLayoutEffect(() => {
        if (checkAdminRole(user.roles)) {
            navigation.setOptions({
                headerRight: ({tintColor}) => (
                    <>
                        <DeleteButton
                            color={tintColor}
                            navigate={() => navigation.navigate('Services', {
                                type: 'delete',
                                _id: route.params._id
                            })}
                        />
                        <EditButton
                            color={tintColor}
                            navigate={() => navigation.navigate('UpdateServiceScreen', {
                                    editingService: service
                                }
                            )}
                        />
                    </>
                )
            });
        }
        else {
            navigation.setOptions({
                headerRight: null
            });
        }
    }, [navigation, user.roles]);

    return (
            <View style={styles.description}>
                <Text style={styles.code}>{code}</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.price}>{description}</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    description: {
        alignItems: "flex-start",
        flexShrink: 1,
        justifyContent: 'space-around',
        padding: 10
    },
    code: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        fontSize: 18,
        padding: 5,

    },
    name: {
        fontWeight: 'bold',
        flexWrap: 'wrap',
        fontSize: 18,
        padding: 5,
    },
    price: {
        flexWrap: 'wrap',
        fontSize: 18,
        padding: 5,
    }
})

export default ServiceDescriptionScreen;