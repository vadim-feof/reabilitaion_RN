import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import logo from './assets/logo.png'

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={'#D58B40'}
                style={'auto'}
                translucent={false}
            />
            <View style={styles.header}>
                <View><Text>|||</Text></View>
                <Text>Вход</Text>
            </View>
            <Image style={styles.logo_img} source={logo}/>
            <View>
                <Text style={styles.text}>Введите номер телефона</Text>
                <TextInput
                    style={styles.phone}
                    placeholder={'+7(___)___-__-__'}
                    keyboardType={'phone-pad'}
                    maxLength={12}
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        height: 60,
        backgroundColor: '#D58B40',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo_img: {
        resizeMode: 'contain',
        width: 255,
        height: 71,
        marginTop: 40
    },
    text: {
        fontSize: 24,
        marginTop: 135
    },
    phone: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        fontSize: 24,
        marginTop: 22,
        borderRadius: 8
    }
});
