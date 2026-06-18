/**
 * Dashboard.jsx – Màn hình sau khi đăng nhập thành công (Bài 2)
 *
 * TODO: Dùng useAuth() từ AuthContext để lấy user.
 *       Hiển thị thông tin: tên, email, vai trò của user.
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div>
      <h3 className="mb-4 text-center fw-bold text-primary">Dashboard</h3>

      <div className="form-group">
        <label htmlFor="dashboard-name" className="form-label-custom">Tên</label>
        <input id="dashboard-name" className="input-custom" style={{backgroundColor: '#f8fafc', color: '#64748b'}} value={user.name} readOnly />
      </div>

      <div className="form-group">
        <label htmlFor="dashboard-email" className="form-label-custom">Email</label>
        <input id="dashboard-email" className="input-custom" style={{backgroundColor: '#f8fafc', color: '#64748b'}} value={user.email} readOnly />
      </div>

      <div className="form-group mb-0">
        <label htmlFor="dashboard-role" className="form-label-custom">Vai trò</label>
        <input id="dashboard-role" className="input-custom" style={{backgroundColor: '#f8fafc', color: '#64748b'}} value={user.role} readOnly />
      </div>
    </div>
  )
}