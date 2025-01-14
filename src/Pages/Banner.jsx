
import React, { useState, useEffect } from 'react';
import img1 from '../assets/Hostel1.jpg';
import img2 from '../assets/Hostel2.jpg';
import img3 from '../assets/Hostel3.jpg';
import img4 from '../assets/hostel4.webp';
import img5 from '../assets/hostel5.webp';

const images = [img1, img2, img3, img4, img5];

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Automatically cycle through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSearch = () => {
    console.log('Search term:', searchTerm);
    // Add your search functionality here
  };

  return (
    <div
      className="relative flex flex-col justify-center items-center text-center h-[500px] bg-cover bg-center text-white p-5"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    >
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4 bg-black bg-opacity-50 p-2 rounded">
        Welcome to Meal Planner
      </h1>
      {/* Description */}
      <p className="text-lg mb-6 bg-black bg-opacity-50 p-2 rounded">
        Discover the best meals and plan your meals with ease.
      </p>
      {/* Search Input & Button */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search meals..."
          className="p-3 rounded-l-md text-black w-72 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-r-md"
        >
          Search
        </button>
      </div>
      {/* Dots Navigation */}
      <div className="absolute bottom-5 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              currentImageIndex === index ? 'bg-white' : 'bg-gray-500'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
