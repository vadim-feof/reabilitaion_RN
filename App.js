import 'react-native-gesture-handler';
import StackNavigator from "./navigators/StackNavigator";
import Toast from "react-native-toast-message";
import {AuthProvider} from "./context/AuthContext";
import {toastConfig} from "./utils/toastShow";

export default function App() {
    return (
        <AuthProvider>
            <StackNavigator/>
            <Toast config={toastConfig} topOffset={100} visibilityTime={5000}/>
        </AuthProvider>
    );
}
