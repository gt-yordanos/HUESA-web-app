import React, { useState, useEffect } from 'react';
import { useAssociations } from '../contexts/AssociationsContext'; 

const About = () => {
  // Use the custom hook to access the associations context
  const { mission, vision } = useAssociations();

  // Set loading state based on whether mission and vision are available
  const [loadingMission, setLoadingMission] = useState(!mission && mission !== '');
  const [loadingVision, setLoadingVision] = useState(!vision && vision !== '');

  useEffect(() => {
    // If mission and vision are fetched, set loading to false
    if (mission || mission === '') setLoadingMission(false);
    if (vision || vision === '') setLoadingVision(false);
  }, [mission, vision]);

  return (
    <div className="py-8 bg-base-200" id="about">
      <section className="hero min-h-[250px] bg-base-300 lg:px-[10%] px-4">
        <div className="hero-content hero-co text-center hero-content text-center flex flex-col items-center justify-center">
          <h1 className="sm:text-4xl text-2xl font-bold">About HUESA</h1>
          <p className="sm:text-lg text-sm mt-4">
            We help students grow, learn, and connect through collaborative initiatives and mentorship.
          </p>
        </div>
      </section>

      <section className="py-16 lg:px-[10%] px-4">
        <div className="container mx-auto text-center">
          <h2 className="m:text-4xl text-2xl font-semibold mb-4">Our Mission</h2>
          {loadingMission ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-xs"></span>
            </div>
          ) : (
            <p className="sm:text-lg text-sm mb-6 text-left">{mission}</p>
          )}
        </div>
      </section>

      <section className="py-16 bg-base-100 lg:px-[10%] px-4">
        <div className="container mx-auto text-center">
          <h2 className="m:text-4xl text-2xl font-semibold mb-4">Our Vision</h2>
          {loadingVision ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-xs"></span>
            </div>
          ) : (
            <p className="sm:text-lg text-sm mb-6 text-left">{vision}</p>
          )}
        </div>
      </section>

      <section className="py-16 lg:px-[10%] px-4">
        <div className="container mx-auto text-center">
          <h2 className="m:text-4xl text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
              <p className='text-left'>
                We believe in the power of teamwork and open communication. Collaboration between students, instructors, and professionals drives innovation and ensures mutual growth.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Mentorship</h3>
              <p className='text-left'>
                Mentorship is at the core of HUESA. We connect students with experienced professionals who guide them through their academic and career journeys, offering invaluable advice and support.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Growth</h3>
              <p className='text-left'>
                We are committed to fostering the personal and professional growth of every member. Through training programs and skill-building workshops, we help students reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;