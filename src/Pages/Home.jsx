import React from 'react';
import Banner from './Banner';
import AllMeals from './AllMeals';

const Home = () => {
    return (
        <div>
            <div className='w-11/12 mx-auto'>
            <Banner></Banner>
            <AllMeals></AllMeals>
            </div>
        </div>
    );
};

export default Home;