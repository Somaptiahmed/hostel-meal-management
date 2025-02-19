// import React from 'react';

// import Banner from './Banner';
// import AllMeals from './AllMeals';
// import Contact from './Contact';
// import Membership from './Membership';

// const Home = () => {
//     return (
//         <div>
//             <div className='w-11/12 mx-auto'>
//             <Banner></Banner>
//             <AllMeals></AllMeals>
//             <Contact></Contact>
//             <Membership></Membership>
//             </div>
//         </div>
//     );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import Banner from './Banner';
import AllMeals from './AllMeals';
import Contact from './Contact';
import Membership from './Membership';

const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    return (
        <div className={`min-h-screen transition-colors ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            {/* Dark Mode Toggle Button */}
            <button 
                onClick={() => setIsDarkMode((prev) => !prev)} 
                className="mt-20  fixed top-4 right-6 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-md"
            >
                {isDarkMode ? <BsSun size={24} /> : <BsMoon size={24} />}
            </button>

            <div className='w-11/12 mx-auto'>
                <Banner />
                <AllMeals />
                <div className='mt-10'>
                <Contact />
                </div>
                <div className='mt-10'>
                <Membership />
                </div>
            </div>
        </div>
    );
};

export default Home;
