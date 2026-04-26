import React from 'react'
import { Form, Input } from 'antd';

const CustomerInfoForm = () => {
    return (
        <>
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
        </>
    )
}

export default CustomerInfoForm;
