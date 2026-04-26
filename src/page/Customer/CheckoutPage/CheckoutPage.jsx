import React from 'react';
import { useCheckOut } from './useCheckOut';
import DeliveryInformationSection from './DeliveryInformationSection';
import OrderConfirmationSection from './OrderConfirmationSection';


const CheckOutPage = () => {

    const { carts, formData, navigate, loading, handleSubmitOrder, handleInputChange, totalAmount } = useCheckOut();

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


    return (
        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

            <DeliveryInformationSection
                loading={loading}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmitOrder={handleSubmitOrder}
            />

            <OrderConfirmationSection
                carts={carts}
                totalAmount={totalAmount}
            />
            
        </div>
    );
};

export default CheckOutPage;