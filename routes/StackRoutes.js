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
    {name: 'CreateSpecialistScreen', component: CreateSpecialistScreen,
        options: {
            title: 'Добавить специалиста',
            gestureEnabled: false
        }
    },
    {name: 'UpdateSpecialistScreen', component: UpdateSpecialistScreen,
        options: {
            title: 'Изменить специалиста',
            gestureEnabled: false
        }
    },

    {name: 'CreateNewsScreen', component: CreateNewsScreen,
        options: {
            title: 'Добавить новость',
            gestureEnabled: false
        }
    },
    {name: 'UpdateNewsScreen', component: UpdateNewsScreen,
        options: {
            title: 'Изменить новость',
            gestureEnabled: false
        }
    },

    {name: 'CreateServiceScreen',
        component: CreateServiceScreen,
        options: {title: 'Добавить услугу'}
    },
    {name: 'UpdateServiceScreen',
        component: UpdateServiceScreen,
        options: {title: 'Изменить услугу'}
    },
    {name: 'ServiceDescriptionScreen',
        component: ServiceDescriptionScreen,
        options: {title: 'Об услуге'}
    },
    {name: 'EditMyAccountScreen',
        component: EditMyAccountScreen,
        options: {title: 'Редактирование профиля'}
    },
    {name: 'LfkDescription',
        component: LfkDescription,
        options: {title: 'ЛФК'}
    },
    {name: 'CreateLfkScreen',
        component: CreateLfkScreen,
        options: {title: 'Добавить комплекс'}
    },
]