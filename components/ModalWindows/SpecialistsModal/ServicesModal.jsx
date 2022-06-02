import React from 'react';
import {Modal, Text} from "react-native";
import CustomButton from "../../Common/CustomButton/CustomButton";
import SpecialistList from "../../Lists/SpecialistList/SpecialistList";

const SpecialistsModal = ({specialists, onPressItem, visible, closeModal, isLoading, refresh}) => {

    return (
        <Modal
            visible={visible}
            transparent={false}
        >
            <Text>Выберите специалиста:</Text>
            <SpecialistList
                specialists={specialists}
                onPressItem={(specialist) => onPressItem(specialist)}
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

export default SpecialistsModal;