import React, {useEffect} from 'react';
import {View, ScrollView, Text} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import DatePicker from "../DatePicker";
import CustomInput from "../Common/CustomInput/CustomInput";
import {useCreateAppointment} from "../../context/CreateAppointmentContext";
import CustomButton from "../Common/CustomButton/CustomButton";
import ServicesModal from "../ModalWindows/ServicesModal/ServicesModal";
import ServiceItem from "../Lists/ServiceList/ServiceItem/ServiceItem";
import SpecialistsModal from "../ModalWindows/SpecialistsModal/ServicesModal";
import SpecialistItem from "../Lists/SpecialistList/SpecialistItem/SpecialistItem";
import Loader from "../Common/Loader";

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
                specialist: {},
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
                        <Loader
                            isLoading={isLoading}
                        />
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
                        <View>
                        {
                            values.idService
                            ?
                            <View>
                                <ServiceItem
                                    service={values.service}
                                    onPress={openServicesModal}
                                    index={0}
                                />
                                {
                                    values.idSpecialist
                                    ?
                                    <SpecialistItem
                                        specialist={values.specialist}
                                        onPress={openSpecialistsModal}
                                    />
                                    :
                                    <CustomButton
                                        disabled={isLoading}
                                        text={'Выберите специалиста'}
                                        onPress={openSpecialistsModal}
                                    />
                                }
                            </View>
                            :
                            <CustomButton
                                disabled={isLoading}
                                text={'Выберите услугу'}
                                onPress={openServicesModal}
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