import React from 'react';

function LandingPage() {
  return (
    <div className="bg-[#d9b48f] flex items-start justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className=" font-extrabold mb-12 text-6xl underline">Demo Heading</h1>
            <ul className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <li key={index} className="flex items-center">
                  <img src="https://placehold.co/20x20" alt="check" className="mr-2" />
                  <span>Demo Checklist</span>
                </li>
              ))}
            </ul>
            <button className="mt-12 bg-blue-900 text-white px-4 py-2 rounded-md flex items-center">
              <span className="mr-2">+</span> START PROJECT
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img src="/IndexPage-assests/i1.svg" alt="Illustration" className="w-full max-w-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
