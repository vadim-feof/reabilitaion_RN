import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import ServiceList from "../../components/Service/ServiceList";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import {useSpecialist} from "../../context/SpecialistContext";
import {toastShow} from "../../utils/toastShow";

const Services = ({navigation, route}) => {

    const [service, setService] = useState([
        {
        code: 'Код н.н: A13.29.006.003',
        name: 'Семейное клинико-психологическое консультирование',
        price: 'Стоимость: 2100 руб'
    },
        {
            code: 'Код н.н: A13.29.006',
            name: 'Клинико-психологическое консультирование',
            price: 'Стоимость: 1050 руб.'
        },
        {
            code: 'Код н.н: A13.29.008.001',
            name: 'Индивидуальная психотерапия',
            price: 'Стоимость: 1600 руб.'
        },
        {
            code: 'Код н.н: A13.29.006',
            name: 'Клинико-психологическое консультирование',
            price: 'Стоимость: 1050 руб.'
        },
        {
            code: 'Код н.н: A13.29.006',
            name: 'Клинико-психологическое консультирование',
            price: 'Стоимость: 1050 руб.'
        },
        {
            code: 'Код н.н: A13.29.006',
            name: 'Клинико-психологическое консультирование',
            price: 'Стоимость: 1050 руб.'
        },
        {
            code: 'Код н.н: A13.29.006',
            name: 'Клинико-психологическое консультирование',
            price: 'Стоимость: 1050 руб.'
        },

    ])

       // const {элементы ..} = useSpecialist()

    /*useEffect(async () => {
       ЗАПРОС ФЕЧ
    }, [])*/

    /*useEffect(async () => {
        const type = route.params?.type
        console.log(type)
        if (type)
            switch (type) {
                case 'add':
                    if (route.params.newService)
                        //ЗАПРОС
                        setService(route.params.newService)
                    break
                case 'edit':
                    if (route.params.editedService)
                        //ЗАПРОС
                    break
                case 'delete':
                    if (route.params._id)
                        //ЗАПРОС
                    break
                default:
                    toastShow('error', 'Произошла ошибка', 'Неизвестная операция')
            }
    }, [route.params])*/

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <AddButton
                color={tintColor}
                navigate={() => navigation.navigate('CreateServiceScreen')}
            />
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ServiceList
                service={service}
                navigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: '#fff'
    }
})

export default Services;