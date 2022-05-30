import News from "../screens/DrawerScreens/News";
import Login from "../screens/DrawerScreens/Login";
import Specialists from "../screens/DrawerScreens/Specialists";
import MyAccount from "../screens/DrawerScreens/MyAccount";

import {
    Ionicons,
    MaterialCommunityIcons as MatComIcon,
    MaterialIcons, Entypo, AntDesign
} from "@expo/vector-icons";
import {NewsProvider} from "../context/NewsContext";
import Registration from "../screens/DrawerScreens/Registration";
import {SpecialistProvider} from "../context/SpecialistContext";
import Services from "../screens/DrawerScreens/Services";
import Questions from "../screens/DrawerScreens/Questions";
import LFK from "../components/LFK/LFK";
import {ServicesProvider} from "../context/ServicesContext";
import {QuestionsProvider} from "../context/QuestionsContext";

export const publicScreens = [
    {name: 'News', component: (props) => <NewsProvider><News {...props}/></NewsProvider>,
        options: ({navigation}) => ({
            title: 'Новости',
            drawerIcon: ({color}) => <Ionicons name={'newspaper-outline'} size={32} color={color}/>
        })
    },
    {name: 'Questions', component: (props) => <Questions {...props}/>,
        options: {
            title: 'Помощь',
            drawerIcon: ({color}) => <AntDesign name="questioncircleo" size={32} color={color} />
        }
    },
]

export const authScreens = [
    {name: 'Login', component: Login,
        options: {
            title: 'Войти',
            drawerIcon: ({color}) => <MaterialIcons name={'login'} size={32} color={color}/>
        }
    },
    {name: 'Registration', component: Registration, options: {
            title: 'Регистрация',
            drawerIcon: ({color}) => <MaterialIcons name="app-registration" size={32} color={color} />
        }
    },
]

export const privateScreens = [
    {name: 'MyAccount', component: (props) => <MyAccount {...props}/>,
        options: {
            title: 'Личный кабинет',
            drawerIcon: ({color}) => <MatComIcon name={'account-circle'} size={32} color={color}/>
        }
    },
    {name: 'Specialists', component: (props) => <SpecialistProvider><Specialists {...props}/></SpecialistProvider>,
        options: ({navigation}) => ({
            title: 'Специалисты',
            drawerIcon: ({color}) => <MatComIcon name="account-supervisor-outline" size={32} color={color} />,
        })
    },
    {name: 'Services', component: (props) => <ServicesProvider><Services {...props}/></ServicesProvider>,
        options: {
            title: 'Услуги',
            drawerIcon: ({color}) => <Entypo name="list" size={32} color={color} />
        }
    },
    {name: 'Questions', component: (props) => <QuestionsProvider><Questions {...props}/></QuestionsProvider> ,
        options: {
            title: 'Помощь',
            drawerIcon: ({color}) => <AntDesign name="questioncircleo" size={32} color={color} />
        }
    },
    {name: 'LFK', component: (props) => <LFK {...props}/>,
        options: {
            title: 'Комплексы ЛФК',
            drawerIcon: ({color}) => <AntDesign name="database" size={32} color={color} />
        }
    },

]