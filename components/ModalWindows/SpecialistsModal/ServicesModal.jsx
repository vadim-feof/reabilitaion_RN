import React from 'react';
import {Modal, Text, StyleSheet} from "react-native";
import CustomButton from "../../Common/CustomButton/CustomButton";
import SpecialistList from "../../Lists/SpecialistList/SpecialistList";

const SpecialistsModal = ({specialists, onPressItem, visible, closeModal, isLoading, refresh}) => {

    return (
        <Modal
            visible={visible}
            transparent={false}
            animationType={'fade'}
        >
            {specialists.length === 0
                ?
                <Text style={styles.text}>
                    Специалисты, предоставляющие данную услугу не найдены{"\n\n"}
                    Выберите другую услугу
                </Text>
                :
                <Text style={styles.text}>Выберите специалиста:</Text>
            }
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

const styles = StyleSheet.create({
    text: {
        padding: 15,
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default SpecialistsModal;