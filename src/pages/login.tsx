import React from 'react';
import AuthForm from '../components/AuthForm';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  return (
    <div className="form-container">
      <AuthForm isLogin={true} />
    </div>
  );
};

export default LoginPage;
