import React, {useEffect} from 'react';
import {View, ScrollView, Text} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import DatePicker from "../DatePicker";
import CustomInput from "../CustomInput/CustomInput";
import {useCreateAppointment} from "../../context/CreateAppointmentContext";
import CustomButton from "../CustomButton/CustomButton";
import ServicesModal from "../ModalWindows/ServicesModal/ServicesModal";
import ServiceItem from "../Service/ServiceItem/ServiceItem";

const FormCreateAppointment = () => {
    const validationSchema = yup.object().shape(
        {
            idService: yup.string().required('Выберите услугу'),
            idSpecialist: yup.string().required('Выберите специалиста'),
        }
    )

    const {services, specialists, isLoading,
        fetchServices, fetchSpecialistsByService, createAppointment} = useCreateAppointment()

    useEffect(() => {
        fetchServices()
    }, []);


    return (
        <Formik
            initialValues={{
                idService: '',
                service: {},
                idSpecialist: '',
                desiredTime: Date.now(),
                desiredDate: Date.now(),
                comment: '',
                modals: {
                   visibleServicesModal: false,
                   visibleSpecialistsModal: false
                }
            }}
            validateOnBlur
            onSubmit={(values, action) => {
                createAppointment(values)
            }}
            validationSchema={validationSchema}
        >
            {({values, errors, touched, setFieldValue,
                  handleChange, handleBlur,
                  handleSubmit}) => {

                const openSelectServiceModal = () => {
                    setFieldValue('modals.visibleServicesModal', true)
                }

                const closeServicesModal = () => {
                    setFieldValue('modals.visibleServicesModal', false)
                }

                const openSelectSpecialistModal = () => {

                }

                return (
                    <ScrollView>
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
                        <View>
                            {
                                values.idService
                                    ?
                                    <View>
                                        <ServiceItem
                                            service={values.service}
                                            onPress={openSelectServiceModal}
                                            index={0}
                                        />
                                        <CustomButton
                                            text={'Выберите специалиста'}
                                            onPress={openSelectSpecialistModal}
                                        />
                                    </View>
                                    :
                                    <CustomButton
                                        disabled={isLoading}
                                        text={'Выберите услугу'}
                                        onPress={openSelectServiceModal}
                                    />
                            }
                        </View>
                        <View>
                            <DatePicker
                                value={values.desiredDate}
                                setValue={(date) => setFieldValue('desiredDate', date)}
                            />
                        </View>
                        <View>
                            <DatePicker
                                value={values.desiredTime}
                                setValue={(time) => setFieldValue('desiredTime', time)}
                            />
                        </View>
                        <CustomInput
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

export default FormCreateAppointment;