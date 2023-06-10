

export const newAuth0User = ({given_name, email}) => {
    const thisDate = Date.now()
    const newUser = {
        name: given_name,
        email,
        password: thisDate
    }
    return newUser
}