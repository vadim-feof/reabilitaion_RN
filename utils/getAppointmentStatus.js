

export const getAppointmentStatus = (statusText) => {
    switch (statusText) {
        case 'process':
            return 'на рассмотрении'
        case 'confirmed':
            return 'подтверждена'
        case 'cancelled':
            return 'отменена'
        default:
            return statusText
    }
}
