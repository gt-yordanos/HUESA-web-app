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
        <div className="py-10">
          <h1 className="sm:text-4xl text-2xl font-bold text-center">About HUESA</h1>
          <p className="sm:text-lg text-sm mt-4 text-left w-full mt-10">
            The Haramaaya University Economics Students Association (HUESA) was established on April 18, 2024, through the collective efforts of economics students, led by the then GC students Kaleb Kassahun, Guta Bacha, and Taju Mohammed, in collaboration with the Department of Economics. Founded to promote academic growth, leadership, and professional networking among economics students, HUESA serves as a dynamic platform organizing regular academic seminars, research competitions, career development workshops, policy debate forums, and networking events with industry professionals and alumni.
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
          <h2 className="m:text-4xl text-2xl font-semibold mb-4">The First Executive Committee (2024)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Founding members card */}
            <div className="card bg-base-100 shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">President</h3>
              <p className="text-sm text-left">Mulu Bekele Gemechu</p>
            </div>
            <div className="card bg-base-100 shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Vice President</h3>
              <p className="text-sm text-left">Abreham Dessie Barkni</p>
            </div>
            <div className="card bg-base-100 shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Secretary</h3>
              <p className="text-sm text-left">Bethlehem Berhanu Kassa</p>
            </div>
            <div className="card bg-base-100 shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Financial Head</h3>
              <p className="text-sm text-left">Sisay Nego Dadi</p>
            </div>
            <div className="card bg-base-100 shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Public Relation Head</h3>
              <p className="text-sm text-left">Elsabeth Alemu Eshete</p>
            </div>
            <div className="card bg-base-100 shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Event and Planning Executive</h3>
              <p className="text-sm text-left">Eldina Bisrat Worku</p>
            </div>
            <div className="card bg-base-100 shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Membership Coordinator</h3>
              <p className="text-sm text-left">Yosen Mersha Yirda</p>
            </div>
            <div className="card bg-base-100 shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Academic Executive</h3>
              <p className="text-sm text-left">Meron Yohanes Bekele</p>
            </div>
            <div className="card bg-base-100 shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Research Head</h3>
              <p className="text-sm text-left">Beteamir Hailu W/mariyam</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-100 lg:px-[10%] px-4">
        <div className="container mx-auto text-center">
          <h2 className="m:text-4xl text-2xl font-semibold mb-4">Membership & Leadership</h2>
          <p className="sm:text-lg text-sm mb-6 text-left mt-5">
            <strong>Membership Open to:</strong> All students from the College of Business and Economics (COBE).<br /> <br/>
            <strong>Leadership Eligibility:</strong> Only Economics Department students may hold executive or administrative roles.
          </p>
        </div>
      </section>

      <section className="py-16 lg:px-[10%] px-4">
        <div className="container mx-auto text-center">
          <h2 className="m:text-4xl text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
              <p className="text-left">
                We believe in the power of teamwork and open communication. Collaboration between students, instructors, and professionals drives innovation and ensures mutual growth.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Mentorship</h3>
              <p className="text-left">
                Mentorship is at the core of HUESA. We connect students with experienced professionals who guide them through their academic and career journeys, offering invaluable advice and support.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Growth</h3>
              <p className="text-left">
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