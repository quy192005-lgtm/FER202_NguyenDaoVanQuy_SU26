import USERS from '../data/users'

export function findUser(username, password) {
    const user = USERS.find(u => u.username === username && u.password === password)

    if (!user) return null

    const { password: _pw, ...safeUser } = user
    return safeUser
}