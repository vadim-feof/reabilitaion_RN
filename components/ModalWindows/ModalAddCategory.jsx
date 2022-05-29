import { StyleSheet, Text} from "react-native";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import {View} from "react-native";
import {Formik} from 'formik'
import * as yup from 'yup'

const ModalAddCategory = ({setVisibleModal, createCategory}) => {

    const validationSchema = yup.object().shape(
        {
            name: yup.string().typeError('Должно быть строкой').required('Обязательно для заполнения'),
        }
    )
    return (
        <View style={styles.modal}>
            <Formik
                initialValues={{
                    name: '',
                }}
                validateOnBlur
                onSubmit={(values, action) => {
                        createCategory(values.name)
                        action.resetForm() /*чистка формы*/
                        setVisibleModal(isVisible => !isVisible)
                }}
                validationSchema={validationSchema}
            >
                {({
                    values, errors, touched, dirty,
                    handleChange, handleBlur,
                    handleSubmit,
                }) => (
                    <View>
                        <CustomInput
                            placeholder={'Введите название категории'}
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                        />
                        {touched.name && errors.name && <Text style={styles.error}> {errors.name}</Text>}
                        <CustomButton
                            text={'Добавить категорию'}
                            onPress={handleSubmit}
                        />
                        <CustomButton
                            text={'Отмена'}
                            onPress={() => setVisibleModal(isVisible => !isVisible)}
                        />
                    </View>
                    )}
            </Formik>
        </View>

    );
};

const styles = StyleSheet.create({
    modal: {
        height: 320,
        marginHorizontal: 10,
        backgroundColor: '#e0e0e0',
        paddingTop: 30,
        marginTop: 250,
        borderRadius: 10
    },
    error: {
        color: 'red',
        marginLeft: 10,
        marginTop: 5
    },
})

export default ModalAddCategory;