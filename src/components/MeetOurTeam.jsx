import React, { useState, useEffect } from 'react'; 
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import LeadershipCard from './LeadershipCard';
import convertDriveThumbnailUrl from '../Algorithms/convertDriveThumbnailUrl';

const MeetOurTeam = () => {
  const [leadershipTeam, setLeadershipTeam] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'executives')); // Fetch data from Firestore
        const teamData = [];
        querySnapshot.forEach((doc) => {
          // Push each executive's data to the teamData array
          teamData.push({ id: doc.id, ...doc.data() });
        });

        // Sort the teamData array based on the role (priority given to President, Vice President, Secretary)
        const sortedTeam = teamData.sort((a, b) => {
          const roleOrder = ['President', 'Vice President', 'Secretary'];
          const aRoleIndex = roleOrder.indexOf(a.role);
          const bRoleIndex = roleOrder.indexOf(b.role);

          // If role is not in the predefined list, put them at the end
          return (aRoleIndex === -1 ? Infinity : aRoleIndex) - (bRoleIndex === -1 ? Infinity : bRoleIndex);
        });

        setLeadershipTeam(sortedTeam); // Set the sorted data to the state
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchTeamData(); // Call the fetch function when the component mounts
  }, []); 

  return (
    <section id="teams" className="py-16 bg-base-300 lg:px-[10%] sm:p-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="sm:text-4xl text-2xl font-semibold mb-4">Meet Our Leadership Team</h1>
        <p className="sm:text-base lg:text-lg text-sm mb-6 text-left">
          The team behind HUESA is made up of passionate individuals who are dedicated to student success and growth. 
          Our team works tirelessly to organize events, connect students with professionals, and provide the resources needed 
          for success.
        </p>

        {loading ? (
          // Show the loading spinner when data is still being fetched
          <div className="flex justify-center items-center w-full h-72">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          // When loading is complete, display the leadership team cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((member) => (
              <LeadershipCard 
                key={member.id} // Use the Firestore document ID as the key
                image={convertDriveThumbnailUrl(member.profilePic) || "https://via.placeholder.com/150"}
                name={`${member.firstName} ${member.lastName}`}
                role={member.role}
                linkedin={member.linkedin}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MeetOurTeam;