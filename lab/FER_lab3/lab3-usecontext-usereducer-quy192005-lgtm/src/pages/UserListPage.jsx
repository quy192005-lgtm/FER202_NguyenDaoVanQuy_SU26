import { Alert, Table } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import USERS from '../data/users'

function UserListPage() {
const { state } = useAuth()

if (state.user?.role !== 'admin') {
return ( <Alert variant="danger">
Bạn không có quyền truy cập </Alert>
)
}

return (
<> <h3 className="mt-4">User List</h3>

```
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Name</th>
        <th>Role</th>
      </tr>
    </thead>

    <tbody>
      {USERS.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.name}</td>
          <td>{user.role}</td>
        </tr>
      ))}
    </tbody>
  </Table>
</>

)
}

export default UserListPage
