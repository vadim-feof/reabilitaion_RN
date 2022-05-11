import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const API_URL = 'http://192.168.0.110:5000/api'

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await AsyncStorage.getItem('token')}`
    return config
})

export default $api