import React from 'react'
import { Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import OrderItemFields from "./OrderItemFields";

const OrderItemsList = ({ dishes}) => {
    return (
        <>
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <OrderItemFields
                                key={field.key}
                                field={field}
                                remove={remove}
                                dishes={dishes}
                                fieldsCount={fields.length}
                            />
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
        </>
    )
}

export default OrderItemsList;