import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';  // Importing icons for contact
import { DiJavascript1, DiNodejs, DiReact, DiMongodb, DiJava } from 'react-icons/di'; // Icons for languages, DB, frameworks
import { CgCPlusPlus } from 'react-icons/cg'; // Icon for C++
import { SiTailwindcss } from 'react-icons/si'; // Tailwind icon
import { SiMysql } from 'react-icons/si'; // MySQL icon
import { SiUipath } from 'react-icons/si'; // UiPath icon

export const AboutDev = () => {
  return (
    <div className="bg-gray-700 text-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        
        
      <div className="mb-10 md:mb-0 w-full md:w-2/3">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 tracking-wide    leading-tight">About the Developer</h1>
        <p className="italic text-2xl mb-4">
         Hi, I'm <span className="text-white font-bold">Varad Velangi</span>, a passionate full-stack developer focused on creating innovative and user-friendly applications.
        </p>
        <p className=" italic text-2xl mb-6">
          I’m currently pursuing a degree in Information Science at Gogte Institute of Technology. I specialize in full-stack development, with hands-on experience in technologies like Java, JavaScript, React.js, and Node.js. Throughout my academic journey, I’ve worked on projects  that address real-world challenges, constantly striving to learn, grow, and apply my skills in dynamic, growth-focused environments.
         </p>
       </div>

        
        <div className="flex justify-center w-full md:w-1/3">
          <img
            src="/Assets/Me.jpg"
            alt="Developer Photo"
            className="w-48 h-48 rounded-full object-cover md:w-64 md:h-64 border-8 border-purple-600" />
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
  <h2 className="text-3xl font-bold text-gray-100 mb-6 tracking-wide">Skills</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {/* Skill Card */}
    <div className="border border-gradient-purple p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-800">
      <CgCPlusPlus className="text-4xl mb-2 mx-auto text-purple-400" />
      <h3 className="font-semibold text-xl text-gray-100 mb-2">C++</h3>
    </div>
    <div className="border border-gradient-blue p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-800">
      <DiJavascript1 className="text-4xl mb-2 mx-auto text-blue-400" />
      <h3 className="font-semibold text-xl text-gray-100 mb-2">JavaScript</h3>
    </div>
    <div className="border border-gradient-red p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-800">
      <DiJava className="text-4xl mb-2 mx-auto text-red-400" />
      <h3 className="font-semibold text-xl text-gray-100 mb-2">Java</h3>
    </div>
    <div className="border border-gradient-teal p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-800">
      <SiMysql className="text-4xl mb-2 mx-auto text-teal-400" />
      <h3 className="font-semibold text-xl text-gray-100 mb-2">MySQL</h3>
    </div>
    <div className="border border-gradient-green p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-800">
      <DiMongodb className="text-4xl mb-2 mx-auto text-green-400" />
      <h3 className="font-semibold text-xl text-gray-100 mb-2">MongoDB</h3>
    </div>
    <div className="border border-gradient-purple p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-800">
      <DiReact className="text-4xl mb-2 mx-auto text-purple-400" />
      <h3 className="font-semibold text-xl text-gray-100 mb-2">React.js</h3>
    </div>
    <div className="border border-gradient-yellow p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-800">
      <DiNodejs className="text-4xl mb-2 mx-auto text-yellow-400" />
      <h3 className="font-semibold text-xl text-gray-100 mb-2">Node.js</h3>
    </div>
    <div className="border border-gradient-cyan p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-800">
      <SiTailwindcss className="text-4xl mb-2 mx-auto text-cyan-400" />
      <h3 className="font-semibold text-xl text-gray-100 mb-2">Tailwind</h3>
    </div>
    <div className="border border-gradient-orange p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-800">
      <SiUipath className="text-4xl mb-2 mx-auto text-orange-400" />
      <h3 className="font-semibold text-xl text-gray-100 mb-2">Ui Path</h3>
    </div>
  </div>
</div>


      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Contact Me</h2>
        <p className="text-lg text-center text-white mb-8">If you would like to get in touch or collaborate on a project, feel free to reach out!</p>
        <ul className="mt-8 flex justify-center gap-12">
          <li className="flex items-center gap-4 text-xl hover:text-blue-500 transition-all">
            <FaEnvelope className="w-6 h-6 text-white"/>
            <a href="mailto:velangivarad@gmail.com" className="text-white hover:text-blue-400 transition-all">velangivarad@gmail.com</a>
          </li>
          <li className="flex items-center gap-4 text-xl hover:text-blue-500 transition-all">
            <FaLinkedin className="w-6 h-6 text-white"/>
           <a href="https://www.linkedin.com/in/varadvelangi" className="text-white hover:text-blue-400 transition-all">linkedin.com/in/varadvelangi</a>
          </li>
          <li className="flex items-center gap-4 text-xl hover:text-blue-500 transition-all">
           <FaGithub className="w-6 h-6 text-white"/>
            <a href="https://github.com/varadvelangi" className="text-white hover:text-blue-400 transition-all">github.com/varadvelangi</a>
          </li>
        </ul>
      </div>

    </div>
  );
};
