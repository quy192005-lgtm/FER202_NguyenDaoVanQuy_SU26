import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login, loading, error } = useAuth();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(form.username.trim(), form.password);
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <h1>User Manager</h1>
          <p>CRUD với Axios, json-server và ReactJS</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="123456"
              autoComplete="current-password"
              required
            />
          </div>

          <button className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="demo-accounts">
          <h3>Tài khoản mẫu</h3>
          <p>
            <b>admin</b> / 123456 - Admin
          </p>
          <p>
            <b>manager</b> / 123456 - Manager
          </p>
          <p>
            <b>user1</b> / 123456 - User
          </p>
        </div>
      </section>
    </main>
  );
}