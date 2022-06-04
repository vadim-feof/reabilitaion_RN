import React, {useState} from 'react';
import FilterButton from "../Common/Buttons/FilterButton/FilterButton";
import {Menu, MenuItem} from "react-native-material-menu";

const FilterAppointmentMenu = ({visible, setVisible, setFilter, color}) => {


    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    const onPressMenuItem = (filter) => {
        setFilter(filter)
        hideMenu()
    }

    return (
        <Menu
            visible={visible}
            anchor={<FilterButton onPress={showMenu} color={color}/>}
            onRequestClose={hideMenu}
        >
            <MenuItem onPress={() => onPressMenuItem('')}>Все записи</MenuItem>
            <MenuItem onPress={() => onPressMenuItem('process')}>На рассмотрении</MenuItem>
            <MenuItem onPress={() => onPressMenuItem('viewed')}>Рассмотренные</MenuItem>
            <MenuItem onPress={() => onPressMenuItem('cancelled')}>Отмененные</MenuItem>
        </Menu>
    );
};

export default FilterAppointmentMenu;
