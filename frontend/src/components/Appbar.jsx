import React from 'react';
import WalletLogo from "./WalletLogo";
import { useNavigate } from 'react-router-dom';



export const Appbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
    console.log(user);

    const handleSignout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <a href="#" className="flex items-center text-white">
                    <WalletLogo />
                    <span className="ml-3 text-2xl font-semibold">CG Wallet</span>
                </a>
                <button className="text-white lg:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div className="hidden lg:flex lg:items-center">

                    {user && (
                        <>
                            <div
                                className="text-white ml-4 rounded-full bg-gray-600 w-8 h-8 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                </svg>

                            </div>
                            <button onClick={handleSignout}
                                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-2">Sign
                                out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
