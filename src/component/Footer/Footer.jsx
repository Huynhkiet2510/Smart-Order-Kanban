import { UtensilsCrossed, Phone, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="p-2 bg-red-500 rounded-lg text-white group-hover:rotate-12 transition">
            <UtensilsCrossed size={20} />
          </div>
          <span className="text-xl font-bold text-white">
            Huỳnh <span className="text-red-500">Kiệt</span>
          </span>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-2">
            Danh mục
          </h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-red-500 cursor-pointer transition">Món chính</li>
            <li className="hover:text-red-500 cursor-pointer transition">Khai vị</li>
            <li className="hover:text-red-500 cursor-pointer transition">Tráng miệng</li>
            <li className="hover:text-red-500 cursor-pointer transition">Đồ uống</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-2">
            Liên hệ
          </h3>
          <ul className="space-y-2 text-sm">
            
            <li className="flex items-center gap-2 hover:text-red-500 transition">
              <Phone size={16} />
              <span>0949 732 710</span>
            </li>

            <li className="flex items-center gap-2 hover:text-red-500 transition">
              <MapPin size={16} />
              <span>Cà Mau</span>
            </li>

            <li className="flex items-center gap-2 hover:text-red-500 transition">
              <Mail size={16} />
              <span>support@foodapp.com</span>
            </li>

          </ul>
        </div>

      </div>

      <div className="border-t border-gray-800 text-center text-sm text-gray-500 py-3">
        © {new Date().getFullYear()} Huỳnh Kiệt Food. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;