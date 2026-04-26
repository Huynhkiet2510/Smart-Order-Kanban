import React from 'react';
import { Form, Input, Button, Typography, Alert, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const RegisterForm = ({ onFinish, loading, error }) => {
  return (
    <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '550px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '40px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
        Đăng ký tài khoản
      </Title>

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}

      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          label="Họ và Tên"
          name="displayName"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nguyễn Văn A" />
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
                    if (!value || getFieldValue('password') === value) return Promise.resolve();
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
          <Button type="primary" htmlType="submit" loading={loading} block style={{ height: '48px', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
            Đăng ký
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">Đã có tài khoản? </Text>
          <Link to="/login" style={{ fontWeight: 'bold' }}>Đăng nhập ngay</Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;