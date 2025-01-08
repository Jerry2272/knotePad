import React from 'react';

function Home() {
  return (
    <div className="h-[100vh] text-white bg-slate-950 flex flex-col gap-y-16 justify-center items-center">
      {/* Main heading */}
      <h2 className="text-6xl font-semibold relative z-10 text-center">
        Get Started with KNote
      </h2>
      {/* Disabled input field for demonstration or future use */}
      <input 
        type="text" 
        className="zoomInput shadow block w-full bg-slate-700 py-3 px-5" 
        disabled 
      />

      {/* Links to login and signup pages */}
      <div className="flex gap-y-4 lg:flex-row flex-col">
        <a href="/login" className="bg-slate-700 px-8 py-4 w-auto text-center">
          Already have an account?
        </a>
        <a href="/signup" className="bg-slate-700 px-8 py-4 w-auto text-center">
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default Home;
