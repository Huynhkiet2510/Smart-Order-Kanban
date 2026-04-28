import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Checkbox, Row, Col, Table, Tag } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import LoginButton from "../../../component/LoginButton/LoginButton";

const { Title, Text } = Typography;

const LoginPage = () => {
    const { loginWithEmail } = useAuth();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const demoAccounts = [
        {
            key: '1',
            role: 'ADMIN',
            email: 'threshmaster409@gmail.com',
            pass: '123456',
            color: 'volcano'
        },
        {
            key: '2',
            role: 'CUSTOMER',
            email: 'belikeme409@gmail.com',
            pass: '123456',
            color: 'green'
        }
    ];

    const columns = [
        {
            title: 'Quyền',
            dataIndex: 'role',
            key: 'role',
            render: (text, record) => <Tag color={record.color}>{text}</Tag>,
        },
        {
            title: 'Tài khoản (Click để điền)',
            key: 'account',
            render: (_, record) => (
                <div
                    className="cursor-pointer hover:text-blue-500 transition-all"
                    onClick={() => {
                        form.setFieldsValue({ email: record.email, password: record.pass });
                        message.info(`Đã điền tài khoản ${record.role}`);
                    }}
                >
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{record.email}</div>
                    <div style={{ fontSize: '11px', color: '#8c8c8c' }}>Pass: {record.pass}</div>
                </div>
            ),
        }
    ];

    const onFinish = async (values) => {
        const { email, password } = values;
        setLoading(true);
        try {
            const { role } = await loginWithEmail(email, password);
            message.success("Đăng nhập thành công!");
            if (role === "admin") {
                navigate("/admin/orders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            message.error("Email hoặc mật khẩu không chính xác!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5', padding: '40px 20px' }}>
            <Row gutter={[40, 40]} align="middle" style={{ maxWidth: '1100px', width: '100%' }}>

                <Col xs={24} lg={10}>
                    <div style={{ marginBottom: '16px' }}>
                        <Title level={4}>Tài khoản trải nghiệm</Title>
                        <Text type="secondary">Nhấp vào tài khoản trong bảng để tự động điền vào form đăng nhập.</Text>
                    </div>
                    <Table
                        dataSource={demoAccounts}
                        columns={columns}
                        pagination={false}
                        bordered
                        size="small"
                        style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                </Col>

                <Col xs={24} lg={14}>
                    <div style={{ maxWidth: '450px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
                            Đăng nhập
                        </Title>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            requiredMark={false}
                            size="large"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="admin@example.com" />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="123456" />
                            </Form.Item>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Ghi nhớ</Checkbox>
                                </Form.Item>
                                <Button type="link" size="small">Quên mật khẩu?</Button>
                            </div>

                            <Button type="primary" htmlType="submit" loading={loading} block icon={<LoginOutlined />} style={{ height: '48px' }}>
                                Đăng nhập hệ thống
                            </Button>
                        </Form>

                        <div style={{ margin: '24px 0', textAlign: 'center' }}>
                            <Divider plain><Text type="secondary" style={{ fontSize: '12px' }}>HOẶC</Text></Divider>
                        </div>

                        <LoginButton />

                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <Text type="secondary">Chưa có tài khoản? </Text>
                            <Button type="link" onClick={() => navigate("/register")} style={{ padding: 0 }}>Đăng ký ngay</Button>
                        </div>
                    </div>
                </Col>

            </Row>
        </div>
    );
};

const Divider = ({ children, plain }) => (
    <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#f0f0f0' }}></div>
        {children && <div style={{ padding: '0 10px' }}>{children}</div>}
        <div style={{ flex: 1, height: '1px', backgroundColor: '#f0f0f0' }}></div>
    </div>
);

export default LoginPage;