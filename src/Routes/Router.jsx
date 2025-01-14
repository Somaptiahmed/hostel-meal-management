import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Banner from "../Pages/Banner";
import Meals from "../Pages/Meals";

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
                path: 'meal-details',
                element: <Meals></Meals>,
            },

        ]
    },
]);