import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';
import RegistrationForm from './pages/RegistrationForm';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Routes>
        {/* Trang Đăng ký chạy trước khi vào Blog */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        <Route path="/register" element={<RegistrationForm />} />
        
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/about" element={<About />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;