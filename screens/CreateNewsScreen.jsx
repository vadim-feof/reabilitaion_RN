import React from 'react';
import {View} from "react-native";
import FormAddNews from "../components/Form/FormAddNews";

const CreateNewsScreen = ({navigation}) => {

    return (
        <View>
            <FormAddNews navigation={navigation}/>
        </View>
    );
};

export default CreateNewsScreen;