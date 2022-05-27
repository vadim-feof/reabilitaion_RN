import 'react-native-gesture-handler';
import StackNavigator from "./navigators/StackNavigator";
import Toast from "react-native-toast-message";
import {AuthProvider} from "./context/AuthContext";
export default function App() {
    return (
        <AuthProvider>
            <StackNavigator/>
            <Toast topOffset={100} visibilityTime={3000}/>
        </AuthProvider>
    );
}
