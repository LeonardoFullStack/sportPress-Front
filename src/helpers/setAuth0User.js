

export const newAuth0User = ({nickname, email}) => {
    const thisDate = Date.now().toString()
    const newUser = {
        name: nickname,
        email,
        password: thisDate,
    }
    return newUser
}