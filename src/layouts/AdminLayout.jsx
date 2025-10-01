import React from 'react';
import { Outlet } from "react-router";
import SideBar from "../components/admin/SideBar";
import { FaRegUser } from 'react-icons/fa';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-black">
            <SideBar />
            
            <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
                
                <header className="bg-black shadow-sm border-b border-gray-200 lg:pl-0 pl-16">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold text-gray-100">
                                    Admin Dashboard
                                </h1>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <div className="hidden sm:block">
                                    <span className="text-sm text-gray-100">
                                        Welcome back, Iman 
                                    </span>
                                </div>
                                <div className="w-8 h-8 flex justify-center items-center bg-gray-300 rounded-full"><FaRegUser /></div>
                            </div>
                        </div>
                    </div>
                </header>
                
                <main className="bg-[#181818] flex-1 overflow-auto">
                    <div className="px-4 sm:px-6 lg:px-8 py-6">
                        <div className="max-w-7xl mx-auto">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;