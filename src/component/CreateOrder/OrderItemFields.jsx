import React from 'react';
import { Form, Select, InputNumber, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const OrderItemFields = ({ field, remove, dishes, fieldsCount }) => {

    const { name, key, ...restField } = field;

    return (
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

            {fieldsCount > 1 && (
                <MinusCircleOutlined onClick={() => remove(name)} />
            )}
        </Space>
    );
};

export default OrderItemFields;