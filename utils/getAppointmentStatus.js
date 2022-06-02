

export const getAppointmentStatus = (statusText) => {
    switch (statusText) {
        case 'process':
            return 'на рассмотрении'
        case 'viewed':
            return 'рассмотрена'
        case 'cancelled':
            return 'отменена'
        default:
            return statusText
    }
}