import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderManagement from './page/Admin/OrderManagement/OrderManagement'
import DishManagement from "./page/Admin/DishManagement/DishManagement";
import History from "./page/Admin/HistoryManagement/History";
import Login from "./page/Customer/LoginPage/LoginPage";
import ListDish from "./page/Customer/ListDishPage/ListDishPage";
import CheckOut from "./page/Customer/CheckoutPage/CheckoutPage";
import PaymentSuccess from "./page/Customer/PaymentSuccessPage/PaymentSuccessPage";
import TrackOrder from "./page/Customer/TrackOrderPage/TrackOrderPage";
import Profile from "./page/Customer/ProfilePage/ProfilePage";
import Register from "./page/Customer/RegisterPage/RegisterPage";
import AdminRoute from "./routes/AdminRoute"
import CustomerRoute from "./routes/CustomerRoute"
import CheckoutRoute from "./routes/OrderRequiredRoute"
import PaymentSuccessRoute from "./routes/PaymentSuccessRoute"
import LayoutCustomer from "./component/Layout/LayoutCustomer";
import LayoutAdmin from "./component/Layout/LayoutAdmin"

function App() {

  return (

    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<LayoutCustomer />}>
          <Route index element={<ListDish />} />

          <Route element={<PaymentSuccessRoute />}>
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Route>

          <Route index element={<ListDish />} />

          <Route element={<CheckoutRoute />}>
            <Route path="/checkout" element={<CheckOut />} />
          </Route>

          <Route element={<CustomerRoute />}>
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<LayoutAdmin />}>
            <Route index element={<OrderManagement />} />
            <Route path="/admin/orders" element={<OrderManagement />} />
            <Route path="/admin/dishes" element={<DishManagement />} />
            <Route path="/admin/history" element={<History />} />
          </Route>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
