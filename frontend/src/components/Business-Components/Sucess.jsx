import { Link } from "react-router-dom";

export default function Success() {
    return (
        <div className='h-screen flex items-center justify-center overflow-hidden'>
            <div className="max-w-md w-full space-y-8 text-center bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-8">
                    <img src="/Business-assests/logo.png" alt="RightCliq Creator Logo" className="mx-auto" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Thanks for registering in RightCliq</h2>
                <p className="mt-2 text-sm text-gray-600 mb-4">
                    You can now login to view your dashboard.
                </p>
                <hr className="border-1 mt-4 border-white" />
                <Link to={'/business/signin'} className="mt-8">
                    <button className="group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-black hover:bg-gray-100">
                        LOGIN NOW!
                    </button>
                </Link>
            </div>
        </div>
    );
}
