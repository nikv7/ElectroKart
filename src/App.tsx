
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AccountPage from "./pages/AccountPage";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import PersonalInformation from "./pages/PersonalInformation";
import Addresses from "./pages/Addresses";
import Orders from "./pages/Orders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/splash" replace />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/personal-information" element={<PersonalInformation />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
