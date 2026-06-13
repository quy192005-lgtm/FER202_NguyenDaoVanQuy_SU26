import USERS from '../data/users'

export function findUser(username, password) {
  if (typeof username !== 'string' || typeof password !== 'string') {
    return null
  }

  if (!Array.isArray(USERS)) {
    console.error('findUser: USERS data is not an array')
    return null
  }

  const user = USERS.find(u => u.username === username && u.password === password)
  return user || null
}