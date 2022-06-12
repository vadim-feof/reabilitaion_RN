import React, {useEffect} from 'react';
import {View, ScrollView, Text, StyleSheet, Alert} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import CustomInput from "../Common/CustomInput/CustomInput";
import {useCreateAppointment} from "../../context/CreateAppointmentContext";
import CustomButton from "../Common/CustomButton/CustomButton";
import ServicesModal from "../ModalWindows/ServicesModal/ServicesModal";
import ServiceItem from "../Lists/ServiceList/ServiceItem/ServiceItem";
import SpecialistsModal from "../ModalWindows/SpecialistsModal/ServicesModal";
import SpecialistItem from "../Lists/SpecialistList/SpecialistItem/SpecialistItem";
import Loader from "../Common/Loader";
import TimePicker from "../TimePicker";
import DatePicker from "../DatePicker";

const FormCreateAppointment = ({navigation}) => {
    const validationSchema = yup.object().shape(
        {
            idService: yup.string().required('Выберите услугу'),
            idSpecialist: yup.string().required('Выберите специалиста'),
        }
    )

    const {services, specialists, isLoading,
        fetchServices, fetchSpecialistsByService, createAppointment} = useCreateAppointment()

    const openConfirmAppointment = (values, cb) => {
        const newAppointment = {
            _idService: values.idService,
            _idSpecialist: values.idSpecialist,
            desiredTime: values.desiredTime,
            desiredDate: values.desiredDate,
            comment: values.comment
        }
        Alert.alert(
            'Подтверждаете запись?',
            '',
            [
                {
                    text: 'Подтверждаю',
                    onPress: () => {
                        createAppointment(newAppointment, navigation)
                        cb()
                    },
                },
                {
                    text: 'Отмена'
                }
            ]
        )
    }

    useEffect(() => {
        fetchServices()
    }, []);

    return (
        <Formik
            initialValues={{
                idService: '',
                service: {},
                idSpecialist: '',
                specialist: {},
                desiredTime: new Date().setHours(12, 0, 0),
                desiredDate: new Date(),
                comment: '',
                modals: {
                   visibleServicesModal: false,
                   visibleSpecialistsModal: false
                }
            }}
            validateOnBlur={true}
            validateOnChange={false}
            onSubmit={(values, action) => {
                openConfirmAppointment(values, () => action.resetForm())
            }}
            validationSchema={validationSchema}
        >
            {({values, errors, touched, setFieldValue,
                  handleChange, handleBlur,
                  handleSubmit}) => {

                const openServicesModal = () => {
                    setFieldValue('idSpecialist', '')
                    setFieldValue('specialist', {})
                    setFieldValue('modals.visibleServicesModal', true)
                }

                const closeServicesModal = () => {
                    setFieldValue('modals.visibleServicesModal', false)
                }

                const openSpecialistsModal = () => {
                    setFieldValue('modals.visibleSpecialistsModal', true)
                }

                const closeSpecialistsModal = () => {
                    setFieldValue('modals.visibleSpecialistsModal', false)
                }

                useEffect(() => {
                    if (values.idService)
                        fetchSpecialistsByService(values.idService)
                }, [values.idService]);

                return (
                    <ScrollView>
                        {isLoading ? <Loader/> : null}
                        <ServicesModal
                            services={services}
                            visible={values.modals.visibleServicesModal}
                            onPressItem={(service) => {
                                setFieldValue('idService', service._id)
                                setFieldValue('service', service)
                                closeServicesModal()
                            }}
                            closeModal={closeServicesModal}
                            refresh={fetchServices}
                            isLoading={isLoading}
                        />
                        <SpecialistsModal
                            specialists={specialists}
                            visible={values.modals.visibleSpecialistsModal}
                            onPressItem={(specialist) => {
                                setFieldValue('idSpecialist', specialist._id)
                                setFieldValue('specialist', specialist)
                                closeSpecialistsModal()
                            }}
                            closeModal={closeSpecialistsModal}
                            refresh={() => fetchSpecialistsByService(values.idService)}
                            isLoading={isLoading}
                        />
                        {
                            values.idService
                            ?
                            <>
                                <ServiceItem
                                    service={values.service}
                                    onPress={openServicesModal}
                                    index={1}
                                />
                                {
                                    values.idSpecialist
                                    ?
                                    <SpecialistItem
                                        specialist={values.specialist}
                                        onPress={openSpecialistsModal}
                                    />
                                    :
                                    <>
                                        <CustomButton
                                            disabled={isLoading}
                                            text={'Выберите специалиста'}
                                            onPress={openSpecialistsModal}
                                        />
                                        {!values.idSpecialist && errors.idSpecialist ?
                                            <Text style={styles.error}>{errors.idSpecialist}</Text> : null}
                                    </>
                                }
                            </>
                            :
                            <>
                                <CustomButton
                                    disabled={isLoading}
                                    text={'Выберите услугу'}
                                    onPress={openServicesModal}
                                />
                                {!values.idService && errors.idService ?
                                    <Text style={styles.error}>{errors.idService}</Text> : null}
                            </>
                        }
                        <DatePicker
                            value={values.desiredDate}
                            setValue={(date) => setFieldValue('desiredDate', date)}
                        />
                        <TimePicker
                            value={values.desiredTime}
                            setValue={(time) => {
                                console.log(time)
                                setFieldValue('desiredTime', time)
                            }}
                        />
                        <CustomInput
                            multiline={true}
                            type={'text'}
                            onChangeText={handleChange('comment')}
                            onBlur={handleBlur('comment')}
                            value={values.comment}
                            placeholder={'Введите комментарий. Необязательно.'}
                        />
                        <CustomButton
                            disabled={isLoading}
                            text={'Записаться'}
                            onPress={handleSubmit}
                        />
                    </ScrollView>
                )
            }}
        </Formik>
    );
};

const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 18,
    },
})

export default FormCreateAppointment;
