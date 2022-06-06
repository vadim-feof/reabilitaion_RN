import SpecialistDescriptionScreen from "../screens/StackScreens/SpecialistsScreens/SpecialistDescriptionScreen";
import CreateSpecialistScreen from "../screens/StackScreens/SpecialistsScreens/CreateSpecialistScreen";
import UpdateSpecialistScreen from "../screens/StackScreens/SpecialistsScreens/CreateSpecialistScreen";
import NewsDescriptionScreen from "../screens/StackScreens/NewsScreens/NewsDescriptionScreen";
import CreateNewsScreen from "../screens/StackScreens/NewsScreens/CreateNewsScreen";
import UpdateNewsScreen from "../screens/StackScreens/NewsScreens/CreateNewsScreen";
import CreateServiceScreen from "../screens/StackScreens/ServicesScreens/CreateServiceScreen";
import ServiceDescriptionScreen from "../screens/StackScreens/ServicesScreens/ServiceDescriptionScreen";
import UpdateServiceScreen from "../screens/StackScreens/ServicesScreens/UpdateServiceScreen";
import EditMyAccountScreen from "../screens/StackScreens/MyAccountScreens/EditMyAccountScreen";
import LfkDescription from "../screens/StackScreens/LFKScreen/LFKDescription";
import CreateLfkScreen from "../screens/StackScreens/LFKScreen/CreateLFKScreen";
import {ServicesProvider} from "../context/ServicesContext";
import UserAppointmentDescription from "../screens/StackScreens/UserAppointmentDescription/UserAppointmentDescription";

export const publicScreens = [
    {name: 'NewsDescriptionScreen', component: NewsDescriptionScreen, options: {title: 'Новости'}},
]

export const privateScreens = [
    {name: 'SpecialistDescriptionScreen',
        component: (props) => (
            <ServicesProvider>
                <SpecialistDescriptionScreen {...props}/>
            </ServicesProvider>),
        options: {title: 'О специалисте'}
    },
    {name: 'CreateSpecialistScreen', component: (props) => <CreateSpecialistScreen {...props}/>,
        options: {
            title: 'Добавить специалиста',
            gestureEnabled: false
        }
    },
    {name: 'UpdateSpecialistScreen', component: (props) => <UpdateSpecialistScreen {...props}/>,
        options: {
            title: 'Изменить специалиста',
            gestureEnabled: false
        }
    },

    {name: 'CreateNewsScreen', component: (props) => <CreateNewsScreen {...props}/>,
        options: {
            title: 'Добавить новость',
            gestureEnabled: false
        }
    },
    {name: 'UpdateNewsScreen', component: (props) => <UpdateNewsScreen {...props}/>,
        options: {
            title: 'Изменить новость',
            gestureEnabled: false
        }
    },

    {name: 'CreateServiceScreen',
        component: (props) => <CreateServiceScreen {...props}/>,
        options: {title: 'Добавить услугу'}
    },
    {name: 'UpdateServiceScreen',
        component: (props) => <UpdateServiceScreen {...props}/>,
        options: {title: 'Изменить услугу'}
    },
    {name: 'ServiceDescriptionScreen',
        component: (props) => <ServiceDescriptionScreen {...props}/>,
        options: {title: 'Об услуге'}
    },
    {name: 'EditMyAccountScreen',
        component: (props) => <EditMyAccountScreen {...props}/>,
        options: {title: 'Редактирование профиля'}
    },
    {name: 'LfkDescription',
        component: (props) => <LfkDescription {...props}/>,
        options: {title: 'ЛФК'}
    },
    {name: 'CreateLfkScreen',
        component: (props) => <CreateLfkScreen {...props}/>,
        options: {title: 'Добавить комплекс'}
    },
    {name: 'UserAppointmentDescription',
        component: (props) => <UserAppointmentDescription {...props}/>,
        options: {title: 'Данные о записи'}
    },

]
