import News from "../screens/News";
import Login from "../screens/Login";
import Specialists from "../screens/Specialists";

export const publicScreens = [
    {name: 'News', component: News, options: {title: 'Новости'}},
    {name: 'Login', component: Login, options: {title: 'Войти'}},
    {name: 'Specialists', component: Specialists, options: {title: 'Специалисты'}},
]

export const privateScreens = [
    {},
]