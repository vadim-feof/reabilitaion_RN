import React, {useState} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import SpecialistList from "../components/SpecialistList/SpecialistList";

const Specialists = ({navigation}) => {
    const [doctors, setDoctors] = useState([
        {name: 'Файрушина Айгуль Наилевна', position: 'Заведующий отделением'},
        {name: 'Самигуллина Алия Ринатовна', position: 'Врач-психотерапевт'},
        {name: 'Кирюхина Марина Васильевна', position: 'Врач-психотерапевт'},
        {name: 'Разумнова Ольга Александровна', position: 'Клинический психолог'},
        {name: 'Сарбаева Ольга Юрьевна', position: 'Клинический психолог'},
        {name: 'Хусаинова Раузалия Фановна', position: 'Врач по лечебной физкультуре'},
        {name: 'Хачатурян Виктория Александровна', position: 'Врач-физиотерапевт'},
        {name: 'Нурмангазиев Руслан Батырович', position: 'Инструктор – методист ЛФК'},
        {name: 'Гарапов Рифнур Рифатович', position: 'Инструктор ЛФК'},
    ])

    return (
        <View style={styles.container}>
            <SpecialistList doctors={doctors} navigation={navigation}/>
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

export default Specialists;
