import SpecialistDescriptionScreen from "../screens/StackScreens/SpecialistsScreens/SpecialistDescriptionScreen";
import CreateSpecialistScreen from "../screens/StackScreens/SpecialistsScreens/CreateSpecialistScreen";
import NewsDescriptionScreen from "../screens/StackScreens/NewsScreens/NewsDescriptionScreen";
import CreateNewsScreen from "../screens/StackScreens/NewsScreens/CreateNewsScreen";
import UpdateNewsScreen from "../screens/StackScreens/NewsScreens/UpdateNewsScreen";

export const publicScreens = [
    {name: 'SpecialistDescription', component: SpecialistDescriptionScreen, options: {title: 'О специалисте'}},
    {name: 'CreateSpecialistScreen', component: CreateSpecialistScreen, options: {title: 'Добавить специалиста'}},
    {name: 'NewsDescription', component: NewsDescriptionScreen, options: {title: 'Новости'}},
    {name: 'CreateNewsScreen', component: CreateNewsScreen, options: {title: 'Добавить новость'}},
    {name: 'UpdateNewsScreen', component: UpdateNewsScreen, options: {title: 'Изменить новость'}},

]