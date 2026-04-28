import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">

                <div className="flex items-center gap-4 border-b pb-6">
                    <img
                        src={user?.photoURL || "https://i.pravatar.cc/100"}
                        alt="avatar"
                        className="w-20 h-20 rounded-full object-cover border"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">
                            {user?.displayName || "Chưa có tên"}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            UID: {user?.uid}
                        </p>
                    </div>
                </div>

                <div className="mt-6 space-y-4">

                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                        <Mail size={18} className="text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">
                                {user?.email || "Chưa có"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                        <Phone size={18} className="text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Số điện thoại</p>
                            <p className="font-medium">
                                {user?.phone || "Chưa cập nhật"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                        <MapPin size={18} className="text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Địa chỉ</p>
                            <p className="font-medium">
                                {user?.address || "Chưa cập nhật"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold">
                        Chỉnh sửa
                    </button>
                    <button className="flex-1 border border-gray-300 py-2 rounded-xl font-semibold hover:bg-gray-100">
                        Đổi mật khẩu
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;