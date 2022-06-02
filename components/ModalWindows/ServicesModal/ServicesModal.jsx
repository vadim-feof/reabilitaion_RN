import React from 'react';
import {Modal, Text} from "react-native";
import CustomButton from "../../Common/CustomButton/CustomButton";
import ServiceList from "../../Lists/ServiceList/ServiceList";

const ServicesModal = ({services, onPressItem, visible, closeModal, isLoading, refresh}) => {

    return (
        <Modal
            visible={visible}
            transparent={false}
        >
            <Text>Выберите услугу:</Text>
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

export default ServicesModal;