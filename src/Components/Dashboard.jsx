import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';

const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
        <div className='flex my-20'>
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-orange-800">
    <ul className="text-white p-4 space-y-4 pt-10">
        <li>
            <NavLink 
                to="/dashboard/myProfile" 
                className={({ isActive }) => 
                    isActive ? 'font-bold' : 'hover:text-blue-300'
                }
            >
                My Profile
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/dashboard/myReview" 
                className={({ isActive }) => 
                    isActive ? 'font-bold' : 'hover:text-blue-300'
                }
            >
                My Review
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/dashboard/requestedMeals" 
                className={({ isActive }) => 
                    isActive ? 'font-bold' : 'hover:text-blue-300'
                }
            >
                My Requested Meals
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/dashboard/payment" 
                className={({ isActive }) => 
                    isActive ? 'font-bold' : 'hover:text-blue-300'
                }
            >
                Payment History
            </NavLink>
        </li>
    </ul>
</div>


            {/* Right-side */}
            <div className='flex-1 p-4'>
                <Outlet />
            </div>
        </div>
        <Footer></Footer>
        </div>
    );
};

export default Dashboard;
