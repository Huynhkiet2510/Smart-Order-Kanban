import { Modal, Form, Input, InputNumber, Select, Upload, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateModal = ({ form, open, onCancel, onCreate, confirmLoading, isEditing }) => {

    const handleOk = async () => {

        try {
            const values = await form.validateFields();
            await onCreate(values);
            form.resetFields();
        } catch (error) {
            console.log("Validate Failed:", error);
        }
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImage) {
            message.error("Chỉ được upload ảnh!");
            return Upload.LIST_IGNORE;
        }
        if (!isLt2M) {
            message.error("Ảnh phải nhỏ hơn 2MB!");
            return Upload.LIST_IGNORE;
        }
        return false;
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title="Thêm món ăn"
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            okText={isEditing ? "Cập nhật" : "Thêm"}
            cancelText="Huỷ"
        >
            <Form form={form} layout="vertical" preserve={false}>
                <Form.Item
                    label="Tên món"
                    name="name"
                    rules={[{ required: true, message: "Nhập tên món!" }]}
                >
                    <Input
                        placeholder="Nhập tên món ăn..." />
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: "Nhập giá!" }]}
                >
                    <InputNumber
                        placeholder="Nhập giá..."
                        style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Danh mục"
                    name="category"

                    rules={[{ required: true, message: "Nhập danh mục!" }]}
                >
                    <Select placeholder="Chọn danh mục món ăn">
                        <Option value="Món chính">Món chính</Option>
                        <Option value="Gà rán">Món phụ</Option>
                        <Option value="Đồ uống">Đồ uống</Option>
                        <Option value="Tráng miệng">Tráng miệng</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Hình ảnh"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    rules={[{ required: true, message: "Upload ảnh!" }]}
                >
                    <Upload
                        beforeUpload={beforeUpload}
                        maxCount={1}
                        listType="picture-card"
                    >
                        <PlusOutlined />
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateModal;