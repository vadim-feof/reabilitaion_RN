import * as ImagePicker from "expo-image-picker";

export const takePictureFromLibrary = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");
        return;
    }
    const picture = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false,
        presentationStyle: 0,
        quality: 0.4
    })
    return picture
}
