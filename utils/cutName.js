
export const cutName = (userName) => {
    if (!userName)
        return
    const nameArray = userName.split(' ')
    console.log(nameArray)
    let cutUserName = ''
    if (nameArray.length === 2)
        cutUserName = `${nameArray[0]} ${nameArray[1][0]}.`

    if (nameArray.length === 3)
        cutUserName = `${nameArray[0]} ${nameArray[1][0]}. ${nameArray[2][0]}.`

    return cutUserName
}
