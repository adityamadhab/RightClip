export default function ChatList() {
    return (
        <div className="border border-[#8FD8CF] rounded-lg h-[600px] w-[300px] p-4">
            <h2 className="font-bold mb-4">CHAT LIST</h2>
            <ul className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={index} className="bg-white p-2 rounded flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="flex-grow">
                            <h4 className="text-gray-800">Chat Name</h4>
                            <p className="text-gray-500">Last message snippet...</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}