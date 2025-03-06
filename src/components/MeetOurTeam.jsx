import React from 'react';
import LeadershipCard from './LeadershipCard'; // import the LeadershipCard component

const MeetOurTeam = () => {
  const leadershipTeam = [
    { 
      image: "https://lh3.googleusercontent.com/a/ACg8ocLUTB8F_7a5iZVp_IOxpusUSozP_XUH3AungcVHbBzo1BoCsZgr=s432-c-no", 
      name: "John Doe", 
      role: "President", 
      linkedin: "https://www.linkedin.com/in/johndoe" 
    },
    { 
      image: "https://via.placeholder.com/150", 
      name: "Jane Smith", 
      role: "Vice President", 
      linkedin: "https://www.linkedin.com/in/janesmith" 
    },
    { 
      image: "https://via.placeholder.com/150", 
      name: "Sarah Lee", 
      role: "Secretary", 
      linkedin: "https://www.linkedin.com/in/sarahlee" 
    },
    { 
      image: "https://via.placeholder.com/150", 
      name: "Mike Johnson", 
      role: "Public Relation Head", 
      linkedin: "https://www.linkedin.com/in/mikejohnson" 
    },
    { 
      image: "https://via.placeholder.com/150", 
      name: "Emma Watson", 
      role: "Financial Head", 
      linkedin: "https://www.linkedin.com/in/emmawatson" 
    },
    { 
      image: "https://via.placeholder.com/150", 
      name: "Oliver Brown", 
      role: "Membership Coordinator", 
      linkedin: "https://www.linkedin.com/in/oliverbrown" 
    },
    { 
      image: "https://via.placeholder.com/150", 
      name: "Ava Martin", 
      role: "Event and Planning Executive", 
      linkedin: "https://www.linkedin.com/in/avamartin" 
    },
    { 
      image: "https://via.placeholder.com/150", 
      name: "Liam Garcia", 
      role: "Research Head", 
      linkedin: "https://www.linkedin.com/in/liamgarcia" 
    },
    { 
      image: "https://via.placeholder.com/150", 
      name: "Sophia Wilson", 
      role: "Academic Executive", 
      linkedin: "https://www.linkedin.com/in/sophiawilson" 
    },
  ];

  return (
    <section id="teams" className="py-16 bg-base-300 lg:px-[10%] px-4">
      <div className="container mx-auto text-center">
        <h1 className="sm:text-4xl text-2xl font-semibold mb-4">Meet Our Leadership Team</h1>
        <p className="sm:text-lg text-sm mb-6">
          The team behind HUESA is made up of passionate individuals who are dedicated to student success and growth. 
          Our team works tirelessly to organize events, connect students with professionals, and provide the resources needed 
          for success.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadershipTeam.map((member, index) => (
            <LeadershipCard 
              key={index}
              image={member.image} 
              name={member.name} 
              role={member.role} 
              linkedin={member.linkedin} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
