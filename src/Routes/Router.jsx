import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import MealDetails from "../Pages/MealDetails";
import Meals from "../Pages/Meals";

import JoinUs from "../Pages/JoinUs";
import Register from "../Pages/Register";
import AuthLayout from "../AuthLayou/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Components/Dashboard";
import MyProfile from "../Components/MyProfile";
import MyReviews from "../Components/MyReviews";
import PaymentHistory from "../Components/PaymentHistory";
import RequestedMeals from "../Components/RequestedMeals";

import Checkout from "../Pages/Checkout";

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
                element: <Checkout></Checkout>,
            },
            // {
            //     path: 'checkout',
            //     element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
            // },
            
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
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "myProfile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "myReview",
                element: <MyReviews></MyReviews>
            },
            {
                path: "payment",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "requestedMeals",
                element: <RequestedMeals></RequestedMeals>
            },

        ]
    },
]);