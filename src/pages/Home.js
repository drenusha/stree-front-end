import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = ({ handleLogout })  => {
  
  return (
    <div className='home_page bg-gray-200 min-h-full'>
      <div className='container w-[350px] bg-white'>
        <div className="flex flex-col px-12 py-20">
          <h2 className="title text-2xl font-bold mt-20 mb-3 text-center font-bold text-gray-900">
            You are now Home
          </h2>
          <p className='text opacity-40 text-center text-black mb-20 pb-10'>
            All you can do here is get out
          </p>
          <Link to="/"><button onClick={handleLogout} type="sumbit" className="logout_btn shadow-lg mt-10 px-4 py-2 rounded bg-red-600 hover:bg-stone-300 text-white font-semibold text-center block w-full focus:outline-none cursor-pointer">
            Logout
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;