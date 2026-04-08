import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Divider, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useDish } from '../../hooks/useDish';
import { useAuth } from '../../contexts/AuthContext';

const { Option } = Select;

const CreateOrderModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { dishes } = useDish();
    const { user } = useAuth();

    const handleValuesChange = (changedValues, allValues) => {
        if (changedValues.items) {
            const updatedItems = allValues.items.map(item => {
                if (item && item.itemName) {
                    const selectedDish = dishes.find(d => d.name === item.itemName);
                    if (selectedDish) {
                        return {
                            ...item,
                            price: selectedDish.price * (item.quantity || 1)
                        };
                    }
                }
                return item;
            });
            form.setFieldsValue({ items: updatedItems });
        }
    };

    const handleCreateOrder = async (values) => {
        setLoading(true);
        try {
            const totalAmount = values.items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

            const newOrder = {
                columnId: 1,
                userId: user.uid || "",
                customerName: values.customerName || "",
                phone: values.phone || "",
                address: values.address || "",
                items: values.items.map(item => ({
                    itemName: item.itemName,
                    quantity: Number(item.quantity),
                    price: Number(item.price),
                    dishId: dishes.find(d => d.name === item.itemName)?.id || null
                })),
                totalAmount: totalAmount,
                status: "pending",
                note: values.note || "",
                viewed: false,
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, "card_orders"), newOrder);
            form.resetFields();
            onClose();
        } catch (error) {
            console.error("Lỗi tạo đơn:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Thêm đơn hàng đa món"
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateOrder}
                onValuesChange={handleValuesChange}
                initialValues={{
                    status: "pending",
                    items: [{ quantity: 1 }] // Mặc định có 1 dòng món ăn
                }}
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Tên khách hàng"
                        name="customerName"
                        rules={[{ required: true, message: "Vui lòng nhập tên khách!" }]}
                    >
                        <Input placeholder="Nhập tên khách hàng" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: "Nhập số điện thoại!" }]}
                    >
                        <Input placeholder="VD: 0901234567" />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: "Nhập địa chỉ!" }]}
                >
                    <Input placeholder="Nhập địa chỉ giao hàng" />
                </Form.Item>

                <Divider orientation="left" style={{ fontSize: '14px', color: '#999' }}>Chi tiết món ăn</Divider>

                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'itemName']}
                                        rules={[{ required: true, message: 'Chọn món' }]}
                                        style={{ width: 250 }}
                                    >
                                        <Select showSearch placeholder="Chọn món">
                                            {dishes.map(dish => (
                                                <Option key={dish.id} value={dish.name}>
                                                    {dish.name} ({dish.price.toLocaleString()}đ)
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        rules={[{ required: true, message: 'SL' }]}
                                    >
                                        <InputNumber min={1} placeholder="SL" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'price']}
                                    >
                                        <InputNumber
                                            readOnly
                                            placeholder="Giá"
                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            style={{ width: 120, backgroundColor: '#f5f5f5' }}
                                        />
                                    </Form.Item>

                                    {fields.length > 1 && (
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    )}
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add({ quantity: 1 })} block icon={<PlusOutlined />}>
                                    Thêm món khác
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>



                <Form.Item label="Ghi chú đơn hàng" name="note">
                    <Input.TextArea
                        rows={4}
                        placeholder="Ví dụ: Giao giờ hành chính, món 1 không hành, ít đường..."
                        showCount
                        maxLength={200}
                    />
                </Form.Item>


                <div className="flex justify-end gap-2">
                    <Button onClick={onClose}>Huỷ</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Tạo đơn {form.getFieldValue('items')?.length > 0 ? `(${form.getFieldValue('items').length} món)` : ''}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default CreateOrderModal;