import React from 'react'

const DeliveryInformationSection = ({ loading, formData, handleInputChange, handleSubmitOrder}) => {
    return (
        <div className="bg-white p-6 shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Thông tin giao hàng</h2>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Họ và tên</label>
                    <input
                        required
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        placeholder="Nguyễn Văn A"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                        <input
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="09xxx"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phương thức</label>
                        <select
                            name="paymentMethod"
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg outline-none"
                        >
                            <option value="cod">Tiền mặt (COD)</option>
                            <option value="momo">Momo (Sắp ra mắt)</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Địa chỉ nhận hàng</label>
                    <input
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        placeholder="Số nhà, tên đường, phường..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Ghi chú đơn hàng</label>
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded-lg outline-none"
                        rows="3"
                        placeholder="Ví dụ: Đồ ăn không cay..."
                    />
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold text-lg transition duration-300"
                >
                    {loading ? "Đang xử lý..." : "XÁC NHẬN ĐẶT HÀNG"}
                </button>
            </form>
        </div>
    )
}

export default DeliveryInformationSection