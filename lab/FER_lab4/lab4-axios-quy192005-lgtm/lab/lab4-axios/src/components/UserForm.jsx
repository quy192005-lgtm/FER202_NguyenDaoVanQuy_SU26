import { useEffect, useState } from 'react';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  role: 'User',
  status: 'active',
};

export default function UserForm({
  open,
  user,
  loading,
  serverError,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'User',
        status: user.status || 'active',
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [user, open]);

  if (!open) return null;

  const validate = () => {
    const e = {};

    if (!form.fullName.trim()) {
      e.fullName = 'Họ tên không được để trống.';
    } else if (form.fullName.trim().length < 3) {
      e.fullName = 'Họ tên phải có ít nhất 3 ký tự.';
    }

    if (!form.email.trim()) {
      e.email = 'Email không được để trống.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Email không hợp lệ.';
    }

    if (!form.phone.trim()) {
      e.phone = 'Số điện thoại không được để trống.';
    } else if (!/^0\d{9}$/.test(form.phone.trim())) {
      e.phone = 'Số điện thoại phải 10 chữ số, bắt đầu bằng 0.';
    }

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="app-modal user-form-modal">
        <div className="modal-header">
          <h2>{user ? 'Sửa người dùng' : 'Thêm người dùng'}</h2>

          <button type="button" className="icon-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {serverError && <div className="alert alert-error">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Họ tên</label>

            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Nhập họ tên"
            />

            {errors.fullName && (
              <small className="field-error">{errors.fullName}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />

            {errors.email && (
              <small className="field-error">{errors.email}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>

            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="0xxxxxxxxx"
            />

            {errors.phone && (
              <small className="field-error">{errors.phone}</small>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Vai trò</label>

              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Trạng thái</label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Hủy
            </button>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Đang lưu...' : user ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
