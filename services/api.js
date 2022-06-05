import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import Toast from "react-native-toast-message";
import {toastShow} from "../utils/toastShow";

export const SERVER_URL = 'http://192.168.79.66:5000'
export const API_URL = `${SERVER_URL}/api`

export const STATIC_IMAGE_NEWS_URL = `${SERVER_URL}/image/news/`
export const STATIC_IMAGE_SPECIALIST_URL = `${SERVER_URL}/image/specialist/`
export const STATIC_IMAGE_USER_URL = `${SERVER_URL}/image/user/`
export const STATIC_IMAGE_LFK_URL = `${SERVER_URL}/image/lfk/`

export const STATIC_NEWS_UPLOAD = 'static/news'
export const STATIC_SPECIALIST_UPLOAD = 'static/specialist'
export const STATIC_USER_UPLOAD = 'static/user'
export const STATIC_LFK_UPLOAD = 'static/lfk'


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
    console.log(error)
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