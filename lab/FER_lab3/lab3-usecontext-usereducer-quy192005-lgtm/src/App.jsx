// TODO: Import useAuth từ context/AuthContext.jsx
// TODO: Import LoginPage từ pages/LoginPage.jsx
// TODO: Import DashboardPage từ pages/DashboardPage.jsx
// TODO: Import AppNavbar từ components/AppNavbar.jsx

import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AppNavbar from './components/AppNavbar'

function App() {
  const { state } = useAuth()

  return (
    <>
      {/* Hiển thị Navbar chỉ khi đã đăng nhập */}
      {state.isAuthenticated && <AppNavbar />}

      {/* Điều kiện hiển thị trang */}
      {state.isAuthenticated ? <DashboardPage /> : <LoginPage />}
    </>
  )
}

export default App