import React from 'react';
import {Text} from "react-native";
import {useAuth} from "../context/AuthContext";

const Test = () => {
    const {isLoading} = useAuth()
    return (
        <Text style={{height: 200, fontSize: 46}}>{isLoading.toString()}</Text>
    );
};

export default Test;