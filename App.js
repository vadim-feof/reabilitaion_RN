import 'react-native-gesture-handler';
import StackNavigator from "./navigators/StackNavigator";
import Toast from "react-native-toast-message";
export default function App() {
    return (
        <>
            <StackNavigator/>
            <Toast topOffset={100} visibilityTime={3000}/>
        </>
    );
}
