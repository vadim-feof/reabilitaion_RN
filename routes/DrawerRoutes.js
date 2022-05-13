import News from "../screens/DrawerScreens/News";
import Login from "../screens/DrawerScreens/Login";
import Specialists from "../screens/DrawerScreens/Specialists";
import MyAccount from "../screens/DrawerScreens/MyAccount";
import AddButton from "../components/Buttons/AddButton/AddButton";
import {
    Ionicons,
    MaterialCommunityIcons as MatComIcon,
    MaterialIcons
} from "@expo/vector-icons";
import {NewsProvider} from "../context/NewsContext";
import Registration from "../screens/DrawerScreens/Registration";

export const publicScreens = [
    {name: 'News', component: (props) => <NewsProvider><News {...props}/></NewsProvider>,
        options: ({navigation}) => ({
            title: 'Новости',
            drawerIcon: ({color}) => <Ionicons name={'newspaper-outline'} size={32} color={color}/>
        })
    },
    {name: 'MyAccount', component: MyAccount,
        options: {
            title: 'Личный кабинет',
            drawerIcon: ({color}) => <MatComIcon name={'account-circle'} size={32} color={color}/>
        }
    },
    {name: 'Login', component: Login,
        options: {
            title: 'Войти',
            drawerIcon: ({color}) => <MaterialIcons name={'login'} size={32} color={color}/>
        }
    },
    {name: 'Specialists', component: Specialists,
        options: ({navigation}) => ({
            title: 'Специалисты',
            drawerIcon: ({color}) => <MatComIcon name="account-supervisor-outline" size={32} color={color} />,
        })
    },

    {name: 'Registration', component: Registration, options: {
            title: 'Регистрация',
            drawerIcon: ({color}) => <MaterialIcons name="app-registration" size={32} color={color} />
        }
    }
]

export const privateScreens = [
    {},
]