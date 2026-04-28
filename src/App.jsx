import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderManagement = lazy(() => import('./page/Admin/OrderManagement/OrderManagement'));
const DishManagement = lazy(() => import('./page/Admin/DishManagement/DishManagement'));
const History = lazy(() => import('./page/Admin/HistoryManagement/History'));

const Login = lazy(() => import('./page/Customer/LoginPage/LoginPage'));
const ListDish = lazy(() => import('./page/Customer/ListDishPage/ListDishPage'));
const CheckOut = lazy(() => import('./page/Customer/CheckoutPage/CheckoutPage'));
const PaymentSuccess = lazy(() => import('./page/Customer/PaymentSuccessPage/PaymentSuccessPage'));
const TrackOrder = lazy(() => import('./page/Customer/TrackOrderPage/TrackOrderPage'));
const Profile = lazy(() => import('./page/Customer/ProfilePage/ProfilePage'));
const Register = lazy(() => import('./page/Customer/RegisterPage/RegisterPage'));

import AdminRoute from "./routes/AdminRoute";
import CustomerRoute from "./routes/CustomerRoute";
import CheckoutRoute from "./routes/OrderRequiredRoute";
import PaymentSuccessRoute from "./routes/PaymentSuccessRoute";
import LayoutCustomer from "./component/Layout/LayoutCustomer";
import LayoutAdmin from "./component/Layout/LayoutAdmin";

function App() {

  return (

    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<LayoutCustomer />}>
            <Route index element={<ListDish />} />

            <Route element={<PaymentSuccessRoute />}>
              <Route path="/payment-success" element={<PaymentSuccess />} />
            </Route>

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
      </Suspense>
    </BrowserRouter>
  )
}

export default App
