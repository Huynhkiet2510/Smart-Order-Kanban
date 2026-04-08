import React, { useState } from 'react';
import { Modal, Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

const UploadProofModal = ({ onConfirm, onClose }) => {
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Xử lý khi thay đổi file (chọn ảnh, xóa ảnh)
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleSubmit = async () => {
        if (fileList.length === 0) {
            return message.warning("Vui lòng chọn hoặc chụp ảnh bằng chứng!");
        }

        setLoading(true);
        try {
            // Lấy file gốc từ đối tượng file của Ant Design để gửi lên Firebase/Server
            const fileToUpload = fileList[0].originFileObj;
            await onConfirm(fileToUpload);
        } catch (error) {
            message.error("Có lỗi xảy ra khi upload.");
        } finally {
            setLoading(false);
        }
    };

    // Nút bấm hiển thị trong khung Upload
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
        </div>
    );

    return (
        <Modal
            open={true}
            title="Xác nhận hoàn thành"
            onCancel={onClose}
            onOk={handleSubmit}
            confirmLoading={loading}
            okText={loading ? "Đang xử lý..." : "Xác nhận"}
            cancelText="Hủy"
            okButtonProps={{ 
                className: "bg-blue-600 rounded-lg",
                disabled: fileList.length === 0 
            }}
            cancelButtonProps={{ className: "rounded-lg" }}
            centered
        >
            <div className="space-y-4 py-4">
                <p className="text-sm text-gray-500">
                    Vui lòng chụp ảnh hoặc tải lên bằng chứng giao hàng thành công.
                </p>

                <div className="flex justify-center">
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}
                        beforeUpload={() => false} // Chặn tự động upload của antd để mình tự xử lý bằng onConfirm
                        maxCount={1}
                        accept="image/*"
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </div>
            </div>
        </Modal>
    );
};

export default UploadProofModal;