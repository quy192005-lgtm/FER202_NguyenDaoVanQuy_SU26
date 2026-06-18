import { useCallback, useEffect, useMemo, useState } from 'react';
import { userApi } from '../api/userApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import UserForm from '../components/UserForm.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

export default function UsersPage() {
  const { currentUser, logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState(null);

  const canCreate =
    currentUser?.role === 'Admin' || currentUser?.role === 'Manager';

  const canEdit =
    currentUser?.role === 'Admin' || currentUser?.role === 'Manager';

  const canDelete = currentUser?.role === 'Admin';

  const canToggleStatus =
    currentUser?.role === 'Admin' || currentUser?.role === 'Manager';

  const showToast = (message, type = 'success') => {
    setToast({ message, type });

    window.setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};

      if (filterRole) {
        params.role = filterRole;
      }

      const { data } = await userApi.getAll(params);

      setUsers(data);
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  }, [filterRole]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return users;

    return users.filter(
      (u) =>
        u.fullName.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword) ||
        u.phone.includes(keyword)
    );
  }, [users, search]);

  const openCreateForm = () => {
    setEditUser(null);
    setFormError('');
    setShowForm(true);
  };

  const openEditForm = (user) => {
    setEditUser(user);
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    setFormError('');

    try {
      if (editUser) {
        await userApi.update(editUser.id, {
          ...editUser,
          ...formData,
        });

        showToast('Cập nhật người dùng thành công!');
      } else {
        await userApi.create(formData);

        showToast('Thêm người dùng thành công!');
      }

      setShowForm(false);
      setEditUser(null);

      await fetchUsers();
    } catch (err) {
      setFormError(err.message || 'Lưu dữ liệu thất bại.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';

    try {
      await userApi.patch(user.id, {
        status: newStatus,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
                ...u,
                status: newStatus,
              }
            : u
        )
      );

      showToast('Cập nhật trạng thái thành công!');
    } catch (err) {
      showToast('Cập nhật trạng thái thất bại.', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await userApi.remove(deleteTarget.id);

      showToast(`Đã xóa '${deleteTarget.fullName}' thành công.`);

      setDeleteTarget(null);

      await fetchUsers();
    } catch (err) {
      showToast('Xóa thất bại.', 'error');

      setDeleteTarget(null);
    }
  };

  return (
    <main className="users-page">
      <header className="topbar">
        <div>
          <h1>Quản lý người dùng</h1>

          <p>
            Xin chào, <b>{currentUser?.fullName}</b> - {currentUser?.role}
          </p>
        </div>

        <button className="btn btn-secondary" onClick={logout}>
          Đăng xuất
        </button>
      </header>

      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}

      <section className="panel">
        <div className="toolbar">
          <input
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, email, SĐT..."
          />

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">Tất cả vai trò</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>

          {canCreate && (
            <button className="btn btn-primary" onClick={openCreateForm}>
              + Thêm người dùng
            </button>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="empty-state">Đang tải dữ liệu...</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>SĐT</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Hành động</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="empty-cell">
                      Không có người dùng phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>

                      <td>
                        <span
                          className={`badge role-${user.role.toLowerCase()}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <span className={`badge status-${user.status}`}>
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td>{user.createdAt}</td>

                      <td>
                        <div className="action-group">
                          {canEdit && (
                            <button
                              className="btn btn-small"
                              onClick={() => openEditForm(user)}
                            >
                              Sửa
                            </button>
                          )}

                          {canToggleStatus && (
                            <button
                              className="btn btn-small btn-secondary"
                              onClick={() => handleToggleStatus(user)}
                            >
                              Đổi trạng thái
                            </button>
                          )}

                          {canDelete && (
                            <button
                              className="btn btn-small btn-danger"
                              onClick={() => setDeleteTarget(user)}
                            >
                              Xóa
                            </button>
                          )}

                          {!canEdit && !canToggleStatus && !canDelete && (
                            <span>Chỉ xem</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <UserForm
        open={showForm}
        user={editUser}
        loading={formLoading}
        serverError={formError}
        onClose={() => {
          setShowForm(false);
          setEditUser(null);
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Xác nhận xóa"
        message={
          deleteTarget
            ? `Bạn có chắc chắn muốn xóa '${deleteTarget.fullName}' không?`
            : ''
        }
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}