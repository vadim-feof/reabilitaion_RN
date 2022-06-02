import React from 'react';
import {Modal, StyleSheet, Text} from "react-native";
import CustomButton from "../../CustomButton/CustomButton";
import ServiceList from "../../Service/ServiceList";

const ServicesModal = ({services, onPressItem, visible, closeModal, isLoading, refresh}) => {

    return (
        <Modal
            visible={visible}
            transparent={false}
        >
            <Text style={styles.header}>Выберите услугу:</Text>
            <ServiceList
                services={services}
                onPressItem={(service) => onPressItem(service)}
                isLoading={isLoading}
                refresh={refresh}
            />
            <CustomButton
                text={'Отменить выбор'}
                onPress={closeModal}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: "center",
        marginVertical: 15
    },
})

export default ServicesModal;