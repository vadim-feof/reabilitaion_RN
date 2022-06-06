import React from 'react';
import Toast, {ErrorToast, SuccessToast} from 'react-native-toast-message'

export const toastConfig = {
    success: (props) => (
        <SuccessToast
            {...props}
            text2NumberOfLines={3}
            text1NumberOfLines={2}
            text1Style={{fontSize: 16}}
            text2Style={{fontSize: 15}}
            style={{height: 100, borderLeftColor: '#2cb500'}}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            text2NumberOfLines={3}
            text1NumberOfLines={2}
            text1Style={{fontSize: 16}}
            text2Style={{fontSize: 15}}
            style={{height: 100, borderLeftColor: 'red'}}
        />
    ),
}

const CustomToast = () => {
    return (
        <Toast config={toastConfig}/>
    );
};

export default CustomToast;
