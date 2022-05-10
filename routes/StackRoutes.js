import SpecialistDescription from "../screens/SpecialistDescription";
import CreateSpecialistScreen from "../screens/CreateSpecialistScreen";
import NewsDescription from "../screens/NewsDescription";
import CreateNewsScreen from "../screens/CreateNewsScreen";

export const publicScreens = [
    {name: 'SpecialistDescription', component: SpecialistDescription, options: {title: 'О специалисте'}},
    {name: 'CreateSpecialistScreen', component: CreateSpecialistScreen, options: {title: 'Добавить специалиста'}},
    {name: 'NewsDescription', component: NewsDescription, options: {title: 'Новости'}},
    {name: 'CreateNewsScreen', component: CreateNewsScreen, options: {title: 'Добавить новость'}},

]