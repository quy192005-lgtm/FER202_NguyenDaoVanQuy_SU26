import USERS from '../data/users'

export function findUser(username, password) {
    const user = USERS.find(u => u.username === username && u.password === password)

    return user || null;

  // Trả về object user nếu tìm thấy, null nếu không
}