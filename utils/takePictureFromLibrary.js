import * as ImagePicker from "expo-image-picker";
import {toastShow} from "./toastShow";

export const takePictureFromLibrary = async () => {
    try {
        // Ask the user for the permission to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            toastShow('error', 'Необходимо дать доступ к галерее');
            return;
        }
        const picture = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: false,
            presentationStyle: 0,
            allowsEditing: true,
            quality: 0.5
        })
        return picture
    } catch (e) {
        toastShow('error', 'Ошибка выбора фотографии', e)
    }
}
