import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import MealDetails from "../Pages/MealDetails";
import Meals from "../Pages/Meals";
import Checkout from "../Pages/Checkout";
import JoinUs from "../Pages/JoinUs";
import Register from "../Pages/Register";
import AuthLayout from "../AuthLayou/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Components/Dashboard";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: 'meals',
                element: <Meals></Meals>,
            },
            {
                path: 'meal-details/:id',
                element: <PrivateRoute><MealDetails></MealDetails></PrivateRoute>,
            },
            {
                path: 'checkout/:package_name',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
            },
            {
                path: 'dashboard',
                element: <Dashboard></Dashboard>,
            },

            
            

        ]
       
    },
    {
        path: 'auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: 'joinUs',
                element: <JoinUs></JoinUs>,
            },
            {
                path: 'register',
                element: <Register></Register>,
            },
        ]
    },
]);