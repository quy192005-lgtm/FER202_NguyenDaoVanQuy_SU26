import React from 'react';
import { FormProvider } from '../context/FormContext';
import RegistrationForm from '../components/form/RegistrationForm';

export default function Ex03ValidationPage() {
  return (
    <div className="page-container">
      <div className="card-custom mx-auto" style={{ maxWidth: '500px' }}>
        <h2 className="mb-4 text-center fw-bold">Đăng Ký Tài Khoản</h2>
        <FormProvider>
          <RegistrationForm />
        </FormProvider>
      </div>
    </div>
  );
}
