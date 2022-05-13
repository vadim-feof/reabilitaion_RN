import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import Toast from "react-native-toast-message";
export const API_URL = 'http://192.168.0.105:5000/api'

const $api = axios.create({
    baseURL: API_URL,
})

$api.interceptors.request.use(async (config) => {
    NetInfo.fetch().then(({isConnected}) => {
        if (!isConnected)
            Toast.show({
                type: 'error',
                text1: 'Нет доступа в интернет'
            })
    })
    config.headers.Authorization = `Bearer ${await AsyncStorage.getItem('token')}`
    return config
})

export default $api