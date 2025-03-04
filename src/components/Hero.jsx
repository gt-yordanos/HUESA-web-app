import React from 'react';
import HeroImg from '../assets/ECON.png';
const Hero = () => {
  return (
    <div className="hero bg-base-200 min-h-screen px-[10%]">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div>
        <img
        src={HeroImg}
        className="max-w-sm rounded-lg shadow-2xl" />
        <h2 className='text-center text-4xl font-bold mt-4 mb-2'>HUESA</h2>
        <p className='text-sm'>
          Haramaya University Economics Students Association
        </p>
      </div>
      <div>
        <h1 className="text-5xl font-bold">Welcome to HUESA!</h1>
        <p className="py-6">
          At HUESA, we are dedicated to fostering the growth of students by providing the resources,
          training, and mentorship they need to succeed. We believe in the power of collaboration 
          between students, instructors, and industry professionals to help you connect with your 
          future and grow into successful business and economics leaders.
        </p>
        <button className="btn btn-outline btn-info rounded-full">Register Now</button>
      </div>
    </div>
  </div>
  );
};

export default Hero;
