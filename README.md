# 🐆 Puma E-Commerce Clone

This is a frontend single-page e-commerce app built with React + Vite and a custom backend (provided by my mentor).
The project replicates Puma’s official store for educational purposes only.

## ✨ Features
👤 User Side

Home Page (/) → Landing page with featured products

Category Page (/categorypage?gender=women) → Browse categories filtered by gender (Women, Men, Kids)

Subcategory Page (/all) → View products by subcategory (Shoes, Accessories, etc.) with filters

Details Page (/details/:slug) → Product details + Add to Cart + Add to Wishlist

Wishlist (/wishlist) → Manage liked products

Cart (/cart) → Backend-powered shopping basket

Checkout (/checkout) → Secure checkout process

Authentication

Login / Register with backend

Must log in before adding to cart

If no account → redirected to Register

🔐 Admin Side

Access Control → Supabase role check (only admins allowed)

Dashboard (/admin) → Protected routes

Brand Management → Add, edit, delete brands

Category Management → Add, edit, delete categories

Product Management → Add, edit, delete products

Image Upload → Via backend API

uploadImage: builder.mutation({
  query: (formData) => ({
    method: 'POST',
    url: 'upload/image',
    body: formData,
  }),
}),

## 🛠️ Tech Stack
Core

React 19.1.0 → UI library for building SPA

Vite → Fast build tool & dev server

Routing & Navigation

React Router 7.7.0 → SPA navigation with nested routes

Protected Routes → Auth.jsx handles role-based redirection

State Management & API

Redux Toolkit 2.8.2 → Global state management

RTK Query → API integration (API.js, store.js)

Styling

TailwindCSS 4.1.11 → Utility-first CSS framework

@tailwindcss/vite → Tailwind integration with Vite

UI & Icons

React Icons 5.5.0 → Icon packs

Lucide React 0.525.0 → Modern icons

SweetAlert2 11.22.2 → Elegant alert popups

React Toastify 11.0.5 → Toast notifications

Forms

React Hook Form 7.61.1 → Form validation & management

Backend & Auth

Supabase → Authentication + Role management

Custom Backend API → Products, categories, brands, cart, image upload

## 📌 Notes

🚫 This project is not affiliated with Puma.

📦 Backend must be running for:

Cart

Checkout

Admin features

🎓 For educational purposes only.
