import React from 'react'

const OrderSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="p-4 border-b bg-gray-50/50 flex justify-between items-center">
            <div className="space-y-2">
                <div className="h-2 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>

        <div className="p-4 space-y-3">
            {[1, 2].map((i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
            ))}

            <hr className="my-4 border-dashed border-gray-100" />

            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-1 text-right">
                    <div className="h-2 w-20 bg-gray-200 rounded ml-auto animate-pulse" />
                    <div className="h-6 w-24 bg-orange-200 rounded animate-pulse" />
                </div>
            </div>
        </div>
    </div>
);

export default OrderSkeleton