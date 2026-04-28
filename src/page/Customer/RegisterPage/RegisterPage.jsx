import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert, Row, Col, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from "./RegisterForm";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    const { email, password, displayName, phone, address } = values;

    try {
      setError('');
      setLoading(true);

      await registerWithEmail(email, password, {
        displayName,
        phone,
        address,
        photoURL: ""
      });

      message.success('Đăng ký tài khoản thành công!');
      navigate('/', { replace: true });
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Email này đã được sử dụng rồi!");
      } else if (err.code === 'auth/invalid-email') {
        setError("Định dạng Email không hợp lệ!");
      } else {
        setError("Lỗi hệ thống: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <RegisterForm onFinish={onFinish} loading={loading} error={error} />
    </div>
  );
};

export default RegisterPage;