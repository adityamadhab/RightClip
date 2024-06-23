import BusDashNav from "./BusDashNav";

export default function BushDashMain() {
    return (
        <div className="main--content bg-gray-200 w-full p-4">
            <BusDashNav />
            <div
                className="p-6 rounded-lg shadow-md mb-6"
                style={{
                    backgroundImage: 'url(/Business-assests/userback.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '233px',
                    width: '1250px'
                }}
            >
                <div className="flex items-center space-x-4">
                    <div className="text-4xl text-white">Hi, user</div>
                </div>
            </div>
        </div>
    )
}