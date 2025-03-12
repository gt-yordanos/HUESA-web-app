import React from 'react';
import { FaLinkedin, FaGithub, FaCode, FaEnvelope, FaJs, FaReact, FaPython, FaJava } from 'react-icons/fa';

const AboutTheDeveloper = () => {
  let devProfile = "https://lh3.googleusercontent.com/a/ACg8ocLUTB8F_7a5iZVp_IOxpusUSozP_XUH3AungcVHbBzo1BoCsZgr=s432-c-no"
  return (
    <div className="py-16 bg-base-300" id="about-developer">
      <div className="container mx-auto">
        {/* Hero Section - Centered */}
        <div className="hero min-h-[250px] lg:px-[10%] px-4 flex justify-center">
          <div className="hero-content flex flex-col items-center text-center">
            <h1 className="sm:text-4xl text-2xl font-bold bg-amber-500 p-2 rounded-lg flex items-center">About the Developer<FaCode className='ml-4'/></h1>
            <div className='flex flex-col justify-start '>
              <p className="sm:text-lg text-sm mt-4 text-left">
                Hello! My name is <strong>Yordanos Genene</strong>, a 4th-year Computer Science student at Haramaya University. 
                Although I am studying Computer Science, I have a deep passion for economics, which inspired me to build this website for HUESA.
              </p>
              <p className="sm:text-lg text-sm mt-4 text-left">
                I developed this website for HUESA (Haramaya University Economics Student Association), using modern technologies like React JS, Firebase, and Daisy UI.
              </p>
              <p className="sm:text-lg text-sm mt-4 text-left">
                I am open to Software Engineering roles and am always looking to expand my skills.
              </p>

              {/* Contact Me Section */}
              <p className="sm:text-lg text-sm mt-4 flex flex-col sm:flex-row justify-start">
                <span className="text-gray-600 text-left">You can contact me via email:  </span>
                <a href="mailto:yordanosgenene@example.com" className="text-gray-600 font-bold hover:text-gray-800 flex items-center sm:ml-2">
                  <FaEnvelope className="mr-2 text-gray-600" /> gt.yordanos@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Developer Profile Card - Left Aligned */}
        <div className="card bg-base-100 shadow-xl p-6 mt-8 mx-auto w-full max-w-[90%] sm:max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img
              src={devProfile}
              alt="Yordanos Genene"
              className="w-24 h-24 rounded-full border-3 border-base-content"
            />
            <h2 className="text-xl font-semibold mt-2">Yordanos Genene</h2>
            <p className="text-sm text-gray-500 text-center">#4th Year Computer Science Student</p>
            <p className="text-sm text-gray-500 text-center">#Junior Software Engineer</p>
          </div>

          {/* Contact Information - Column Buttons */}
          <div className="space-y-2 mt-2">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/yordanosgtefera/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 px-6 bg-base-300 text-center rounded-lg hover:bg-base-400 hover:scale-102 hover:shadow-xl transition-all"
            >
              <FaLinkedin className="inline mr-2" />
              LinkedIn
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/gt-yordanos"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 px-6 bg-base-300 text-center rounded-lg hover:bg-base-400 hover:scale-102 hover:shadow-xl transition-all"
            >
              <FaGithub className="inline mr-2" />
              GitHub
            </a>

            {/* LeetCode */}
            <a
              href="https://leetcode.com/u/EfUp3oLH21/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 px-6 bg-base-300 text-center rounded-lg hover:bg-base-400 hover:scale-102 hover:shadow-xl transition-all"
            >
              <FaCode className="inline mr-2" />
              LeetCode
            </a>
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Skills and Technologies</h3>
            <div className="flex justify-center space-x-6">
              {/* JavaScript */}
              <div className="flex flex-col items-center">
                <FaJs className="text-3xl text-yellow-500" />
                <p className="mt-2 text-sm">JavaScript</p>
              </div>
              {/* React */}
              <div className="flex flex-col items-center">
                <FaReact className="text-3xl text-blue-600" />
                <p className="mt-2 text-sm">React JS</p>
              </div>
              {/* Python */}
              <div className="flex flex-col items-center">
                <FaPython className="text-3xl text-blue-500" />
                <p className="mt-2 text-sm">Python</p>
              </div>
              {/* Java */}
              <div className="flex flex-col items-center">
                <FaJava className="text-3xl text-red-600" />
                <p className="mt-2 text-sm">Java</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTheDeveloper;