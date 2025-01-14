import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import MealDetails from "../Pages/MealDetails";
import Meals from "../Pages/Meals";
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
                element: <MealDetails></MealDetails>,
            },
            {
                path: 'checkout/:package_name',
                element: <Checkout></Checkout>,
            },

        ]
    },
]);