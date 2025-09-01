import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Login from "../pages/admin/Login";
import Userlayout from "../layouts/UserLayout";
import Auth from "./Auth";
import AdminLayout from "../layouts/AdminLayout";
import Products from "../pages/admin/Products";
import Category from "../pages/admin/Category";
import Brand from "../pages/admin/Brand";
import CategoryPage from "../pages/user/CategoryPage";
import All from "../components/user/All";
import HomePage from "../pages/user/HomePage";
import Register from "../pages/user/Register";
import Account from "../pages/user/Account";
import Details from "../pages/user/Details";
import Wishlist from "../pages/user/Wishlist";
import NoProduct from "../components/user/NoProduct";
import Cart from "../pages/user/Cart";
import Checkout from "../components/user/Checkout";

export const route = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            
            <Route path="/" element={<Userlayout />} >
                <Route index element={<HomePage />} />
                <Route path="all" element={<All />} />
                <Route path="/details/:slug" element={<Details />} />
                <Route path="/categorypage" element={<CategoryPage />} />
                <Route path="/account" element={<Account />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NoProduct />} />
            </Route>



            <Route path="/admin"  element={
                <Auth>
                    <AdminLayout />
                </Auth>
            }>
                <Route path="products" element={<Products />} />
                <Route path="category" element={<Category />} />
                <Route path="brand" element={<Brand />} />
            </Route>
            

        </>
    )
)