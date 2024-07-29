import React from 'react';
import AuthForm from '../components/AuthForm';
import Link from 'next/link';

const RegisterPage: React.FC = () => {
  return (
    <div className="form-container">
      <AuthForm isLogin={false} />
    </div>
  );
};

export default RegisterPage;

