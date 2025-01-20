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
import AdminProfile from "../Components/AdminProfile";
import AllMeals from "../Components/AllMeals";
import AllReviews from "../Components/AllReviews";
import ServeMeals from "../Components/ServeMeals";
import ManageUsers from "../Components/ManageUsers";
import UpcomingMeals from "../Components/UpcomingMeals";
import AddMeal from "../Components/AddMeal";
import Upcoming from "../Pages/Upcoming";

export const router = createBrowserRouter([
    {
        path: '/',
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
                path: 'upcoming-meals',
                element: <Upcoming></Upcoming>,
            },
            {
                path: "checkout",
                element: <PrivateRoute><Checkout /></PrivateRoute>,
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
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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

            // admin routes
            {
                path: "profile",
                element: <AdminProfile></AdminProfile>
            },
            {
                path: "add",
                element: <AddMeal></AddMeal>
            },
            {
                path: "allMeals",
                element: <AllMeals></AllMeals>
            },
            {
                path: "allReview",
                element: <AllReviews></AllReviews>
            },
            {
                path: "serveMeals",
                element: <ServeMeals></ServeMeals>
            },
            {
                path: "users",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "upcoming",
                element: <UpcomingMeals>

                </UpcomingMeals>
            }

        ]
    },
]);