import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UsersPage from './pages/UsersPage.jsx';

export default function App() {
  const { currentUser } = useAuth();

  return currentUser ? <UsersPage /> : <LoginPage />;
}
