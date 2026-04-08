import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert, Row, Col, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
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
      navigate('/login');
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
      <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '550px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '40px' }}>

        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
          Đăng ký tài khoản
        </Title>

        {error && (
          <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}

        >
          <Form.Item
            label="Họ và Tên"
            name="displayName"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nguyễn Văn A" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="abc@gmail.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Vui lòng nhập SĐT!' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="09xxx..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input prefix={<HomeOutlined />} placeholder="TP. Cà Mau, Việt Nam" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { min: 6, message: 'Mật khẩu phải từ 6 ký tự!' }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Xác nhận"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{ height: '48px', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}
            >
              Đăng ký
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">Đã có tài khoản? </Text>
            <Link to="/login" style={{ fontWeight: 'bold' }}>Đăng nhập ngay</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;