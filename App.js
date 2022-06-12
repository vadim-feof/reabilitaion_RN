import 'react-native-gesture-handler';
import StackNavigator from "./navigators/StackNavigator";
import {AuthProvider} from "./context/AuthContext";
import CustomToast from "./components/CustomToast";
import 'moment/locale/ru'

export default function App() {
    return (
        <AuthProvider>
            <StackNavigator/>
            <CustomToast/>
        </AuthProvider>
    );
}
