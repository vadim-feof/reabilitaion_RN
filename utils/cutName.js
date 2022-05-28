
export const cutName = (userName) => {
    if (!userName)
        return
    const nameArray = userName.split(' ')
    const cutUserName = `${nameArray[0]} ${nameArray[1][0]}. ${nameArray[2][0]}.`
    return cutUserName
}