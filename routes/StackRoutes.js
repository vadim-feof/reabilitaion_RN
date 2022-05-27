import SpecialistDescriptionScreen from "../screens/StackScreens/SpecialistsScreens/SpecialistDescriptionScreen";
import CreateSpecialistScreen from "../screens/StackScreens/SpecialistsScreens/CreateSpecialistScreen";
import UpdateSpecialistScreen from "../screens/StackScreens/SpecialistsScreens/CreateSpecialistScreen";
import NewsDescriptionScreen from "../screens/StackScreens/NewsScreens/NewsDescriptionScreen";
import CreateNewsScreen from "../screens/StackScreens/NewsScreens/CreateNewsScreen";
import UpdateNewsScreen from "../screens/StackScreens/NewsScreens/CreateNewsScreen";
import CreateServiceScreen from "../screens/StackScreens/ServicesScreens/CreateServiceScreen";
import ServiceDescriptionScreen from "../screens/StackScreens/ServicesScreens/ServiceDescriptionScreen";
import UpdateServiceScreen from "../screens/StackScreens/ServicesScreens/UpdateServiceScreen";
import ModalAddCategory from "../components/ModalWindows/ModalAddCategory";

export const publicScreens = [
    {name: 'SpecialistDescriptionScreen', component: SpecialistDescriptionScreen, options: {title: 'О специалисте'}},
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
    {name: 'NewsDescriptionScreen', component: NewsDescriptionScreen, options: {title: 'Новости'}},
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

    {name: 'CreateServiceScreen', component: CreateServiceScreen, options: {title: 'Добавить услугу'}},
    {name: 'ServiceDescriptionScreen', component: ServiceDescriptionScreen, options: {title: 'Об услуге'}},
    {name: 'UpdateServiceScreen', component: UpdateServiceScreen, options: {title: 'Изменить услугу'}},


]