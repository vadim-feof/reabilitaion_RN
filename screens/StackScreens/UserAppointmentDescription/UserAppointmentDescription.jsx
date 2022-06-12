import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet, ScrollView} from "react-native";
import {STATIC_IMAGE_USER_URL} from "../../../services/api";
import SpecialistItem from "../../../components/Lists/SpecialistList/SpecialistItem/SpecialistItem";
import ServiceItem from "../../../components/Lists/ServiceList/ServiceItem/ServiceItem";
import {getAppointmentStatus} from "../../../utils/getAppointmentStatus";
import StatusText from "../../../components/Lists/AppointmentList/AppointmentItem/StatusText";
import moment from "moment";


const UserAppointmentDescription = ({route}) => {

    const appointment = route.params
    const {Specialist, Service, User} = appointment

    const imageUrl = `${STATIC_IMAGE_USER_URL}/${User._id}/${User.photo}`
    return (
        <ScrollView>
            <View style={styles.wrapperPhoto}>
                <Image  style={styles.photo} source={User.photo
                    ?
                    {uri: imageUrl}
                    :
                    require('../../../assets/userNoPhoto.png')}
                />
            </View>
            <View style={styles.wrapper}>
                <View style={styles.info}>
                    <Text style={styles.text}>ФИО: {User.name}</Text>
                    <Text style={styles.text} dataDetectorType ='phoneNumber'>Телефон: {User.phone}</Text>
                    <Text style={styles.text} dataDetectorType ='email'>Email: {User.email}</Text>
                    <Text style={styles.text}>Дата рождения: {moment(User.birthday).format('LL')}</Text>
                    <Text style={styles.text}>Номер карты: {User.card}</Text>
                </View>
            </View>

            <SpecialistItem specialist={appointment.Specialist}/>
            <ServiceItem service={appointment.Service}/>

            <View style={styles.info}>
                <Text style={styles.header}>Данные записи</Text>
                <Text style={[styles.text]}>
                    Дата: {moment(appointment.desiredDate).format('LL')}
                </Text>
                <Text style={[styles.text]}>
                    Время: {moment(appointment.desiredTime).format('LT')}
                </Text>
                <Text style={styles.text}>Статус: <StatusText
                    textStyle={styles.text}
                    statusText={appointment.appointmentStatus}
                />
                </Text>
                <Text style={styles.text}>Комментарий: {appointment.comment}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    photo: {
        width: 150,
        height: 150,
        borderRadius: Dimensions.get('window').width / 2,
        marginTop: 20,

    },
    wrapperPhoto: {
        width: '100%',
        height: 200,
        backgroundColor: '#DCDCDC',
        alignItems: "center"
    },
    text: {
        marginTop: 7,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#696969'
    },
    info: {
        marginTop: 15,
        marginLeft: 18,
        marginBottom: 15
    },
    wrapper: {
        flexDirection: "column",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
    },
    header: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
})
export default UserAppointmentDescription;
