import React from 'react';
import {Text, View} from "react-native";
import FormAddNews from "../components/Form/FormAddNews";
import {NewsProvider} from "../context/NewsContext";

const CreateNewsScreen = ({navigation}) => {

    return (
        <View>
            <FormAddNews navigation={navigation}/>
        </View>
    );
};

export default CreateNewsScreen;