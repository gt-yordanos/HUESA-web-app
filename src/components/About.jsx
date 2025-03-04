import React from 'react';

const About = () => {
  return (
    <div className="py-8 bg-base-200" id="about">
      {/* Hero Section for About */}
      <section className="hero min-h-[250px] bg-base-300 lg:px-[10%] px-4">
        <div className="hero-content text-center flex flex-col items-center justify-center">
          <h1 className="sm:text-4xl text-2xl font-bold">About HUESA</h1>
          <p className="sm:text-lg text-sm mt-4">
            We are here to help students grow, learn, and connect through collaborative initiatives
            and professional mentorship.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:px-[10%] px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="sm:text-lg text-sm mb-6 text-left">
            Our mission is to bridge the gap between students, instructors, and business professionals
            by providing students with the tools and opportunities to excel in the world of business and economics.
            Through collaboration, mentorship, and hands-on training, we aim to empower students to grow, thrive, 
            and build the foundation for a successful future.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-base-100 lg:px-[10%] px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="sm:text-lg text-sm mb-6 text-left">
            HUESA envisions a community where students in the College of Business and Economics are 
            equipped with the skills, knowledge, and connections they need to become leaders in their fields. 
            We strive to create an environment that fosters collaboration, innovation, and personal growth, 
            ultimately ensuring that our members have the resources they need to succeed in both their academic and professional journeys.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:px-[10%] px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
              <p>
                We believe in the power of teamwork and open communication. Collaboration between students, instructors, 
                and professionals drives innovation and ensures mutual growth.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Mentorship</h3>
              <p className='text-left'>
                Mentorship is at the core of HUESA. We connect students with experienced professionals who guide them 
                through their academic and career journeys, offering invaluable advice and support.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Growth</h3>
              <p>
                We are committed to fostering the personal and professional growth of every member. Through training programs 
                and skill-building workshops, we help students reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
