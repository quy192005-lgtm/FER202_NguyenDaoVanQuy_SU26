import React from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import ThemeNavbar from '../components/theme/ThemeNavbar';
import ThemedCard from '../components/theme/ThemedCard';
import ThemedButton from '../components/theme/ThemedButton';
import ThemedInput from '../components/theme/ThemedInput';

function ThemePageContent() {
  const { colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text, minHeight: '100vh', transition: 'background-color 0.3s, color 0.3s' }}>
      <ThemeNavbar />
      
      <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="mb-4 fw-bold">Bài 4 – Theme Switcher</h2>
        
        <ThemedCard title="Card 1: Đăng nhập">
          <ThemedInput placeholder="Nhập tài khoản..." />
          <ThemedInput placeholder="Nhập mật khẩu..." />
          <div className="mt-3 d-flex gap-2">
            <ThemedButton variant="primary">Đăng nhập</ThemedButton>
            <ThemedButton variant="outline">Quên mật khẩu</ThemedButton>
          </div>
        </ThemedCard>

        <ThemedCard title="Card 2: Cài đặt hệ thống">
          <p className="mb-4">Chỉnh sửa các tuỳ chọn hiển thị theo sở thích của bạn.</p>
          <ThemedButton variant="primary">Lưu cài đặt</ThemedButton>
        </ThemedCard>

        <ThemedCard title="Card 3: Đăng ký thành viên">
          <ThemedInput placeholder="Email..." />
          <div className="mt-3 d-flex gap-2">
            <ThemedButton variant="outline">Hủy bỏ</ThemedButton>
            <ThemedButton variant="primary">Đăng ký ngay</ThemedButton>
          </div>
        </ThemedCard>
      </div>
    </div>
  );
}

export default function Ex04ThemePage() {
  return (
    <ThemeProvider>
      <ThemePageContent />
    </ThemeProvider>
  );
}
