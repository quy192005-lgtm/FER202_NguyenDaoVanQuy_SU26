/**
 * AuthNavbar.jsx – Thanh điều hướng hiển thị thông tin đăng nhập (Bài 2)
 *
 * TODO: Dùng useAuth() từ AuthContext để lấy user và logout.
 *       Nếu user tồn tại:  hiển thị tên user và nút "Đăng xuất"
 *       Nếu chưa đăng nhập: hiển thị "Chưa đăng nhập"
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { useAuth } from '../../context/AuthContext'

export default function AuthNavbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="auth-header">
      {user ? (
        <>
          <span className="fw-semibold text-dark">👋 Xin chào, {user.name}</span>
          <button className="btn-custom btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={logout}>Đăng xuất</button>
        </>
      ) : (
        <span className="fw-semibold text-muted mx-auto">Chưa đăng nhập</span>
      )}
    </nav>
  )
}
