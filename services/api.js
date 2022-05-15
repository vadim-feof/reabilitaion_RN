import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import Toast from "react-native-toast-message";
import {toastShow} from "../utils/toastShow";
export const API_URL = 'http://192.168.0.105:5000/api'

const $api = axios.create({
    baseURL: API_URL,
    timeout: 20000
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

$api.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log(error.code)
    switch (error.code) {
        case 'ECONNABORTED':
            toastShow('error', 'Сервер недоступен.',
                `Попробуйте повторить попытку позднее ${error.code}`)
            break
        case 'ERR_NETWORK':
            toastShow('error', `Ошибка загрузки.`,
                `Проверьте подключение к интернету ${error.code}`)
            break
        case 'ERR_BAD_REQUEST':
            toastShow('error', 'Что-то пошло не так.',
                `${error.response.data.message} ${error.code}`)
            break
        default:
            toastShow('error', 'Неизвестная ошибка.', `${error.code}`)
            break
    }
})

export default $api