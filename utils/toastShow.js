import Toast, {SuccessToast, ErrorToast} from "react-native-toast-message";

export const toastConfig = {
    success: (props) => (
        <SuccessToast
            {...props}
            text2NumberOfLines={3}
            text1NumberOfLines={2}
            text1Style={{fontSize: 14}}
            text2Style={{fontSize: 13}}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            text2NumberOfLines={3}
            text1NumberOfLines={2}
            text1Style={{fontSize: 14}}
            text2Style={{fontSize: 13}}
        />
    )
}

export const toastShow = (type, text1, text2) => {
    Toast.show({
        type, text1, text2,
    })
}
