import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const About = () => {
  const [mission, setMission] = useState(`
    Our mission is to bridge the gap between students, instructors, and business professionals
    by providing students with the tools and opportunities to excel in the world of business and economics.
    Through collaboration, mentorship, and hands-on training, we aim to empower students to grow, thrive, 
    and build the foundation for a successful future.`
  );
  const [vision, setVision] = useState(`
    HUESA envisions a community where students in the College of Business and Economics are equipped 
    with the skills, knowledge, and connections they need to become leaders in their fields. We strive 
    to create an environment that fosters collaboration, innovation, and personal growth, ultimately ensuring
    that our members have the resources they need to succeed in both their academic and professional journeys.   
    `);
  const [loadingMission, setLoadingMission] = useState(true);
  const [loadingVision, setLoadingVision] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const missionDocRef = doc(db, 'associations', 'mission');
        const visionDocRef = doc(db, 'associations', 'vision');
        
        const missionDoc = await getDoc(missionDocRef);
        const visionDoc = await getDoc(visionDocRef);

        if (missionDoc.exists()) setMission(missionDoc.data().mission);
        if (visionDoc.exists()) setVision(visionDoc.data().vision);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingMission(false);
        setLoadingVision(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-8 bg-base-200" id="about">
      <section className="hero min-h-[250px] bg-base-300 lg:px-[10%] px-4">
        <div className="hero-content text-center">
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
                We believe in the power of teamwork and open communication.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Mentorship</h3>
              <p className='text-left'>
                Mentorship is at the core of HUESA, offering guidance through academic and career journeys.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Growth</h3>
              <p className='text-left'>
                We focus on fostering personal and professional growth through training programs and workshops.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
