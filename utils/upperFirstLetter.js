

export const upperFirstLetter = (word) => {
    if (!word)
        return ''
    const newWord = word[0].toUpperCase() + word.substring(1)
    return newWord
}
