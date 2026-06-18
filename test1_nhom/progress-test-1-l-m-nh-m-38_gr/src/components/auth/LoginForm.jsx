/**
 * LoginForm.jsx – Form đăng nhập (Bài 2)
 *
 * TODO: Dùng useAuth() từ AuthContext để lấy login, loading, error.
 *       Local state (useState) cho email và password chỉ dùng trong component này.
 *
 *       Render:
 *         - Input email (có label, id="email")
 *         - Input password (có label, id="password")
 *         - Hiển thị error nếu có
 *         - Nút "Đăng nhập" (disabled khi loading, hiện text loading khi đang xử lý)
 *
 *       Khi submit: gọi login(email, password)
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function LoginForm() {
  const { login, loading, error } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 text-center fw-bold">Đăng Nhập</h3>
      
      {error && <div className="error-banner text-center mb-3">{error}</div>}

      <div className="form-group">
        <label htmlFor="email" className="form-label-custom">Email</label>
        <input
          id="email"
          type="email"
          className="input-custom"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group mb-4">
        <label htmlFor="password" className="form-label-custom">Password</label>
        <input
          id="password"
          type="password"
          className="input-custom"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-custom w-100 py-2 fs-6 mt-2" disabled={loading}>
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  )
}
