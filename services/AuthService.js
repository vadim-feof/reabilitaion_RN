import $api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AuthService {
    static async login(isEmail, login, password) {
        let loginData
        if (isEmail) {
            loginData = {
                email: login,
                password
            }
        }
        else {
            loginData = {
                phone: login,
                password
            }
        }
        const response = await $api.post('/login', loginData)
        console.log('RESPONSE LOGIN', response.data.token)
        await AsyncStorage.setItem('token', response.data.token)
        return response.data
    }

    static async registration(regData) {
        const response = await $api.post('/registration', regData)
        return response.data
    }

    static async auth() {
        const response = await $api.get('/auth')
        await AsyncStorage.setItem('token', response.data.token)
        return response.data
    }
}