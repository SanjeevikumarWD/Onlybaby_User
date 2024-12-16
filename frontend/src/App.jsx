import React from "react";
import Home from "./components/Home";
import Footer from "./components/footer/Footer";
import AllProducts from "./components/allProducts/AllProducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToyStoreProvider } from "./components/context/ContextApi";
import About from "./components/about/About.jsx";
import Payment from "./components/payment/Payment.jsx";
import LoginPopup from "./components/popup/LoginPopup.jsx";
import Login from "./components/registerLogin/Login.jsx";
import Register from "./components/registerLogin/Register.jsx";
import Nav from "./components/Nav.jsx";
// import SingleProduct from "./components/singleProduct/SingleProduct.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/registerLogin/ForgetPassword.jsx";
import OtpVerification from "./components/registerLogin/OtpVerification.jsx";
import ResetPassword from "./components/registerLogin/ResetPassword.jsx";
import SingleProduct from "./components/product/SingleProduct.jsx";

const App = () => {
  return (
    <Router>
      <ToyStoreProvider>
        <div className="bg-gradient-to-bl from-sky-50 via-violet-50 to-pink-50">
          <Nav />
          <LoginPopup />
          {/* <Payment /> */}
          <SingleProduct />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/product" element={<AllProducts />} />
              <Route path="/user/payment" element={<Payment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<OtpVerification />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </ToyStoreProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
