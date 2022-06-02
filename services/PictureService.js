import $api from './api'
const FormData = global.FormData

export default class PictureService {
    static async uploadPicture(picturePath, staticUrl) {
        // second problem is axios converts form data automatically to string, so you need to use transformRequest config on request to override it.
        // https://stackoverflow.com/questions/56235286/react-native-post-form-data-with-object-and-file-in-it-using-axios
        const picture = {
            uri: picturePath,
            type: 'image/jpeg',
            name: 'image.jpg'
        }
        const formData = new FormData()
        formData.append('picture', picture)
        const response = await $api.post(staticUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            transformRequest: (data, headers) => {
                return data;
            },
            data: formData
        })
        return response.data
    }

    static async removePicture(picture, staticUrl) {
        const response = await $api.put(staticUrl, {picture})
        return response.data
    }
}