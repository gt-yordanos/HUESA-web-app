import React from 'react';
import { Link } from "react-router-dom";
import HeroImg from '../assets/ECON.png';
const Hero = () => {
  return (
    <div className="hero bg-base-200 min-h-screen lg:px-[10%] px-4">
    <div className="hero-content flex-col lg:flex-row-reverse gap-15 mt-16 items-center justify-center w-full">
      <div className='flex flex-col items-center justify-center rounded-lg shadow-2xl'>
        <img
        src={HeroImg}
        className="max-w-[200px] sm:max-w-sm" />
        <h2 className='text-center text-2xl sm:text-3xl font-bold mt-4 mb-2'>HUESA</h2>
        <p className='text-sm px-2 mb-2 text-center'>
          Haramaya University Economics Students Association
        </p>
      </div>
      <div className='w-full'>
        <h1 className="sm:text-4xl text-2xl font-bold text-center">Welcome to HUESA!</h1>
        <p className="py-6 text-sm sm:text-[1.1rem]">
          At HUESA, we are dedicated to fostering the growth of students by providing the resources,
          training, and mentorship they need to succeed. We believe in the power of collaboration 
          between students, instructors, and industry professionals to help you connect with your 
          future and grow into successful business and economics leaders.
        </p>
        <button className="btn btn-outline btn-info rounded-full"><Link to='/register'>Register Now</Link></button>
      </div>
    </div>
  </div>
  );
};

export default Hero;
