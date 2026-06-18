import React from 'react';
import { useFormContext } from '../../context/FormContext';
import FormField from './FormField';
import { validateField } from '../../utils/validators';

export default function RegistrationForm() {
  const { state, dispatch } = useFormContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch VALIDATE_ALL để hiện toàn bộ lỗi (sẽ set status thành error nếu có)
    dispatch({ type: 'VALIDATE_ALL' });

    // Kiểm tra xem có lỗi không bằng cách validate lại
    let hasError = false;
    for (const field of Object.keys(state.values)) {
      if (validateField(field, state.values[field], state.values)) {
        hasError = true;
        break;
      }
    }

    if (hasError) {
      dispatch({ type: 'SET_STATUS', status: 'error' });
      return;
    }

    dispatch({ type: 'SET_STATUS', status: 'submitting' });
    
    setTimeout(() => {
      dispatch({ type: 'SET_STATUS', status: 'success' });
    }, 1000);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  if (state.status === 'success') {
    return (
      <div className="success-banner">
        <h3 className="mb-3 fw-bold">Đăng ký thành công!</h3>
        <p className="mb-4">Tài khoản của bạn đã được tạo.</p>
        <button type="button" onClick={handleReset} className="btn-custom btn-outline w-100">
          Đăng ký tài khoản khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form" noValidate>
      {state.status === 'error' && (
        <div className="error-banner text-center">
          Vui lòng sửa các lỗi trước khi đăng ký.
        </div>
      )}

      <FormField name="fullName" label="Họ và tên" placeholder="Nhập họ và tên" />
      <FormField name="email" label="Email" type="email" placeholder="Nhập địa chỉ email" />
      <FormField name="password" label="Mật khẩu" type="password" placeholder="Nhập mật khẩu" />
      <FormField name="confirmPassword" label="Xác nhận mật khẩu" type="password" placeholder="Nhập lại mật khẩu" />

      <button 
        type="submit" 
        disabled={state.status === 'submitting'}
        className="btn-custom w-100 py-2 fs-6 mt-4"
      >
        {state.status === 'submitting' ? 'Đang xử lý...' : 'Đăng ký'}
      </button>
    </form>
  );
}
