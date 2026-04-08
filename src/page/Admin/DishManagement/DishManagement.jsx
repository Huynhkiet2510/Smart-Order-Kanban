import { Table, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDish } from '../../../hooks/useDish';
import { useDishAction } from './useDishAction';
import CreateModal from './CreateModal';
import { getDishColumns } from './Column';
import { SearchOutlined, CoffeeOutlined } from "@ant-design/icons";
import { useState } from "react";

const DishManagement = () => {
    const [searchText, setSearchText] = useState("");

    const { dishes } = useDish();
    const { form, isEditing, SaveDish, handleFillInput, removeDish, ToggleDisable, submitting, open, setOpen } = useDishAction();

    const columns = getDishColumns({ handleFillInput, removeDish, ToggleDisable });

    const filteredData = dishes.filter(d => d.name?.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div className="h-full flex flex-col p-6 bg-gray-100 overflow-hidden">

            <div className="bg-white flex-1 min-h-0 p-6 rounded-xl shadow-sm flex flex-col">

                <div className="flex justify-between items-center mb-2 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <CoffeeOutlined className="text-orange-500 text-lg" />
                        Quản lý món ăn
                    </h2>
                    <div className="flex gap-2">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                form.resetFields();
                                setOpen(true);
                            }}
                        >
                            Thêm món
                        </Button>
                        <Input
                            placeholder="Tìm tên món ăn..."
                            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                            style={{ width: 300 }}
                            allowClear
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>


                <div className="flex-1 overflow-auto">
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        loading={submitting}
                        rowKey="id"
                        scroll={{ y: 'calc(100vh - 320px)', x: 800 }}

                        pagination={{
                            pageSize: 10,
                            showTotal: (total) => `Tổng cộng ${total} đơn hàng`,
                            className: "mt-4",
                            placement: "bottomRight"
                        }}
                        className="flex-1"
                    />
                </div>
            </div>

            <CreateModal
                open={open}
                form={form}
                isEditing={isEditing}
                onCancel={() => setOpen(false)}
                confirmLoading={submitting}
                onCreate={SaveDish}
            />
        </div>
    );
};

export default DishManagement;