import CreatorNavbar from "./CreatorNav";

export default function SetUpStep1() {
    return (
        <div>
            <CreatorNavbar/>
            <div className="min-h-screen flex">
                <div className="w-2/3 flex items-center justify-center bg-white">
                    <div className="max-w-md w-full space-y-8 p-10">
                        <div className="text-center">
                            <h2 className="mb-12 text-2xl font-semibold text-gray-900">What describes your role the best</h2>
                        </div>
                        <form className="mt-8 space-y-6">
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <input id="demo" name="demo" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Demo Designation" />
                                </div>
                                <div>
                                    <input id="demo" name="demo" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Demo Designation" />
                                </div>
                                <div>
                                    <input id="demo" name="demo" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Demo Designation" />
                                </div>
                                <div>
                                    <input id="demo" name="demo" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Demo Designation" />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    NEXT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-1/3 hidden lg:flex items-center justify-center bg-gradient-to-br from-[#0A0266] via-[#080068] to-[#004D95]">
                </div>
            </div>
        </div>
    )
}