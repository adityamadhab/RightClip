import { Link } from 'react-router-dom';

function CreatorNavbar() {
  return (
    <nav className="bg-white shadow-md border-b-2 border-gray-300 h-[60px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={'/'} className="flex-shrink-0 cursor-pointer">
            <img className="h-8 w-auto" src="/Creator-assests/logo2.png" alt="Logo" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default CreatorNavbar;
