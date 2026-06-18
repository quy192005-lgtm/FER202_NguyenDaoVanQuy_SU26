/**
 * Ex02LoginPage.jsx – Trang bài 2: Login Form
 *
 * TODO: Import AuthProvider, useAuth từ '../context/AuthContext'
 *       Import AuthNavbar, LoginForm, Dashboard từ '../components/auth/'
 *
 *       Bọc toàn bộ nội dung trang trong <AuthProvider>.
 *       Tạo component nội bộ PageContent (bên trong Provider):
 *         - Dùng useAuth() để lấy user
 *         - Render <AuthNavbar /> luôn luôn
 *         - Render <Dashboard /> nếu user tồn tại, ngược lại <LoginForm />
 */
import { AuthProvider, useAuth } from '../context/AuthContext'
import AuthNavbar from '../components/auth/AuthNavbar'
import LoginForm from '../components/auth/LoginForm'
import Dashboard from '../components/auth/Dashboard'

function PageContent() {
  const { user } = useAuth()

  return (
    <div className="page-container">
      <div className="auth-card">
        <AuthNavbar />
        <div className="card-custom">
          {user ? <Dashboard /> : <LoginForm />}
        </div>
      </div>
    </div>
  )
}

export default function Ex02LoginPage() {
  return (
    <AuthProvider>
      <PageContent />
    </AuthProvider>
  )
}
