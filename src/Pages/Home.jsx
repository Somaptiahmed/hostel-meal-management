import React from 'react';
import Banner from './Banner';
import AllMeals from './AllMeals';
import Contact from './Contact';
import Membership from './Membership';

const Home = () => {
    return (
        <div>
            <div className='w-11/12 mx-auto'>
            <Banner></Banner>
            <AllMeals></AllMeals>
            <Contact></Contact>
            <Membership></Membership>
            </div>
        </div>
    );
};

export default Home;