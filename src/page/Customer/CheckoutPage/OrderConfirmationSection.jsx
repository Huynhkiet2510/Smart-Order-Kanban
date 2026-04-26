import React from 'react'

const OrderConfirmationSection = ({ carts, totalAmount}) => {
    return (
        <div className="bg-gray-50 p-6 rounded-xl h-fit border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {carts.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center gap-3">
                            <img src={item.image} alt="" className="w-12 h-12 rounded object-cover" />
                            <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500 text-left">SL: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold text-sm">{(item.price * item.quantity).toLocaleString()}đ</p>
                    </div>
                ))}
            </div>

            <div className="space-y-2  pt-4">
                <div className="flex justify-between text-gray-600">
                    <span>Tạm tính:</span>
                    <span>{totalAmount.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span>Miễn phí</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-red-600 pt-2 border-t">
                    <span>TỔNG CỘNG:</span>
                    <span>{totalAmount.toLocaleString()}đ</span>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmationSection