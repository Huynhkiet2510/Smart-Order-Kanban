import { UtensilsCrossed, Phone, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        <a
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Trang chủ"
        >
          <div className="p-2 bg-red-500 rounded-lg text-white group-hover:rotate-12 transition">
            <UtensilsCrossed size={20} />
          </div>
          <span className="text-xl font-bold text-white">
            Huỳnh <span className="text-red-500">Kiệt</span>
          </span>
        </a>

        <nav aria-label="Danh mục">
          <h3 className="text-sm font-semibold text-white mb-2">
            Danh mục
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/mon-chinh" className="hover:text-red-500 transition">
                Món chính
              </a>
            </li>
            <li>
              <a href="/khai-vi" className="hover:text-red-500 transition">
                Khai vị
              </a>
            </li>
            <li>
              <a href="/trang-mieng" className="hover:text-red-500 transition">
                Tráng miệng
              </a>
            </li>
            <li>
              <a href="/do-uong" className="hover:text-red-500 transition">
                Đồ uống
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Liên hệ">
          <h3 className="text-sm font-semibold text-white mb-2">
            Liên hệ
          </h3>
          <ul className="space-y-2 text-sm">

            <li className="flex items-center gap-2 hover:text-red-500 transition">
              <Phone size={16} />
              <a href="tel:0949732710">0949 732 710</a>
            </li>

            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Cà Mau</span>
            </li>

            <li className="flex items-center gap-2 hover:text-red-500 transition">
              <Mail size={16} />
              <a href="mailto:support@foodapp.com">
                support@foodapp.com
              </a>
            </li>

          </ul>
        </nav>

      </div>

      <div className="border-t border-gray-800 text-center text-sm text-gray-500 py-3">
        © {new Date().getFullYear()} Huỳnh Kiệt Food. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;