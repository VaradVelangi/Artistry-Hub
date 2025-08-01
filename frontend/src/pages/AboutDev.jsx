import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaLink } from 'react-icons/fa';
import { DiJavascript1, DiNodejs, DiReact, DiMongodb, DiJava } from 'react-icons/di';
import { CgCPlusPlus } from 'react-icons/cg';
import { SiTailwindcss, SiMysql, SiUipath, SiExpress, SiHtml5, SiCss3 } from 'react-icons/si';

export const AboutDev = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-10">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-10 md:mb-0 w-full md:w-2/3">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-700 mb-8 tracking-wide leading-tight">
            About the Developer
          </h1>
          <p className="italic text-2xl mb-4">
            Hi, I'm <span className="text-white font-bold">Varad Velangi</span>, a passionate full-stack developer focused on creating innovative and user-friendly applications.
          </p>
          <p className="italic text-2xl mb-6">
            I’m currently pursuing a degree in Information Science at Gogte Institute of Technology. I specialize in full-stack development with hands-on experience in Java, JavaScript, React.js, Node.js, and Express.js. Throughout my academic journey, I’ve built projects addressing real-world challenges, always striving to learn, grow, and deliver high-quality solutions.
          </p>
        </div>
        <div className="flex justify-center w-full md:w-1/3">
          <img
            src="/Assets/Me.jpg"
            alt="Developer Photo"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 border-purple-600"
          />
        </div>
      </div>

      {/* Skills section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-16">
        <h2 className="text-3xl font-bold text-gray-100 mb-6 tracking-wide">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[
            { icon: <CgCPlusPlus className="text-4xl text-purple-400 mb-2 mx-auto" />, name: 'C++' },
            { icon: <DiJava className="text-4xl text-red-400 mb-2 mx-auto" />, name: 'Java' },
            { icon: <DiJavascript1 className="text-4xl text-yellow-400 mb-2 mx-auto" />, name: 'JavaScript' },
            { icon: <DiReact className="text-4xl text-cyan-400 mb-2 mx-auto" />, name: 'React.js' },
            { icon: <DiNodejs className="text-4xl text-green-500 mb-2 mx-auto" />, name: 'Node.js' },
            { icon: <SiExpress className="text-4xl text-gray-300 mb-2 mx-auto" />, name: 'Express.js' },
            { icon: <DiMongodb className="text-4xl text-green-400 mb-2 mx-auto" />, name: 'MongoDB' },
            { icon: <SiMysql className="text-4xl text-teal-400 mb-2 mx-auto" />, name: 'MySQL' },
            { icon: <SiTailwindcss className="text-4xl text-blue-400 mb-2 mx-auto" />, name: 'Tailwind CSS' },
            { icon: <SiHtml5 className="text-4xl text-orange-500 mb-2 mx-auto" />, name: 'HTML5' },
            { icon: <SiCss3 className="text-4xl text-blue-500 mb-2 mx-auto" />, name: 'CSS3' },
            { icon: <SiUipath className="text-4xl text-orange-400 mb-2 mx-auto" />, name: 'Ui Path' },
          ].map((skill, idx) => (
            <div
              key={idx}
              className="border border-gray-700 p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-gray-800"
            >
              {skill.icon}
              <h3 className="font-semibold text-xl text-gray-100">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Contact section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Contact Me</h2>
        <p className="text-lg text-center text-white mb-8">
          If you’d like to get in touch or collaborate on a project, feel free to reach out!
        </p>
        <ul className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mt-4">
          <li className="flex items-center gap-3 text-xl hover:text-blue-400 transition-all">
            <FaEnvelope className="w-6 h-6 text-white" />
            <a href="mailto:velangivarad@gmail.com" className="text-white hover:text-blue-400">
              velangivarad@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-3 text-xl hover:text-blue-400 transition-all">
            <FaLinkedin className="w-6 h-6 text-white" />
            <a href="https://www.linkedin.com/in/varadvelangi" className="text-white hover:text-blue-400">
              linkedin.com/in/varadvelangi
            </a>
          </li>
          <li className="flex items-center gap-3 text-xl hover:text-blue-400 transition-all">
            <FaGithub className="w-6 h-6 text-white" />
            <a href="https://github.com/varadvelangi" className="text-white hover:text-blue-400">
              github.com/varadvelangi
            </a>
          </li>
          <li className="flex items-center gap-3 text-xl hover:text-blue-400 transition-all">
            <FaLink className="w-6 h-6 text-white" />
            <a href="https://linktr.ee/VaradVelangi" className="text-white hover:text-blue-400">
              linktr.ee/VaradVelangi
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
