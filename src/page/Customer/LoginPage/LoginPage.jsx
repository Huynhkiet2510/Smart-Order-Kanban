import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import LoginButton from "../../../component/LoginButton/LoginButton";

const { Title, Text } = Typography;

const LoginPage = () => {
    const { loginWithEmail } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        const { email, password } = values;

        setLoading(true);
        try {
            const { role } = await loginWithEmail(email, password);
            message.success("Đăng nhập thành công!");
            if (role === "admin") {
                navigate("/admin/order");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            message.error("Email hoặc mật khẩu không chính xác!");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>

                <Title level={2} style={{ textAlign: 'center', marginBottom: '32px', fontSize: '24px' }}>
                    Đăng nhập
                </Title>

                <Form
                    name="login_form"
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                    size="large"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                        style={{ marginBottom: '16px' }}
                    >
                        <Input prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} placeholder="Nhập email..." />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        style={{ marginBottom: '12px' }}
                    >
                        <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="Nhập mật khẩu..." />
                    </Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Ghi nhớ</Checkbox>
                        </Form.Item>
                        <Button type="link" style={{ padding: 0, height: 'auto' }}>
                            Quên mật khẩu?
                        </Button>
                    </div>

                    {/* Nút Đăng nhập */}
                    <Form.Item style={{ marginBottom: '16px' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            style={{ height: '45px', fontWeight: 'bold' }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ position: 'relative', textAlign: 'center' }}>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid #f0f0f0' }}></div>
                    <span style={{ position: 'relative', backgroundColor: 'white', padding: '0 8px', color: '#8c8c8c', fontSize: '12px' }}>
                        HOẶC TIẾP TỤC VỚI
                    </span>
                </div>

                <LoginButton />

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Text type="secondary">Chưa có tài khoản? </Text>
                    <Text
                        strong
                        style={{ color: '#1677ff', cursor: 'pointer' }}
                        onClick={() => navigate("/register")}
                    >
                        Đăng ký ngay
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;