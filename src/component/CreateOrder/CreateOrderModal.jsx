import React from 'react';
import { Modal, Form, Button, Divider } from "antd";
import { useCreateOrder } from './useCreateOrder';
import OrderItemFields from "./OrderItemFields"
import OrderItemsList from './OrderItemsList';
import CustomerInfoForm from './CustomerInfoForm';

const CreateOrderModal = ({ open, onClose }) => {
    const [form] = Form.useForm();

    const { dishes, loading, handleValuesChange, handleCreateOrder } = useCreateOrder({ form, onClose });

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
                    items: [{ quantity: 1 }]
                }}
            >
                <CustomerInfoForm />

                <Divider orientation="left" style={{ fontSize: '14px', color: '#999' }}>Chi tiết món ăn</Divider>


                <OrderItemsList dishes={dishes} />

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