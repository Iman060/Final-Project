🐆 Puma E-Commerce Clone



This is a frontend single page e-commerce app built with React + Vite and a backend (provided by my mentor).
The project replicates Puma’s official store for educational purposes.

It includes:

🔑 Authentication with Supabase (role-based: user / admin)

🛒 User Side → Browse categories, filter products, wishlist, cart, checkout

⚙️ Admin Side → Manage brands, categories, products, upload images

✨ Features
👤 User Side

Home Page (/) → Landing page with featured products

Category Page (/categorypage?gender=women) → Shows categories filtered by gender (e.g., Women, Men, Kids)

Subcategory (/all) → Displays products by subcategory (Shoes, Accessories, etc.) with filters

Details (/details/:slug) → Product details with Add to Cart + Add to Wishlist

Wishlist (/wishlist) → Manage liked products

Cart (/cart) → Backend-powered shopping basket

Checkout (/checkout) → Secure checkout process

Auth → Login / Register with backend

Must log in before adding to cart

If no account → redirected to Register

🔐 Admin Side

Access Control: Auth checks if Supabase role is admin → grants access

Dashboard (/admin) → With protected routes

Brand Management → Add, edit, delete brands

Category Management → Add, edit, delete categories

Product Management → Add, edit, delete products

Image Upload (via backend API):

uploadImage: builder.mutation({
  query: (formData) => ({
    method: 'POST',
    url: 'upload/image',
    body: formData,
  }),
}),

🛠️ Tech Stack
Core

React 19.1.0 → UI library for building SPA

Vite → Fast build tool & dev server

Routing & Navigation

React Router 7.7.0 → SPA navigation with nested routes

Protected Routes → Auth.jsx handles role-based redirection

State Management & API

Redux Toolkit 2.8.2 → State management

RTK Query → For API integration (API.js, store.js)

Styling

TailwindCSS 4.1.11 → Utility-first CSS framework

@tailwindcss/vite → Tailwind integration with Vite

UI & Icons

React Icons 5.5.0 → Icon packs

Lucide React 0.525.0 → Modern icons

SweetAlert2 11.22.2 → Nice alert popups

React Toastify 11.0.5 → Toast notifications

Forms

React Hook Form 7.61.1 → Form validation and management

Backend & Auth

Supabase → User authentication and role management

Custom Backend API → Products, categories, brands, cart, image upload

📂 Project Structure
src
 ┣ components
 ┃ ┣ admin (Add/Edit Brand, Category, Product, Sidebar)
 ┃ ┣ ui (shared UI: Header, Footer, Modal, SaleSection, etc.)
 ┃ ┣ user (HomePage, All, Checkout, Wishlist, Details, etc.)
 ┃ ┗ layouts (AdminLayout, UserLayout)
 ┣ pages
 ┃ ┣ admin (Brand, Category, Products, Login)
 ┃ ┗ user (Account, Cart, CategoryPage, Register, etc.)
 ┣ router (Auth, route.jsx setup)
 ┣ store (API.js, store.js)
 ┣ index.css
 ┣ main.jsx
 ┗ vite.config.js

 📌 Notes

This project is for educational purposes only.

It is not affiliated with Puma.

Backend must be running for cart, checkout, and admin features.