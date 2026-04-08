import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase'; // Điều chỉnh đường dẫn tới config firebase của bạn
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { clearCart } from '../../../store/cartSlice';
import { useAuth } from '../../../contexts/AuthContext';

const Checkout = () => {
    const carts = useSelector((state) => state.cart.carts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        address: '',
        note: '',
        paymentMethod: 'cod'
    });

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                customerName: user.displayName || '',
                phone: user.phone || "",
                address: user.address || '',
            }));
        }
    }, [user]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        if (carts.length === 0) return;

        setLoading(true);
        try {
            const newOrder = {
                columnId: 1,
                userId: user.uid,
                customerName: formData.customerName,
                phone: formData.phone,
                address: formData.address,
                note: formData.note,
                paymentMethod: formData.paymentMethod,

                items: carts.map(item => ({
                    dishId: item.id,
                    itemName: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),

                totalAmount: totalAmount,
                status: "pending",
                viewed: false,
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, "card_orders"), newOrder);

            navigate("/payment-success", {
                state: { fromPayment: true },
                replace: true
            });
            setTimeout(() => {
                dispatch(clearCart());
            }, 100);
        } catch (error) {
            console.error("Lỗi đặt hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    if (carts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-xl mb-4">Giỏ hàng của bạn đang trống</p>
                <button onClick={() => navigate('/')} className="bg-red-500 text-white px-6 py-2 rounded">
                    Quay lại mua sắm
                </button>
            </div>
        );
    }

    const totalAmount = carts.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* CỘT TRÁI: FORM THÔNG TIN */}
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

            {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
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

                <div className="space-y-2 border-t pt-4">
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
        </div>
    );
};

export default Checkout;