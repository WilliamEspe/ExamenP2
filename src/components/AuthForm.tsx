import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebaseConfig';
import styles from './AuthForm.module.css';

const AuthForm: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Inicio de sesión exitosa');
        router.push('/'); // Redireccionar al inicio o la página principal después de iniciar sesión
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Registro exitoso');
        router.push('/login'); // Redireccionar a la página de inicio de sesión después de registrarse
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Correo:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
        {isLogin ? (
          <p>
            No tienes cuenta? <a href="/register" className={styles.link}>Registrate</a>
          </p>
        ) : (
          <p>
            Ya tienes una cuenta? <a href="/login" className={styles.link}>Inicia Sesión</a>
          </p>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
